import Logo from "@/images/appLogoPngWhite.png";
import {
  ArrowLeft,
  BarChart2,
  Download,
  Moon,
  RefreshCw,
  Sun,
  Zap,
} from "lucide-react";
import Image from "next/image";

export type AnalysisRange = "24h" | "3d" | "7d";

interface JournalHeaderProps {
  patientName: string;
  viewCount: number;
  expiresAt: string | null;
  patientAge?: string;
  catheterSize?: string;
  bladderVolume?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdate?: Date | null;
  onBack?: () => void;
  onExportPDF?: () => void;
  onExportExcel?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  analysisRange?: AnalysisRange;
  onAnalysisRangeChange?: (range: AnalysisRange) => void;
  bioDayEnabled?: boolean;
  onBioDayChange?: (enabled: boolean) => void;
}

export default function JournalHeader({
  patientName,
  viewCount,
  expiresAt,
  patientAge,
  catheterSize,
  bladderVolume,
  onRefresh,
  isRefreshing,
  lastUpdate,
  onBack,
  onExportPDF,
  onExportExcel,
  isDarkMode,
  onToggleDarkMode,
  analysisRange,
  onAnalysisRangeChange,
  bioDayEnabled,
  onBioDayChange,
}: JournalHeaderProps) {
  const formatLastUpdate = (date: Date | null) => {
    if (!date) return null;
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return "только что";
    if (diff < 3600) return `${Math.floor(diff / 60)} мин назад`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ч назад`;
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="bg-gradient-to-r from-[#4baac5] to-[#7076b0] text-white p-4 sm:p-8 rounded-b-xl">
      {/* Верхняя строка: Лого слева, кнопки справа */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
        <div className="flex items-center gap-4 shrink-0">
          <div className="bg-white/15 rounded-lg p-1.5 sm:p-2 backdrop-blur-sm">
            <Image
              src={Logo}
              alt="Nelaton App"
              width={160}
              height={40}
              className="w-[100px] sm:w-[160px] h-auto"
            />
          </div>
        </div>
        <div className="flex items-start gap-1.5 sm:gap-3 flex-wrap justify-end">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="bg-white/20 hover:bg-white/30 p-1.5 sm:p-2 rounded-lg transition-all"
              title={isDarkMode ? "Светлый режим" : "Темный режим"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          {onExportPDF && (
            <button
              onClick={onExportPDF}
              className="bg-white/20 hover:bg-white/30 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-2"
              title="Экспорт в PDF"
            >
              <Download size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          )}
          {onExportExcel && (
            <button
              onClick={onExportExcel}
              className="bg-white/20 hover:bg-white/30 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-2"
              title="Экспорт в Excel"
            >
              <Download size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Excel</span>
            </button>
          )}
          {onRefresh && (
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-2 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  size={14}
                  className={`sm:w-4 sm:h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">
                  {isRefreshing ? "Обновление..." : "Обновить"}
                </span>
              </button>
              {lastUpdate && (
                <span className="text-[10px] sm:text-xs opacity-70 flex items-center gap-1">
                  <Zap size={10} className="sm:w-3 sm:h-3" />
                  {formatLastUpdate(lastUpdate)}
                </span>
              )}
            </div>
          )}
          {onBack && (
            <button
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-2"
            >
              <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Назад к списку</span>
            </button>
          )}
        </div>
      </div>

      {/* Информация о пациенте */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
            <h1 className="text-xl sm:text-3xl font-bold">{patientName}</h1>
            <div className="flex items-end gap-3 sm:gap-4 flex-wrap">
              {onBioDayChange && (
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="text-[10px] sm:text-xs text-white/80 font-medium">
                    Био День
                  </span>
                  <button
                    onClick={() => onBioDayChange(!bioDayEnabled)}
                    className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-colors duration-200 focus:outline-none ${
                      bioDayEnabled ? "bg-white" : "bg-white/30"
                    }`}
                    aria-label="Био День"
                  >
                    <span
                      className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-5 h-5 sm:w-5 sm:h-5 rounded-full transition-transform duration-200 ${
                        bioDayEnabled
                          ? "translate-x-6 sm:translate-x-7 bg-[#4baac5]"
                          : "translate-x-0 bg-white/70"
                      }`}
                    />
                  </button>
                </div>
              )}
              {onAnalysisRangeChange && (
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="text-[10px] sm:text-xs text-white/80 font-medium">
                    Интервал анализа
                  </span>
                  <div className="flex items-center gap-1 sm:gap-2 bg-white/20 rounded-lg p-0.5 sm:p-1">
                    <button
                      onClick={() => onAnalysisRangeChange("24h")}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
                      style={{
                        backgroundColor:
                          analysisRange === "24h" ? "#ffffff" : "transparent",
                        color: analysisRange === "24h" ? "#4baac5" : "#ffffff",
                      }}
                    >
                      1 день
                    </button>
                    <button
                      onClick={() => onAnalysisRangeChange("3d")}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
                      style={{
                        backgroundColor:
                          analysisRange === "3d" ? "#ffffff" : "transparent",
                        color: analysisRange === "3d" ? "#4baac5" : "#ffffff",
                      }}
                    >
                      3 дня
                    </button>
                    <button
                      onClick={() => onAnalysisRangeChange("7d")}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
                      style={{
                        backgroundColor:
                          analysisRange === "7d" ? "#ffffff" : "transparent",
                        color: analysisRange === "7d" ? "#4baac5" : "#ffffff",
                      }}
                    >
                      7 дней
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-1.5 text-sm leading-relaxed">
            {patientAge && (
              <div>
                <span className="opacity-90">Возраст:</span>{" "}
                <span className="font-semibold">{patientAge}</span>
              </div>
            )}
            {catheterSize && (
              <div>
                <span className="opacity-90">Размер катетера:</span>{" "}
                <span className="font-semibold">{catheterSize} Ch/FR</span>
              </div>
            )}
            {bladderVolume && (
              <div>
                <span className="opacity-90">Объем мочевого пузыря:</span>{" "}
                <span className="font-semibold">{bladderVolume}</span>
              </div>
            )}
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <BarChart2 size={16} />
                  Просмотров: <b>{viewCount}</b>
                </span>
                {/* {!expiresAt && (
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    Действителен до: <b>{formatDate(expiresAt)}</b>
                  </span>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
