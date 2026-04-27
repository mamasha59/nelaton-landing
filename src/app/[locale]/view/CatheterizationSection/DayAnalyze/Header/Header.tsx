import { sub } from "date-fns";
import { BarChart3, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { DashboardCard } from "../DayAnalyze";

export default function Header({
  date,
  score,
  range,
}: {
  date: string | undefined;
  score: DashboardCard[];
  range: string | undefined;
}) {
  const t = useTranslations("Journal");

  const selectedRange =
    range &&
    `промежуток ${range === "7d" ? "7 дней" : range === "3d" ? "3 дня" : range}, ${sub(
      new Date(),
      {
        days: Number(range.replace("d", "")),
      },
    ).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })} - ${new Date().toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })} `;

  return (
    <div className="mx-5 mt-6 mb-4 p-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg border-2 border-indigo-400 flex items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <BarChart3 className="w-6 h-6 text-white drop-shadow-md" />
          </div>
          <h2 className="text-xl font-bold text-white drop-shadow-md">
            {t("clinical.dashboard.title")}
          </h2>
        </div>
        <div className="flex items-center gap-2 ml-13">
          <Calendar className="w-4 h-4 text-white drop-shadow-sm" />
          <p className="text-sm font-semibold text-white drop-shadow-sm">
            {range
              ? selectedRange
              : date &&
                new Date(date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
          </p>
        </div>
      </div>

      {/* Круг оценки справа */}
      <div className="flex flex-col items-center justify-center shrink-0">
        <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center shadow-xl">
          <span className="text-3xl font-extrabold text-indigo-600 leading-tight">
            {score[0]?.score ?? "—"}
          </span>
          <span className="text-sm font-semibold text-indigo-500 -mt-1">
            /10
          </span>
        </div>
        <p className="text-xs text-black font-bold mt-2 text-center drop-shadow-sm">
          {t("clinical.dashboard.overall_score")}
        </p>
      </div>
      {/* Круг оценки следования графику катетеризации справа */}
      <div className="flex flex-col items-center justify-center shrink-0">
        <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center shadow-xl">
          <span className="text-3xl font-extrabold text-indigo-600 leading-tight">
            {score[1]?.score ?? "—"}
          </span>
          <span className="text-sm font-semibold text-indigo-500 -mt-1">
            /10
          </span>
        </div>
        <p className="text-xs text-black font-bold mt-2 text-center drop-shadow-sm max-w-[80px]">
          {t("clinical.dashboard.cards.adherence")}
        </p>
      </div>
    </div>
  );
}
