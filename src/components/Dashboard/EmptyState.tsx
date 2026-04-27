import { User } from "lucide-react";

interface EmptyStateProps {
  isDarkMode: boolean;
  onAddPatient: () => void;
}

export default function EmptyState({
  isDarkMode,
  onAddPatient,
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-xl shadow-md p-12 text-center ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div
        className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
      >
        <User
          size={40}
          className={isDarkMode ? "text-gray-400" : "text-gray-400"}
        />
      </div>
      <h3
        className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
      >
        Нет пользователей
      </h3>
      <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        Добавьте первого пользователя с помощью кода приглашения
      </p>
      <button
        onClick={onAddPatient}
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#4baac5] to-[#7076b0] px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
      >
        Добавить пользователя
      </button>
    </div>
  );
}
