import { IntervalRecord } from "../types";
import { formatDate } from "../utils";

interface IntervalsSectionProps {
  data: IntervalRecord[];
}

export default function IntervalsSection({ data }: IntervalsSectionProps) {
  return (
    <section>
      <div className="border-b-2 border-[#4BAAC5] pb-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          ⏱️ Интервалы катетеризации
        </h2>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-6xl mb-4">⏱️</div>
          <p>Интервалов пока нет</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((interval) => {
            const hours = interval.interval_hours;
            const durationText =
              hours === 1 ? "1 час" : `${hours} час${hours > 4 ? "ов" : "а"}`;

            return (
              <div
                key={interval.id}
                className={`border-l-4 ${
                  interval.is_night
                    ? "border-indigo-900 bg-indigo-50"
                    : "border-[#4BAAC5] bg-[#f4fbfd]"
                } p-4 rounded-r-lg`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {interval.is_night ? "🌙" : "☀️"}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {interval.is_night
                        ? "Ночной интервал"
                        : "Дневной интервал"}
                    </span>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      interval.is_night ? "text-indigo-900" : "text-[#4BAAC5]"
                    }`}
                  >
                    {durationText}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                      Начало
                    </div>
                    <div className="text-base font-semibold text-gray-900">
                      {interval.start_time?.slice(0, 5)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                      Конец
                    </div>
                    <div className="text-base font-semibold text-gray-900">
                      {interval.end_time?.slice(0, 5)}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Добавлено: {formatDate(interval.created_at)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
