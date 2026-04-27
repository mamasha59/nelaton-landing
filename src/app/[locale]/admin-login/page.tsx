"use client";

import { SESSION_EXPIRED_REASONS, initSessionStart } from "@/utils/session";
import { createBrowserClient } from "@/utils/supabase/client";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { Turnstile } from "@marsidev/react-turnstile";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const POLICY_LINK = "https://nelaton.app/privacypolicy";
const TERMS_OF_SERVICE = "https://nelaton.app/termsofuse";

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string;
  const supabase = createBrowserClient();
  const turnstileRef = useRef<TurnstileInstance>(null);
  const searchParamsObj = useSearchParams();
  const sessionExpiredReason = searchParamsObj.get("reason");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [showSessionBanner, setShowSessionBanner] = useState(false);

  // Показываем баннер о завершении сессии при наличии reason в URL
  useEffect(() => {
    if (
      sessionExpiredReason === SESSION_EXPIRED_REASONS.IDLE ||
      sessionExpiredReason === SESSION_EXPIRED_REASONS.ABSOLUTE
    ) {
      setShowSessionBanner(true);

      // Убираем reason из URL (чтобы при обновлении не показывался снова)
      const url = new URL(window.location.href);
      url.searchParams.delete("reason");
      window.history.replaceState({}, "", url.toString());

      // Автоматически скрываем баннер через 10 секунд
      const timer = setTimeout(() => setShowSessionBanner(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [sessionExpiredReason]);

  // Шаг 1: Отправка OTP через edge function с капчей
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!captchaToken) {
      setError("Пожалуйста, пройдите проверку безопасности");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-otp-with-captcha`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.toLowerCase().trim(),
            captchaToken,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          const minutes = Math.ceil((data.retryAfter || 900) / 60);
          throw new Error(
            `Слишком много попыток. Попробуйте через ${minutes} мин.`,
          );
        }
        throw new Error(data.error || "Ошибка отправки кода");
      }

      setStep("otp");
    } catch (err: any) {
      setError(err.message);
      turnstileRef.current?.reset();
      setCaptchaToken("");
    } finally {
      setLoading(false);
    }
  };

  // Шаг 2: Проверка OTP (напрямую через Supabase)
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) throw error;
      if (!data.user) throw new Error("Ошибка верификации");

      // Записываем время начала сессии в localStorage (абсолютный таймаут)
      initSessionStart();

      // Обновляем профиль
      await supabase
        .from("profiles")
        .update({ user_type: "trusted_person" })
        .eq("id", data.user.id);

      router.push(`/${locale}/dashboard`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#4baac5] to-[#7076b0] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {/* Баннер: сессия истекла */}
        {showSessionBanner && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-800">
                Сессия завершена
              </p>
              <p className="mt-1 text-xs text-amber-700">
                {sessionExpiredReason === SESSION_EXPIRED_REASONS.IDLE
                  ? "Ваша сессия была завершена из-за неактивности. Пожалуйста, войдите снова."
                  : "Максимальное время сессии истекло. Пожалуйста, войдите снова."}
              </p>
            </div>
            <button
              onClick={() => setShowSessionBanner(false)}
              className="flex-shrink-0 text-amber-500 hover:text-amber-700 transition-colors"
              aria-label="Закрыть"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Nelaton Health-Share
          </h1>
          <p className="mt-1 text-base font-medium bg-gradient-to-r from-[#4baac5] to-[#7076b0] bg-clip-text text-transparent">
            Безопасная забота на расстоянии
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2">
            <div
              className={`h-2 w-2 rounded-full transition-all ${step === "email" ? "bg-[#4baac5] w-8" : "bg-gray-300"}`}
            />
            <div
              className={`h-2 w-2 rounded-full transition-all ${step === "otp" ? "bg-[#4baac5] w-8" : "bg-gray-300"}`}
            />
          </div>
          <p className="mt-3 text-center text-sm text-gray-600">
            {step === "email"
              ? "Шаг 1: Введите email для получения кода"
              : "Шаг 2: Подтвердите код из письма"}
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email адрес
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#4baac5] focus:outline-none focus:ring-2 focus:ring-[#4baac5]/20"
                disabled={loading}
                required
              />
            </div>

            <div className="flex justify-center">
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                onSuccess={setCaptchaToken}
                onError={() => setCaptchaToken("")}
                onExpire={() => setCaptchaToken("")}
                options={{ theme: "light" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !captchaToken}
              className="w-full rounded-lg bg-gradient-to-r from-[#4baac5] to-[#7076b0] px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Отправка..." : "Получить код →"}
            </button>

            {/* Info hint */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500">
                После входа введите{" "}
                <span className="font-semibold text-[#4baac5]">
                  код приглашения
                </span>{" "}
                от пользователя приложения Nelaton: Self-Catheterization
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Код из email
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                maxLength={6}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl font-bold tracking-widest focus:border-[#4baac5] focus:outline-none focus:ring-2 focus:ring-[#4baac5]/20"
                disabled={loading}
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full rounded-lg bg-gradient-to-r from-[#4baac5] to-[#7076b0] px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Проверка..." : "Войти →"}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("email");
                setOtp("");
                setError(null);
                setCaptchaToken("");
                turnstileRef.current?.reset();
              }}
              className="w-full text-sm text-gray-500 hover:text-[#4baac5] transition-colors"
            >
              ← Вернуться к вводу email
            </button>
          </form>
        )}

        {/* Legal Links */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            <a
              href={TERMS_OF_SERVICE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#4baac5] transition-colors"
            >
              Условия использования
            </a>
            {" • "}
            <a
              href={POLICY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#4baac5] transition-colors"
            >
              Конфиденциальность
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
