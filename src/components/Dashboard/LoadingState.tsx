interface LoadingStateProps {
  isDarkMode: boolean;
}

export default function LoadingState({ isDarkMode }: LoadingStateProps) {
  return (
    <div
      className={`rounded-xl shadow-md p-12 text-center ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4baac5] mb-4"></div>
        <p
          className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Загрузка пользователей...
        </p>
      </div>
    </div>
  );
}
