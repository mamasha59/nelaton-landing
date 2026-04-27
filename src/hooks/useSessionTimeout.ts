"use client";

import {
  SESSION_ABSOLUTE_TIMEOUT_MS,
  SESSION_ACTIVITY_THROTTLE_MS,
  SESSION_EXPIRED_REASONS,
  SESSION_IDLE_TIMEOUT_MS,
  SESSION_STORAGE_KEYS,
  SESSION_WARNING_BEFORE_MS,
  clearSessionTimestamps,
  type SessionExpiredReason,
} from "@/utils/session";
import { createBrowserClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

interface UseSessionTimeoutOptions {
  /** Таймаут бездействия в мс (по умолчанию 15 мин) */
  idleTimeoutMs?: number;
  /** Абсолютный таймаут сессии в мс (по умолчанию 8 часов) */
  absoluteTimeoutMs?: number;
  /** За сколько мс до idle-logout показать предупреждение (по умолчанию 2 мин) */
  warningBeforeMs?: number;
  /** Колбэк: показать предупреждение пользователю */
  onWarning?: () => void;
  /** Колбэк: сессия завершена (перед редиректом) */
  onSessionEnd?: () => void;
  /** Включён ли таймаут (позволяет отключить до загрузки данных) */
  enabled?: boolean;
}

// ────────────────────────────────────────────────────────────────
// Helpers: чтение timestamps из разных storage
// ────────────────────────────────────────────────────────────────

/** Читает session_start из localStorage (переживает закрытие вкладки) */
function getSessionStart(): number | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEYS.SESSION_START);
    if (!raw) return null;
    const num = Number(raw);
    return Number.isFinite(num) ? num : null;
  } catch {
    return null;
  }
}

/** Читает last_activity из sessionStorage (очищается при закрытии вкладки) */
function getLastActivity(): number | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEYS.LAST_ACTIVITY);
    if (!raw) return null;
    const num = Number(raw);
    return Number.isFinite(num) ? num : null;
  } catch {
    return null;
  }
}

/** Записывает last_activity в sessionStorage */
function setLastActivity(value: number): void {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.LAST_ACTIVITY, String(value));
  } catch {
    // sessionStorage может быть недоступен (private mode Safari iOS)
  }
}

/**
 * Хук для управления безопасностью сессии медицинских данных.
 *
 * Отслеживает:
 * 1. Idle timeout — бездействие пользователя (мышь, клавиатура, тач, скролл)
 * 2. Absolute timeout — максимальное время жизни сессии
 * 3. Предупреждение за N мс до idle-logout
 *
 * **Хранение:**
 * - `session_start` → **localStorage** — переживает закрытие вкладки,
 *   нельзя обойти 8-часовой лимит закрытием/открытием вкладки.
 * - `last_activity` → **sessionStorage** — закрытие вкладки сбрасывает
 *   idle-таймер (пользователь явно вернулся — это OK).
 *
 * **Надёжность:** visibilitychange + watchdog-интервал каждые 30 сек.
 */
export function useSessionTimeout(options: UseSessionTimeoutOptions = {}) {
  const {
    idleTimeoutMs = SESSION_IDLE_TIMEOUT_MS,
    absoluteTimeoutMs = SESSION_ABSOLUTE_TIMEOUT_MS,
    warningBeforeMs = SESSION_WARNING_BEFORE_MS,
    onWarning,
    onSessionEnd,
    enabled = true,
  } = options;

  const supabase = createBrowserClient();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  // Refs для таймеров
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const watchdogRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isLoggingOutRef = useRef(false);
  const warningShownRef = useRef(false);

  // Стабильные refs для колбэков
  const onWarningRef = useRef(onWarning);
  const onSessionEndRef = useRef(onSessionEnd);
  useEffect(() => {
    onWarningRef.current = onWarning;
  }, [onWarning]);
  useEffect(() => {
    onSessionEndRef.current = onSessionEnd;
  }, [onSessionEnd]);

  /**
   * Выполняет logout и редирект на страницу входа с указанием причины.
   */
  const performLogout = useCallback(
    async (reason: SessionExpiredReason) => {
      if (isLoggingOutRef.current) return;
      isLoggingOutRef.current = true;

      // Очищаем все таймеры
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (watchdogRef.current) clearInterval(watchdogRef.current);

      // Очищаем оба хранилища (localStorage + sessionStorage)
      clearSessionTimestamps();

      onSessionEndRef.current?.();

      try {
        await supabase.auth.signOut();
      } catch {
        // Не блокируем редирект если signOut упал
      }

      router.push(`/${locale}/admin-login?reason=${reason}`);
    },
    [supabase, router, locale],
  );

  /**
   * Проверяет, не истекли ли таймауты.
   * Читает session_start из localStorage, last_activity из sessionStorage.
   *
   * Вызывается:
   *  - при visibilitychange (возврат на вкладку)
   *  - watchdog-интервалом каждые 30 сек
   *  - при активности пользователя (throttled)
   */
  const checkTimeouts = useCallback(() => {
    if (!enabled || isLoggingOutRef.current) return;

    const now = Date.now();

    // 1. Абсолютный таймаут (из localStorage)
    const sessionStart = getSessionStart();

    if (sessionStart && now - sessionStart >= absoluteTimeoutMs) {
      performLogout(SESSION_EXPIRED_REASONS.ABSOLUTE);
      return;
    }

    // Если нет session_start в localStorage — сессия не была инициализирована
    // через логин (или очищена). Не разлогиниваем — middleware разберётся.
    if (!sessionStart) return;

    // 2. Idle таймаут (из sessionStorage)
    const lastActivity = getLastActivity();
    if (lastActivity) {
      const idleElapsed = now - lastActivity;

      if (idleElapsed >= idleTimeoutMs) {
        performLogout(SESSION_EXPIRED_REASONS.IDLE);
        return;
      }

      // 3. Предупреждение (за warningBeforeMs до idle-logout)
      if (idleElapsed >= idleTimeoutMs - warningBeforeMs) {
        if (!warningShownRef.current) {
          warningShownRef.current = true;
          onWarningRef.current?.();
        }
      } else {
        warningShownRef.current = false;
      }
    }
    // Если lastActivity === null (новая вкладка, sessionStorage пуст) —
    // не разлогиниваем, пользователь явно вернулся.
    // recordActivity() запишет новый timestamp при первом действии.
  }, [
    enabled,
    absoluteTimeoutMs,
    idleTimeoutMs,
    warningBeforeMs,
    performLogout,
  ]);

  /**
   * Записывает текущее время как последнюю активность в sessionStorage
   * и перезапускает idle-таймеры.
   */
  const recordActivity = useCallback(() => {
    if (!enabled || isLoggingOutRef.current) return;

    const now = Date.now();
    setLastActivity(now);
    warningShownRef.current = false;

    // Перезапускаем таймеры (backup на случай если вкладка в фокусе)
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    const warningDelay = Math.max(0, idleTimeoutMs - warningBeforeMs);
    warningTimerRef.current = setTimeout(() => {
      checkTimeouts();
    }, warningDelay);

    idleTimerRef.current = setTimeout(() => {
      checkTimeouts();
    }, idleTimeoutMs);
  }, [enabled, idleTimeoutMs, warningBeforeMs, checkTimeouts]);

  /**
   * Продлить сессию — вызывается пользователем из модалки предупреждения.
   */
  const extendSession = useCallback(() => {
    recordActivity();
  }, [recordActivity]);

  // ────────────────────────────────────────────────────────────────
  // Основной эффект: инициализация + подписки + watchdog
  // ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;

    isLoggingOutRef.current = false;
    warningShownRef.current = false;

    // Немедленная проверка абсолютного таймаута
    // (если session_start в localStorage уже старый — сразу logout)
    checkTimeouts();

    // Записываем текущую активность в sessionStorage и запускаем таймеры
    recordActivity();

    // Отслеживаемые DOM-события активности
    const ACTIVITY_EVENTS = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
      "pointerdown",
    ] as const;

    // Throttled обработчик активности
    let lastThrottledActivity = Date.now();
    const handleActivity = () => {
      const t = Date.now();
      if (t - lastThrottledActivity >= SESSION_ACTIVITY_THROTTLE_MS) {
        lastThrottledActivity = t;
        recordActivity();
      }
    };

    // visibilitychange — ГЛАВНЫЙ механизм для фоновых вкладок.
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkTimeouts();
      }
    };

    // Watchdog-интервал каждые 30 сек
    watchdogRef.current = setInterval(() => {
      checkTimeouts();
    }, SESSION_ACTIVITY_THROTTLE_MS);

    // Подписки
    ACTIVITY_EVENTS.forEach((event) => {
      document.addEventListener(event, handleActivity, { passive: true });
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      ACTIVITY_EVENTS.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (watchdogRef.current) clearInterval(watchdogRef.current);
    };
  }, [enabled, recordActivity, checkTimeouts]);

  return {
    /** Сбросить idle-таймер (продлить сессию) */
    extendSession,
    /** Ручной logout */
    logout: () => performLogout(SESSION_EXPIRED_REASONS.MANUAL),
  };
}
