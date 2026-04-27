import { FileText } from "lucide-react";

interface AddPatientModalProps {
  isOpen: boolean;
  isLoading: boolean;
  newCode: string;
  error: string | null;
  onCodeChange: (code: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSkip: () => void;
}

export default function AddPatientModal({
  isOpen,
  isLoading,
  newCode,
  error,
  onCodeChange,
  onSubmit,
  onSkip,
}: AddPatientModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Код приглашения от пользователя
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Введите код, который предоставил вам пользователь
          </p>
        </div>

        {/* Инструкция как получить код */}
        <div className="mb-6 rounded-lg bg-blue-50 p-4 border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <FileText size={16} />
            Как получить код пользователя?
          </h3>
          <ol className="text-xs text-blue-800 space-y-1.5 list-decimal list-inside">
            <li>Пользователь открывает приложение Nelaton</li>
            <li>Переходит в раздел &ldquo;Профиль&rdquo;</li>
            <li>Нажимает на большую зеленую кнопку</li>
            <li>Следует подробной инструкции в приложении</li>
            <li>Отправляет вам сгенерированный код</li>
          </ol>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            value={newCode}
            onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
            placeholder="ABC123XYZ"
            maxLength={9}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-xl font-bold uppercase tracking-widest focus:border-[#4baac5] focus:outline-none focus:ring-2 focus:ring-[#4baac5]/20"
            disabled={isLoading}
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading || newCode.length < 6}
              className="flex-1 rounded-lg bg-gradient-to-r from-[#4baac5] to-[#7076b0] px-6 py-3 font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? "Проверка..." : "Активировать"}
            </button>
            <button
              type="button"
              onClick={onSkip}
              disabled={isLoading}
              className="flex-1 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-400 disabled:opacity-50"
            >
              Пропустить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
