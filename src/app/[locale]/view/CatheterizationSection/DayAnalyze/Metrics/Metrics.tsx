import { ChevronDown, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { DashboardCard } from "../DayAnalyze";

interface MetricsProps {
  dashboardCards: DashboardCard[];
  expandedCards: { [key: string]: boolean };
  setExpandedCards: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  getScoreIcon: (score: number | null) => React.ReactNode;
}

export default function Metrics({
  dashboardCards,
  expandedCards,
  setExpandedCards,
  getScoreIcon,
}: MetricsProps) {
  const t = useTranslations("Journal");
  return (
    <div className="px-5">
      {dashboardCards.slice(1).map((card) => {
        const scoreIcon = getScoreIcon(card.score);
        const isExpanded = expandedCards[card.id] ?? false;

        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-200"
          >
            {/* Хедер - кликабельный */}
            <div
              className="flex justify-between items-center cursor-pointer select-none"
              onClick={() =>
                setExpandedCards((prev) => ({
                  ...prev,
                  [card.id]: !prev[card.id],
                }))
              }
            >
              <div className="flex items-center flex-1">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mr-3 bg-gray-100">
                  {scoreIcon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 flex-1">
                  {t(card.titleKey)}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl min-w-[60px] text-center bg-gray-50">
                  <span className="text-sm font-bold text-gray-700">
                    {card.score === null ? "—" : `${card.score}/10`}
                  </span>
                </div>
                <div className="w-6 h-6 flex items-center justify-center">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Контент - сворачиваемый */}
            {isExpanded && (
              <>
                {/* Описание */}
                {card.descriptionKey && (
                  <div className="bg-gray-50 rounded-xl p-3.5 my-4 border-l-[3px] border-blue-500">
                    <p className="text-sm text-gray-700 leading-5 font-medium">
                      {t(card.descriptionKey)}
                    </p>
                  </div>
                )}

                {/* Факты */}
                {card.facts.length > 0 && (
                  <div className="space-y-2.5">
                    {card.facts.map((fact, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-2.5 px-3.5 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <span className="text-xs text-gray-500 font-semibold flex-1 mr-3">
                          {t(fact.labelKey)}
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            fact.isAlert ? "text-red-600" : "text-gray-900"
                          }`}
                        >
                          {fact.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
