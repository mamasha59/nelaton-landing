import StoreButtons from "@/components/StoreButtons/StoreButtons";
import { Lock, Mail, Smartphone, Zap } from "lucide-react";

interface MarketingBlockProps {
  isDarkMode: boolean;
}

export default function MarketingBlock({ isDarkMode }: MarketingBlockProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://nelaton.app");
    alert("Ссылка скопирована!");
  };

  return (
    <div className="mt-8 space-y-4">
      {/* Компактный блок о Health-Share */}
      <div
        className={`rounded-xl border p-6 shadow-sm ${
          isDarkMode
            ? "bg-gradient-to-r from-teal-900/30 via-cyan-900/30 to-blue-900/30 border-teal-800"
            : "bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 border-teal-100"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3
              className={`text-lg font-bold mb-2 ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}
            >
              Nelaton Health-Share — безопасная забота на расстоянии
            </h3>
            <p
              className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Защищенный доступ к журналу катетеризации. Контролируйте состояние
              здоровья ваших пациентов или близких в реальном времени с
              ограниченным доступом.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm ${
                isDarkMode
                  ? "bg-gray-800 border-teal-700 text-gray-200"
                  : "bg-white/90 border-teal-200 text-gray-700"
              }`}
            >
              <Lock size={16} className="text-teal-600" />
              <span>Защищено</span>
            </div>
            <div
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm ${
                isDarkMode
                  ? "bg-gray-800 border-teal-700 text-gray-200"
                  : "bg-white/90 border-teal-200 text-gray-700"
              }`}
            >
              <Zap size={16} className="text-teal-600" />
              <span>В реальном времени</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Помощь и поддержка */}
        <div
          className={`rounded-xl border p-6 shadow-sm ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDarkMode ? "bg-blue-900" : "bg-blue-100"
              }`}
            >
              <Mail size={20} className="text-blue-600" />
            </div>
            <h3
              className={`text-xl font-bold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              Техническая поддержка
            </h3>
          </div>
          <p
            className={`mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Возникли вопросы или нужна помощь? Свяжитесь с нами:
          </p>
          <a
            href="mailto:support@nelaton.app"
            className="inline-flex items-center gap-2 text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Mail size={18} />
            support@nelaton.app
          </a>
        </div>

        {/* Скачать приложение */}
        <div
          className={`rounded-xl border p-6 shadow-sm ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDarkMode ? "bg-green-900" : "bg-green-100"
              }`}
            >
              <Smartphone size={20} className="text-green-600" />
            </div>
            <h3
              className={`text-xl font-bold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              Поделитесь приложением
            </h3>
          </div>
          <p
            className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Отправьте ссылку на Nelaton коллегам или близким
          </p>
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value="https://nelaton.app"
                readOnly
                className={`flex-1 px-4 py-2 border rounded-lg text-sm ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200"
                    : "bg-gray-50 border-gray-300 text-gray-700"
                }`}
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-gradient-to-r from-[#4baac5] to-[#7076b0] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Копировать
              </button>
            </div>
          </div>
          <div
            className={`pt-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <p
              className={`text-sm mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Или скачайте приложение:
            </p>
            <StoreButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
