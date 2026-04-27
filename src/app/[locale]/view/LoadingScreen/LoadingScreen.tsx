interface LoadingScreenProps {
  compact?: boolean;
}

export default function LoadingScreen({ compact = false }: LoadingScreenProps) {
  return (
    <div
      className={`${compact ? "py-12" : "min-h-screen"} bg-gray-100 flex items-center justify-center`}
    >
      <div className="text-center">
        <div
          className={`animate-spin rounded-full ${compact ? "h-8 w-8" : "h-12 w-12"} border-b-2 border-purple-600 mx-auto ${compact ? "mb-2" : "mb-4"}`}
        ></div>
        <p className={`text-gray-600 ${compact ? "text-sm" : ""}`}>
          Загрузка данных...
        </p>
      </div>
    </div>
  );
}
