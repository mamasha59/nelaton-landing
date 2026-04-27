"use client";

import { AnalysisRange } from "../JournalHeader/JournalHeader";
import { CatheterizationRecord } from "../types";
import { formatTime } from "../utils";
import DayAnalyze from "./DayAnalyze/DayAnalyze";

interface CatheterizationSectionProps {
  data: CatheterizationRecord[];
  visibleMonths: Set<string>;
  analysisRange?: AnalysisRange;
}

interface GroupedByDate {
  [date: string]: CatheterizationRecord[];
}

export default function CatheterizationSection({
  data,
  visibleMonths,
  analysisRange,
}: CatheterizationSectionProps) {
  console.log(analysisRange, "analysisRangeanalysisRangeanalysisRange");
  const groupedByDate: GroupedByDate = {};
  data.forEach((record) => {
    const date = record.timeStamp.split(" ")[0];
    const [year, month] = date.split("-");
    const monthKey = `${year}-${month}`;

    // Only include dates from visible months
    if (visibleMonths.has(monthKey)) {
      if (!groupedByDate[date]) groupedByDate[date] = [];
      groupedByDate[date].push(record);
    }
  });

  const getActionText = (
    record: CatheterizationRecord,
  ): { text: string; color: string } => {
    if (record.urine?.catheterType)
      return { text: "Катетеризация", color: "#2d3436" };
    if (record.amountOfDrankFluids)
      return { text: "Прием жидкости", color: "#4e8eef" };
    if (record.leakageReason) return { text: "Подтекание", color: "#d63031" };
    if (record.naturalUrination)
      return { text: "Естественное мочеиспускание", color: "#00b894" };
    if (record.urineUrge) return { text: "Позыв", color: "#fdcb6e" };
    return { text: "-", color: "#999" };
  };

  const formatVolume = (value: number | undefined, unit?: string): string => {
    if (!value) return "-";
    return `${value} ${unit || "мл"}`;
  };

  if (data.length === 0) {
    return (
      <section className="mb-12">
        <div className="text-center py-12 text-gray-400">
          <div className="text-6xl mb-4">📋</div>
          <p>Записей в дневнике пока нет</p>
        </div>
      </section>
    );
  }

  // Рассчитываем диапазон дат для периодного анализа
  const allDates = Object.keys(groupedByDate).sort((a, b) =>
    b.localeCompare(a),
  );
  const startDate = allDates[allDates.length - 1];
  const endDate = allDates[0];

  return (
    <section className="mb-12">
      {/* Периодный анализ для 3 и 7 дней */}
      {(analysisRange === "3d" || analysisRange === "7d") && (
        <DayAnalyze range={analysisRange} />
      )}
      {Object.entries(groupedByDate).map(([date, records]) => {
        let totalIntake = 0,
          totalOutput = 0,
          cathCount = 0,
          leakCount = 0;
        records.forEach((r) => {
          if (r.amountOfDrankFluids?.value)
            totalIntake += r.amountOfDrankFluids.value;
          if (r.urine?.amountOfReleasedUrine) {
            totalOutput += r.urine.amountOfReleasedUrine;
            cathCount++;
          }
          if (r.naturalUrination?.releasedUrine)
            totalOutput += r.naturalUrination.releasedUrine;
          if (r.leakageReason) leakCount++;
        });

        return (
          <div key={date} id={`date-${date}`} className="mb-8 scroll-mt-4">
            <div className="border-b-2 border-[#4BAAC5] pb-2 mb-3">
              <h3 className="text-xl font-bold text-gray-800">{date}</h3>
            </div>
            {analysisRange === "24h" && <DayAnalyze date={date} />}
            <div className="flex justify-between bg-[#f4fbfd] border border-[#b8e4f0] rounded-lg p-4 mb-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 uppercase tracking-wide">
                  Выпито
                </span>
                <span className="text-lg font-bold text-[#2c3e50] mt-1">
                  {formatVolume(totalIntake)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 uppercase tracking-wide">
                  Выделенная моча
                </span>
                <span className="text-lg font-bold text-[#2c3e50] mt-1">
                  {formatVolume(totalOutput)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 uppercase tracking-wide">
                  Катетериз.
                </span>
                <span className="text-lg font-bold text-[#2c3e50] mt-1">
                  {cathCount}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 uppercase tracking-wide">
                  Подтекан.
                </span>
                <span
                  className={`text-lg font-bold mt-1 ${leakCount > 0 ? "text-[#d63031]" : "text-[#2c3e50]"}`}
                >
                  {leakCount}
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#4BAAC5] text-white">
                    <th className="border border-[#4BAAC5] px-2 py-2 text-xs">
                      Время
                    </th>
                    <th className="border border-[#4BAAC5] px-3 py-2 text-left text-xs">
                      Действие
                    </th>
                    <th className="border border-[#4BAAC5] px-2 py-2 text-xs">
                      Боль
                    </th>
                    <th className="border border-[#4BAAC5] px-3 py-2 text-xs">
                      Позыв
                    </th>
                    <th className="border border-[#4BAAC5] px-3 py-2 text-xs">
                      Прием
                    </th>
                    <th className="border border-[#4BAAC5] px-3 py-2 text-xs">
                      Вывод
                    </th>
                    <th className="border border-[#4BAAC5] px-3 py-2 text-xs">
                      Цвет
                    </th>
                    <th className="border border-[#4BAAC5] px-3 py-2 text-xs">
                      Подтек.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => {
                    const action = getActionText(record);
                    const urineColor =
                      record.urine?.urineColor ||
                      record.naturalUrination?.urineColor;
                    return (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-2 py-2 text-center font-bold whitespace-nowrap">
                          {formatTime(record.timeStamp)}
                          {record.isMissedRecord && (
                            <span className="text-orange-500 ml-1">*</span>
                          )}
                        </td>
                        <td className="border border-gray-200 px-3 py-2">
                          <span
                            style={{ color: action.color, fontWeight: "bold" }}
                          >
                            {action.text}
                          </span>
                          {record.urine?.urineSymptom && (
                            <div className="text-xs text-red-600 mt-1">
                              {record.urine.urineSymptom}
                            </div>
                          )}
                        </td>
                        <td className="border border-gray-200 px-2 py-2 text-center">
                          {record.naturalUrination?.painVote || "-"}
                        </td>
                        <td className="border border-gray-200 px-3 py-2 text-xs">
                          {record.urineUrge?.urgeType || "-"}
                        </td>
                        <td className="border border-gray-200 px-3 py-2 text-center">
                          {record.amountOfDrankFluids &&
                            formatVolume(
                              record.amountOfDrankFluids.value,
                              record.amountOfDrankFluids.unit?.title,
                            )}
                        </td>
                        <td className="border border-gray-200 px-3 py-2 text-center font-bold text-[#4e8eef]">
                          {formatVolume(
                            record.urine?.amountOfReleasedUrine ||
                              record.naturalUrination?.releasedUrine,
                          )}
                        </td>
                        <td className="border border-gray-200 px-3 py-2 text-center">
                          {urineColor && (
                            <div className="flex items-center justify-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full border-2 border-gray-400"
                                style={{ backgroundColor: urineColor.color }}
                              />
                              <span className="text-xs">
                                {urineColor.title.split(".").pop() ||
                                  urineColor.title}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="border border-gray-200 px-3 py-2 text-xs text-center text-red-600">
                          {record.leakageReason?.value || "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </section>
  );
}
