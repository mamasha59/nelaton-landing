"use client";

import { Turnstile } from "@marsidev/react-turnstile";

interface AccessCodeFormProps {
  accessCode: string;
  setAccessCode: (code: string) => void;
  isLoading: boolean;
  error: string;
  onActivate: () => void;
  captchaToken: string;
  setCaptchaToken: (token: string) => void;
}

export default function AccessCodeForm({
  accessCode,
  setAccessCode,
  isLoading,
  error,
  onActivate,
  captchaToken,
  setCaptchaToken,
}: AccessCodeFormProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Введите код доступа
          </h1>
          <p className="text-gray-600">Для просмотра журнала катетеризации</p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="accessCode"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Код доступа (6 символов)
            </label>
            <input
              id="accessCode"
              type="text"
              maxLength={6}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === "Enter" && onActivate()}
              placeholder="ABC123"
              className="w-full px-4 py-4 text-center text-2xl font-bold tracking-widest border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-100 uppercase"
              autoComplete="off"
            />
          </div>

          {/* Captcha */}
          <div className="flex justify-center">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
              onSuccess={(token: string) => setCaptchaToken(token)}
              onError={() => setCaptchaToken("")}
              onExpire={() => setCaptchaToken("")}
              options={{
                theme: "light",
                size: "normal",
              }}
            />
          </div>

          <button
            onClick={onActivate}
            disabled={isLoading || accessCode.length !== 6 || !captchaToken}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? "Проверка..." : "Активировать доступ"}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
