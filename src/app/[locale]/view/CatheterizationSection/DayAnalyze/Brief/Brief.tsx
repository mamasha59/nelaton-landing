import { useTranslations } from "next-intl";
import { AnalysisResult } from "../DayAnalyze";

export default function Brief({
  analysisResults,
}: {
  analysisResults: AnalysisResult;
}) {
  const t = useTranslations("Journal");

  return (
    <div className="mx-5 my-5 p-5 bg-blue-50 rounded-2xl border-l-4 border-blue-500 flex gap-4">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-bold text-blue-900">
            {t("clinical.title") || "Clinical Summary"}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 mt-2.5 mb-3">
          <span
            className="px-2.5 py-1.5 rounded-full border text-xs font-semibold"
            style={{
              backgroundColor: "#DBEAFE",
              borderColor: "#93C5FD",
              color: "#1E40AF",
            }}
          >
            {t("clinical.dashboard.chips.volumes")}
          </span>
          <span
            className="px-2.5 py-1.5 rounded-full border text-xs font-semibold"
            style={{
              backgroundColor: "#DBEAFE",
              borderColor: "#93C5FD",
              color: "#1E40AF",
            }}
          >
            {t("clinical.dashboard.chips.intake")}
          </span>
          <span
            className="px-2.5 py-1.5 rounded-full border text-xs font-semibold"
            style={{
              backgroundColor: "#DBEAFE",
              borderColor: "#93C5FD",
              color: "#1E40AF",
            }}
          >
            {t("clinical.dashboard.chips.color")}
          </span>
        </div>

        <p className="text-sm text-gray-700 leading-snug">
          {!!analysisResults.clinical_summary_sentences?.length &&
            analysisResults.clinical_summary_sentences.map((s, i) => {
              return (i === 0 ? "" : " ") + t(s.key, s.params);
            })}
        </p>
      </div>
    </div>
  );
}
