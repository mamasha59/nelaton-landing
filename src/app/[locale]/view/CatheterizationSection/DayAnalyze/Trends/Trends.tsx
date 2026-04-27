import { CheckCircle2, Minus, TrendingDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnalysisResult } from "../DayAnalyze";

export default function Trends({
  analysisResults,
}: {
  analysisResults: AnalysisResult;
}) {
  const t = useTranslations("Journal");

  return (
    <div className="mx-5 my-4 p-4 bg-white rounded-2xl border border-gray-200">
      <h3 className="text-base font-bold mb-1.5" style={{ color: "#111827" }}>
        {t("clinical.trend.title") || "Dynamics"}
      </h3>

      {!!analysisResults.clinical_trend_items?.length &&
        analysisResults.clinical_trend_items.map((item) => {
          let IconComponent = Minus;
          let iconColor = "#6b7280";

          if (item.direction === "better") {
            IconComponent = CheckCircle2;
            iconColor = "#16a34a";
          } else if (item.direction === "worse") {
            IconComponent = TrendingDown;
            iconColor = "#dc2626";
          }

          const contentText = t(item.key, item.params);
          const range = item.params?.range || "";
          const finalString = t("clinical.trend.format", {
            range: range,
            content: contentText,
          });

          return (
            <div key={item.id} className="flex items-start mt-2 py-1">
              <IconComponent
                className="mr-2 w-5 h-5 mt-0.5"
                style={{ color: iconColor }}
              />
              <p
                className="flex-1 text-sm leading-5 font-semibold"
                style={{ color: "#374151" }}
              >
                {finalString}
              </p>
            </div>
          );
        })}
    </div>
  );
}
