import Link from "next/link";

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
  locale: string;
}

export default function ErrorScreen({
  error,
  onRetry,
  locale,
}: ErrorScreenProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Ошибка загрузки
        </h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            Попробовать снова
          </button>
          <Link
            href={`/${locale}`}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
