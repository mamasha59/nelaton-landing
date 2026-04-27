import { sub } from "date-fns";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import Alerts from "./Alerts/Alerts";
import Brief from "./Brief/Brief";
import ErrorNoRecords from "./ErrorNoRecords/ErrorNoRecords";
import Header from "./Header/Header";
import Metrics from "./Metrics/Metrics";
import Trends from "./Trends/Trends";
import { useAnalysis } from "./hooks/useAnalysis";

export interface iAnalysisResult {
  // Оценки
  overall_score: number;
  regularity_score: number;
  volumes_score: number;
  balance_score: number;
  incidents_score: number;

  // Факты регулярности
  max_interval_hours: number;
  total_cath_count_daily: number;
  big_delays_pct: number;

  // Факты объёмов
  min_ml: number;
  max_ml: number;
  avg_ml: number;
  morning_ml: number;
  low_volume_pct: number;
  qol_low_volume_pct: number;
  total_high_volume_count: number;
  is_morning_volume_critically_high: boolean;

  // Факты баланса
  avg_daily_diuresis: number;
  avg_daily_intake: number;
  output_input_ratio: number;
  is_diuresis_critically_low: boolean;
  is_diuresis_critically_high: boolean;
  low_ratio_flag: boolean;

  // Факты инцидентов
  has_critical_uti_symptoms: boolean;
  stricutre_risk_flag: boolean;
  qol_spasm_after_cath_count: number;
  total_spasm_count: number;
  total_leak_count: number;

  // Ключи для i18n (вместо текста)
  regularity_description_key: string;
  volumes_description_key: string;
  balance_description_key: string;
  incidents_description_key: string;

  // Аномальные записи (JSONB)
  anomalous_records: any;
}
export interface ClinicalAlert {
  id: string;
  level: "red" | "yellow";
  key: string;
  params?: Record<string, any>;
}

export interface ClinicalSentence {
  key: string;
  params?: Record<string, any>;
}

export interface ClinicalTrendItem {
  id: string;
  direction: "better" | "worse" | "same";
  key: string;
  params?: Record<string, any>;
}

export interface AnalysisResult {
  // Оценки
  overall_score: number;
  adherence_score: number; // follow plan score (no safety caps)
  safety_cap: number; // applied cap based on clinical alerts
  safety_status: "green" | "yellow" | "red"; // clinical safety level
  regularity_score: number;
  volumes_score: number;
  balance_score: number;
  incidents_score: number;

  // Важное для клинического резюме
  target_interval_hours: number;

  // Coverage / наличие данных (факт наличия логов)
  data_has_volumes: boolean;
  data_has_intake: boolean;
  data_has_urine_color: boolean;
  urine_color_has_visible_blood: boolean;

  blood_presence_detected: boolean;
  // Факты регулярности
  max_interval_hours: number;
  total_cath_count_daily: number;
  big_delays_pct: number;

  // Факты объёмов
  min_ml: number;
  max_ml: number;
  avg_ml: number;
  morning_ml: number;
  low_volume_pct: number;
  qol_low_volume_pct: number;
  total_high_volume_count: number;
  is_morning_volume_critically_high: boolean;

  // Факты баланса
  avg_daily_diuresis: number;
  avg_daily_intake: number;
  output_input_ratio: number;
  is_diuresis_critically_low: boolean;
  is_diuresis_critically_high: boolean;
  low_ratio_flag: boolean;

  // Факты инцидентов
  has_critical_uti_symptoms: boolean;
  stricutre_risk_flag: boolean;
  qol_spasm_after_cath_count: number;
  total_spasm_count: number;
  total_leak_count: number;

  // Ключи для i18n (вместо текста)
  regularity_description_key: string;
  volumes_description_key: string;
  balance_description_key: string;
  incidents_description_key: string;

  // Клиническое резюме (детерминированное)
  clinical_show: boolean;
  clinical_alerts: ClinicalAlert[];
  clinical_summary_sentences: ClinicalSentence[];
  // Тренды (сравнение с предыдущим периодом)
  clinical_trend_available: boolean;
  clinical_trend_items: ClinicalTrendItem[];
  // Аномальные записи (JSONB)
  anomalous_records: any;
}

// Структура для факта внутри карточки (теперь с ключом перевода)
interface MetricFact {
  labelKey: string;
  value: string | number;
  isAlert?: boolean;
}

export interface DashboardCard {
  id:
    | "overall"
    | "regularity"
    | "balance"
    | "volumes"
    | "incidents"
    | "following_catheterization_schedule";
  titleKey: string;
  score: number | null;
  descriptionKey: string;
  facts: MetricFact[];
}

const getScoreIcon = (score: number | null) => {
  if (score === null)
    return <div className="w-6 h-6 rounded-full bg-gray-400" />;
  if (score >= 8) return <div className="w-6 h-6 rounded-full bg-green-500" />;
  if (score >= 5) return <div className="w-6 h-6 rounded-full bg-yellow-500" />;
  return <div className="w-6 h-6 rounded-full bg-red-500" />;
};

function DayAnalyze({ range, date }: { range?: string; date?: string }) {
  const t = useTranslations("Journal");
  // Для 24h передаем дату, для 3d/7d — строку '3d' или '7d' в range
  const analysisParams = range
    ? { range: range } // для '3d' или '7d'
    : { date: date }; // для single day

  const { analysisResults, error, loading } = useAnalysis(analysisParams);

  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {},
  );

  const dashboardCards: DashboardCard[] = analysisResults
    ? (() => {
        const hasVolumes = Boolean(analysisResults.data_has_volumes);
        const hasIntake = Boolean(analysisResults.data_has_intake);

        const yes = t("clinical.dashboard.facts.yes");
        const no = t("clinical.dashboard.facts.no");
        const noData = t("clinical.dashboard.facts.no_data");
        const na = t("clinical.dashboard.facts.unavailable");

        const formatBool = (val?: boolean) => (val ? yes : no);
        const formatBoolOrData = (val?: boolean) =>
          typeof val === "boolean" ? (val ? yes : no) : noData;

        return [
          {
            id: "overall",
            titleKey: "clinical.dashboard.cards.overall",
            score: Number(analysisResults.overall_score ?? 0),
            descriptionKey: "",
            facts: [],
          },
          {
            id: "following_catheterization_schedule",
            titleKey: "clinical.dashboard.cards.adherence",
            score: Number(analysisResults.adherence_score ?? 0),
            descriptionKey: "",
            facts: [],
          },
          {
            id: "regularity",
            titleKey: "clinical.dashboard.cards.regularity",
            score: Number(analysisResults.regularity_score ?? 0),
            descriptionKey: analysisResults.regularity_description_key,
            facts: [
              {
                labelKey: "clinical.dashboard.facts.target_interval",
                value: Number(analysisResults.target_interval_hours ?? 0),
              },
              {
                labelKey: "clinical.dashboard.facts.max_interval",
                value: Number(analysisResults.max_interval_hours ?? 0),
              },
              {
                labelKey: "clinical.dashboard.facts.big_delays",
                value: `${Number(analysisResults.big_delays_pct ?? 0)}%`,
              },
              {
                labelKey: "clinical.dashboard.facts.avg_daily_cath",
                value: Number(analysisResults.total_cath_count_daily ?? 0),
              },
            ],
          },
          {
            id: "volumes",
            titleKey: "clinical.dashboard.cards.volumes",
            score: hasVolumes
              ? Number(analysisResults.volumes_score ?? 0)
              : null,
            descriptionKey: analysisResults.volumes_description_key,
            facts: hasVolumes
              ? [
                  {
                    labelKey: "clinical.dashboard.facts.min",
                    value: Number(analysisResults.min_ml ?? 0),
                  },
                  {
                    labelKey: "clinical.dashboard.facts.max",
                    value: Number(analysisResults.max_ml ?? 0),
                  },
                  {
                    labelKey: "clinical.dashboard.facts.avg",
                    value: Number(analysisResults.avg_ml ?? 0),
                  },
                  {
                    labelKey: "clinical.dashboard.facts.morning",
                    value: Number(analysisResults.morning_ml ?? 0),
                  },
                  {
                    labelKey: "clinical.dashboard.facts.low_vol_pct",
                    value: `${Number(analysisResults.low_volume_pct ?? 0)}%`,
                  },
                  {
                    labelKey: "clinical.dashboard.facts.qol_vol_pct",
                    value: `${Number(analysisResults.qol_low_volume_pct ?? 0)}%`,
                  },
                  {
                    labelKey: "clinical.dashboard.facts.high_vol_count",
                    value: Number(analysisResults.total_high_volume_count ?? 0),
                  },
                  {
                    labelKey: "clinical.dashboard.facts.morning_high",
                    value: formatBool(
                      analysisResults.is_morning_volume_critically_high,
                    ),
                    isAlert: analysisResults.is_morning_volume_critically_high,
                  },
                ]
              : [
                  {
                    labelKey: "clinical.dashboard.facts.unavailable",
                    value: noData,
                  },
                ],
          },
          {
            id: "balance",
            titleKey: "clinical.dashboard.cards.balance",
            score: hasVolumes
              ? Number(analysisResults.balance_score ?? 0)
              : null,
            descriptionKey: analysisResults.balance_description_key,
            facts: hasVolumes
              ? [
                  {
                    labelKey: "clinical.dashboard.facts.daily_diuresis",
                    value: `${Number(analysisResults.avg_daily_diuresis ?? 0)} ${t("ml")}`,
                  },
                  {
                    labelKey: "clinical.dashboard.facts.daily_intake",
                    value: hasIntake
                      ? `${Number(analysisResults.avg_daily_intake ?? 0)} ${t("ml")}`
                      : noData,
                  },
                  {
                    labelKey: "clinical.dashboard.facts.ratio",
                    value: hasIntake
                      ? `${Number(analysisResults.output_input_ratio ?? 0)}%`
                      : na,
                  },
                  {
                    labelKey: "clinical.dashboard.facts.low_ratio",
                    value: hasIntake
                      ? formatBool(analysisResults.low_ratio_flag)
                      : na,
                    isAlert: analysisResults.low_ratio_flag,
                  },
                  {
                    labelKey: "clinical.dashboard.facts.diuresis_low",
                    value: formatBool(
                      analysisResults.is_diuresis_critically_low,
                    ),
                    isAlert: analysisResults.is_diuresis_critically_low,
                  },
                  {
                    labelKey: "clinical.dashboard.facts.diuresis_high",
                    value: formatBool(
                      analysisResults.is_diuresis_critically_high,
                    ),
                    isAlert: analysisResults.is_diuresis_critically_high,
                  },
                ]
              : [
                  {
                    labelKey: "clinical.dashboard.facts.balance_unavailable",
                    value: "",
                  },
                ],
          },
          {
            id: "incidents",
            titleKey: "clinical.dashboard.cards.incidents",
            score: Number(analysisResults.incidents_score ?? 0),
            descriptionKey: analysisResults.incidents_description_key,
            facts: [
              {
                labelKey: "clinical.dashboard.facts.uti_symptoms",
                value: formatBool(analysisResults.has_critical_uti_symptoms),
                isAlert: analysisResults.has_critical_uti_symptoms,
              },
              {
                labelKey: "clinical.dashboard.facts.trauma_risk",
                value: formatBool(analysisResults.stricutre_risk_flag),
                isAlert: analysisResults.stricutre_risk_flag,
              },
              {
                labelKey: "clinical.dashboard.facts.blood",
                value: formatBoolOrData(
                  analysisResults.blood_presence_detected,
                ),
                isAlert: analysisResults.blood_presence_detected === true,
              },
              {
                labelKey: "clinical.dashboard.facts.spasms_qol",
                value: Number(analysisResults.qol_spasm_after_cath_count ?? 0),
              },
              {
                labelKey: "clinical.dashboard.facts.total_spasms",
                value: Number(analysisResults.total_spasm_count ?? 0),
              },
              {
                labelKey: "clinical.dashboard.facts.total_leaks",
                value: Number(analysisResults.total_leak_count ?? 0),
              },
            ],
          },
        ];
      })()
    : [];

  if (loading) {
    return <LoadingScreen compact />;
  }

  if (error) {
    const periodLabel =
      range === "7d" ? "7 дней" : range === "3d" ? "3 дня" : range;
    const startDate = range
      ? sub(new Date(), { days: Number(range.replace("d", "")) })
      : null;
    const endDate = new Date();

    return (
      <ErrorNoRecords
        range={range}
        startDate={startDate}
        endDate={endDate}
        periodLabel={periodLabel}
      />
    );
  }

  if (!analysisResults) {
    return null; // Пока нет данных - ничего не показываем
  }

  return (
    <div className="bg-gray-50">
      {/* Заголовок блока аналитики с датой */}
      <Header date={date} range={range} score={dashboardCards} />

      {/* Алерты */}
      {analysisResults?.clinical_alerts &&
        analysisResults.clinical_alerts.length > 0 && (
          <div className="mx-5 mt-4 space-y-3">
            {analysisResults.clinical_alerts.map((alert) => (
              <Alerts key={alert.id} alert={alert} />
            ))}
          </div>
        )}

      {/* Подзаголовок - описание */}
      {/* <div
        className="mx-5 mb-4 p-3 rounded-xl border"
        style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}
      >
        <p
          className="text-xs font-medium leading-relaxed text-center"
          style={{ color: "#1E40AF" }}
        >
          {t("clinical.dashboard.subtitle")}
        </p>
      </div> */}

      {/* Клиническое резюме*/}
      {analysisResults?.clinical_show && dashboardCards.length > 0 && (
        <Brief analysisResults={analysisResults} />
      )}

      {/* Тренды */}
      {analysisResults?.clinical_trend_available && (
        <Trends analysisResults={analysisResults} />
      )}

      {/* Метрические карточки */}
      <Metrics
        dashboardCards={dashboardCards}
        expandedCards={expandedCards}
        setExpandedCards={setExpandedCards}
        getScoreIcon={getScoreIcon}
      />

      {/* Дисклеймер */}
      {/* <div className="mx-5 mt-6 mb-8 p-4.5 bg-yellow-100 rounded-2xl border border-yellow-300 flex items-start">
        <div className="mr-3 mt-0.5 shrink-0">
          <Info className="w-5 h-5 text-yellow-700" />
        </div>
        <p className="flex-1 text-xs text-yellow-900 leading-tight font-medium">
          {t("clinical.dashboard.disclaimer")}
        </p>
      </div> */}
    </div>
  );
}

export default DayAnalyze;
