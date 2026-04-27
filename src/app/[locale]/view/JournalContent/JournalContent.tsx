"use client";

import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import CatheterizationSection from "../CatheterizationSection/CatheterizationSection";
import DateNavigation from "../DateNavigation/DateNavigation";
import { exportExcel, exportPDF } from "../export";
import ExportPDFModal from "../ExportPDFModal/ExportPDFModal";
import IntervalsSection from "../IntervalsSection/IntervalsSection";
import JournalFooter from "../JournalFooter/JournalFooter";
import JournalHeader, { AnalysisRange } from "../JournalHeader/JournalHeader";
import { JournalData } from "../types";

interface JournalContentProps {
  data: JournalData;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdate?: Date | null;
  onBack?: () => void;
}

export default function JournalContent({
  data,
  onRefresh,
  isRefreshing,
  lastUpdate,
  onBack,
}: JournalContentProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [visibleMonths, setVisibleMonths] = useState<Set<string>>(new Set());
  const [activeDate, setActiveDate] = useState<string | undefined>();
  const [analysisRange, setAnalysisRange] = useState<AnalysisRange>("24h");
  const [bioDayEnabled, setBioDayEnabled] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);

  // Количество уникальных дней в данных
  const availableDaysCount = data
    ? new Set(
        (data.catheterization_data || []).map((r) => r.timeStamp.split(" ")[0]),
      ).size
    : 0;

  const handleExportPDF = async (days: number) => {
    await exportPDF({
      records: data.catheterization_data || [],
      days,
      patientName: data.patient_name || "Patient",
    });
  };

  const handleExportExcel = (days: number) => {
    exportExcel({
      records: data.catheterization_data || [],
      days,
      patientName: data.patient_name || "patient",
    });
  };

  // Extract unique dates from catheterization data
  const availableDates = data
    ? Array.from(
        new Set(
          (data.catheterization_data || []).map(
            (record) => record.timeStamp.split(" ")[0],
          ),
        ),
      ).sort((a, b) => b.localeCompare(a))
    : [];

  // Initialize with current month visible
  useEffect(() => {
    if (availableDates.length > 0) {
      const [year, month] = availableDates[0].split("-");
      const currentMonth = `${year}-${month}`;
      if (currentMonth) {
        setVisibleMonths(new Set([currentMonth]));
        setActiveDate(availableDates[0]);
      }
    }
  }, [availableDates.length]);

  // Intersection Observer для отслеживания видимых дат при скролле
  useEffect(() => {
    if (availableDates.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dateId = entry.target.id.replace("date-", "");
            setActiveDate(dateId);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    // Наблюдаем за всеми блоками дат
    availableDates.forEach((date) => {
      const element = document.getElementById(`date-${date}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [availableDates, visibleMonths]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-gray-600">Данные журнала отсутствуют</p>
        </div>
      </div>
    );
  }

  const handleMonthToggle = (monthKey: string, isExpanded: boolean) => {
    setVisibleMonths((prev) => {
      const newSet = new Set(prev);
      if (isExpanded) {
        newSet.add(monthKey);
      } else {
        newSet.delete(monthKey);

        // When closing a month, scroll to the nearest visible month
        setTimeout(() => {
          if (newSet.size > 0) {
            // Find the first date from remaining visible months
            const firstVisibleDate = availableDates.find((date) => {
              const [year, month] = date.split("-");
              const dateMonthKey = `${year}-${month}`;
              return newSet.has(dateMonthKey);
            });

            if (firstVisibleDate) {
              const element = document.getElementById(
                `date-${firstVisibleDate}`,
              );
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }
          }
        }, 100);
      }
      return newSet;
    });
  };

  const scrollToDate = (date: string) => {
    const [year, month] = date.split("-");
    const monthKey = `${year}-${month}`;

    // Add this month to visible months if not already visible
    setVisibleMonths((prev) => {
      const newSet = new Set(prev);
      newSet.add(monthKey);
      return newSet;
    });

    // Wait a bit for the DOM to update before scrolling
    setTimeout(() => {
      const element = document.getElementById(`date-${date}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsMobileNavOpen(false);
      }
    }, 100);
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 transition-colors ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* Mobile Navigation Toggle */}
      {availableDates.length > 0 && (
        <div
          className={`lg:hidden max-w-4xl mx-auto mb-4 sticky top-0 z-20 py-2 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
        >
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className={`w-full border rounded-lg px-4 py-3 flex items-center justify-between shadow-sm ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-200"
            }`}
          >
            <span
              className={`font-semibold flex items-center gap-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
            >
              <Calendar size={18} />
              Перейти к дате
            </span>
            <span className="text-gray-400">{isMobileNavOpen ? "▲" : "▼"}</span>
          </button>
          {isMobileNavOpen && (
            <div className="mt-2">
              <DateNavigation
                dates={availableDates}
                selectedDate={activeDate}
                onDateClick={scrollToDate}
                onMonthToggle={handleMonthToggle}
              />
            </div>
          )}
        </div>
      )}

      {/* Desktop Layout */}
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Desktop Sidebar Navigation */}
        {availableDates.length > 0 && (
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-4">
            <DateNavigation
              dates={availableDates}
              selectedDate={activeDate}
              onDateClick={scrollToDate}
              onMonthToggle={handleMonthToggle}
            />
          </aside>
        )}

        {/* Main Content */}
        <div
          className={`flex-1 shadow-2xl min-w-0 transition-colors ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <JournalHeader
            patientName={data.patient_name || "Неизвестный пациент"}
            viewCount={data.access_info?.view_count || 0}
            expiresAt={data.access_info?.expires_at || null}
            onRefresh={onRefresh}
            isRefreshing={isRefreshing}
            lastUpdate={lastUpdate}
            onBack={onBack}
            onExportPDF={() => setIsExportModalOpen(true)}
            onExportExcel={() => setIsExcelModalOpen(true)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            analysisRange={analysisRange}
            onAnalysisRangeChange={setAnalysisRange}
            bioDayEnabled={bioDayEnabled}
            onBioDayChange={setBioDayEnabled}
          />

          <div className={`p-8 ${isDarkMode ? "text-gray-200" : ""}`}>
            <CatheterizationSection
              data={data.catheterization_data || []}
              visibleMonths={visibleMonths}
              analysisRange={analysisRange}
            />
            <IntervalsSection data={data.intervals_data || []} />
          </div>

          <JournalFooter
            grantedAt={data.access_info?.granted_at || new Date().toISOString()}
          />
        </div>
      </div>

      <ExportPDFModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExportPDF}
        availableDaysCount={availableDaysCount}
      />

      <ExportPDFModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onExport={handleExportExcel}
        availableDaysCount={availableDaysCount}
        format="excel"
      />
    </div>
  );
}
