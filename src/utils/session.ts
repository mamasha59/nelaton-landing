/**
 * Конфигурация безопасности сессии для медицинских данных.
 *
 * Стандарты:
 * - HIPAA рекомендует автоматический logout после 10–15 минут бездействия
 * - GDPR для health data требует ограничения хранения и доступа
 * - ФЗ-152 для персональных данных в РФ
 */

/** Таймаут бездействия — 15 минут (в мс) */
export const SESSION_IDLE_TIMEOUT_MS = 15 * 60 * 1000;

/** Абсолютный максимум жизни сессии — 8 часов (в мс) */
export const SESSION_ABSOLUTE_TIMEOUT_MS = 8 * 60 * 60 * 1000;

/** За сколько мс до idle-разлогина показывать предупреждение */
export const SESSION_WARNING_BEFORE_MS = 2 * 60 * 1000;

/** Throttle на обработку событий активности (мс) */
export const SESSION_ACTIVITY_THROTTLE_MS = 30 * 1000;

/**
 * Ключи для персистентного хранения времени сессии.
 *
 * SESSION_START хранится в localStorage — переживает закрытие вкладки,
 * чтобы абсолютный таймаут нельзя было обойти закрытием/открытием вкладки.
 *
 * LAST_ACTIVITY хранится в sessionStorage — закрытие вкладки сбрасывает
 * idle-таймер, т.к. пользователь явно вернулся.
 */
export const SESSION_STORAGE_KEYS = {
  /** Timestamp начала сессии (абсолютный таймаут) — localStorage */
  SESSION_START: "nelaton_session_start",
  /** Timestamp последней активности (idle таймаут) — sessionStorage */
  LAST_ACTIVITY: "nelaton_last_activity",
} as const;

/**
 * Инициализирует начало сессии при успешном логине.
 * Вызывать ONLY после verifyOtp / signIn.
 */
export function initSessionStart(): void {
  try {
    localStorage.setItem(
      SESSION_STORAGE_KEYS.SESSION_START,
      String(Date.now()),
    );
  } catch {
    // localStorage может быть недоступен
  }
}

/**
 * Очищает все данные сессии из хранилищ.
 * Вызывать при signOut.
 */
export function clearSessionTimestamps(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEYS.SESSION_START);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.LAST_ACTIVITY);
  } catch {
    // ignore
  }
}

/** Причины завершения сессии (используются как query param `reason`) */
export const SESSION_EXPIRED_REASONS = {
  IDLE: "idle_timeout",
  ABSOLUTE: "absolute_timeout",
  MANUAL: "manual_logout",
} as const;

export type SessionExpiredReason =
  (typeof SESSION_EXPIRED_REASONS)[keyof typeof SESSION_EXPIRED_REASONS];
