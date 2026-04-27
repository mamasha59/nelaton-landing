"use client";

import { SESSION_WARNING_BEFORE_MS } from "@/utils/session";
import { useEffect, useRef, useState } from "react";

interface SessionWarningModalProps {
  /** Показывать ли модалку */
  isVisible: boolean;
  /** Продлить сессию (сброс idle-таймера) */
  onExtendSession: () => void;
  /** Общее количество секунд до автоматического logout (по умолчанию из warningBeforeMs) */
  totalSeconds?: number;
}

/**
 * Модальное окно предупреждения о скором завершении сессии.
 *
 * Показывает обратный отсчёт. При нажатии «Продолжить» — продлевает сессию.
 * Если пользователь не реагирует — useSessionTimeout выполнит logout автоматически.
 */
export default function SessionWarningModal({
  isVisible,
  onExtendSession,
  totalSeconds = Math.floor(SESSION_WARNING_BEFORE_MS / 1000),
}: SessionWarningModalProps) {
  const [countdown, setCountdown] = useState(totalSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Сброс countdown при каждом показе модалки
  useEffect(() => {
    if (isVisible) {
      setCountdown(totalSeconds);

      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Остановка — logout произойдёт в useSessionTimeout
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Модалка скрыта — останавливаем интервал
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCountdown(totalSeconds);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isVisible, totalSeconds]);

  if (!isVisible) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const timeDisplay = `${minutes}:${String(seconds).padStart(2, "0")}`;

  // Прогресс бар (от 100% до 0%)
  const progress = (countdown / totalSeconds) * 100;

  // Цвет в зависимости от оставшегося времени
  const isUrgent = countdown <= 30;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="session-warning-title"
      aria-describedby="session-warning-desc"
    >
      <div className="mx-4 w-full max-w-sm animate-[fadeScaleIn_0.2s_ease-out] rounded-2xl bg-white p-6 shadow-2xl">
        {/* Иконка */}
        <div className="mb-4 flex justify-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
              isUrgent ? "bg-red-100" : "bg-amber-100"
            }`}
          >
            <svg
              className={`h-7 w-7 ${isUrgent ? "text-red-600" : "text-amber-600"}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Заголовок */}
        <h2
          id="session-warning-title"
          className="mb-2 text-center text-lg font-bold text-gray-900"
        >
          Сессия скоро истечёт
        </h2>

        {/* Описание */}
        <p
          id="session-warning-desc"
          className="mb-4 text-center text-sm text-gray-600"
        >
          Для безопасности ваших данных сессия будет автоматически завершена
          через:
        </p>

        {/* Таймер */}
        <div className="mb-4 text-center">
          <span
            className={`font-mono text-4xl font-bold tabular-nums transition-colors ${
              isUrgent ? "text-red-600" : "text-gray-900"
            }`}
          >
            {timeDisplay}
          </span>
        </div>

        {/* Прогресс бар */}
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              isUrgent ? "bg-red-500" : "bg-amber-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Кнопка продления */}
        <button
          onClick={onExtendSession}
          className="w-full rounded-xl bg-gradient-to-r from-[#4baac5] to-[#7076b0] px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
          autoFocus
        >
          Продолжить работу
        </button>

        <p className="mt-3 text-center text-xs text-gray-400">
          Для защиты медицинских данных
        </p>
      </div>
    </div>
  );
}
