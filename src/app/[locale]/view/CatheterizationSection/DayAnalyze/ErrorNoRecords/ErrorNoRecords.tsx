interface ErrorNoRecordsProps {
  range: string | undefined;
  startDate: Date | null;
  endDate: Date | null;
  periodLabel: string | undefined;
}

export default function ErrorNoRecords({
  range,
  startDate,
  endDate,
  periodLabel,
}: ErrorNoRecordsProps) {
  const formatDate = (d: Date) =>
    d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="mx-5 my-4 p-5 rounded-2xl border-2 border-red-200 bg-red-50">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-2xl">📭</span>
        </div>
        <div>
          <p className="text-base font-semibold text-gray-800 mb-2">
            Записи в дневнике не найдены
          </p>
          {range && startDate && endDate && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-100 border border-red-300">
              <span className="text-sm font-medium text-red-700">
                {periodLabel}:
              </span>
              <span className="text-sm font-bold text-red-800">
                {formatDate(startDate)} — {formatDate(endDate)}
              </span>
            </div>
          )}
          <p className="text-sm text-gray-600 mt-3">
            Выберите{" "}
            <span className="font-semibold text-blue-600">24 часа</span> для
            анализа конкретного дня
          </p>
        </div>
      </div>
    </div>
  );
}
