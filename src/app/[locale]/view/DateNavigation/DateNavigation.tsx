"use client";

import { useState } from "react";

interface DateNavigationProps {
  dates: string[];
  selectedDate?: string;
  onDateClick: (date: string) => void;
  onMonthToggle?: (monthKey: string, isExpanded: boolean) => void;
}

interface GroupedDates {
  [month: string]: string[];
}

export default function DateNavigation({
  dates,
  selectedDate,
  onDateClick,
  onMonthToggle,
}: DateNavigationProps) {
  // Group dates by month
  const groupedDates: GroupedDates = {};
  dates.forEach((date) => {
    const [year, month] = date.split("-");
    const monthKey = `${year}-${month}`;
    if (!groupedDates[monthKey]) groupedDates[monthKey] = [];
    groupedDates[monthKey].push(date);
  });

  // Initialize with only the first (most recent) month expanded
  const firstMonthKey = Object.keys(groupedDates)[0];
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(
    new Set(firstMonthKey ? [firstMonthKey] : []),
  );

  const toggleMonth = (monthKey: string) => {
    const newExpanded = new Set(expandedMonths);
    const isExpanding = !newExpanded.has(monthKey);

    if (newExpanded.has(monthKey)) {
      newExpanded.delete(monthKey);
    } else {
      newExpanded.add(monthKey);
    }
    setExpandedMonths(newExpanded);

    // Notify parent component about the toggle
    if (onMonthToggle) {
      onMonthToggle(monthKey, isExpanding);
    }
  };

  const formatMonthYear = (monthKey: string) => {
    const [year, month] = monthKey.split("-");
    const monthNames = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const formatDay = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };

  if (dates.length === 0) return null;

  return (
    <nav className="bg-white rounded-lg border border-gray-200 shadow-sm max-h-[calc(100vh-2rem)] overflow-y-auto sticky top-0">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#4baac5] to-[#7076b0] rounded-t-lg">
        <h3 className="font-bold text-white">📅 Быстрый переход</h3>
      </div>
      <div className="p-2">
        {Object.entries(groupedDates).map(([monthKey, monthDates]) => {
          const isExpanded = expandedMonths.has(monthKey);
          return (
            <div key={monthKey} className="mb-2">
              <button
                onClick={() => toggleMonth(monthKey)}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="font-semibold text-sm text-gray-700">
                  {formatMonthYear(monthKey)}
                </span>
                <span className="text-gray-400 text-xs">
                  {isExpanded ? "▼" : "▶"} ({monthDates.length})
                </span>
              </button>
              {isExpanded && (
                <div className="ml-2 mt-1 space-y-1">
                  {monthDates.map((date) => {
                    const isSelected = date === selectedDate;
                    return (
                      <button
                        key={date}
                        onClick={() => onDateClick(date)}
                        className="w-full text-left px-3 py-2 text-sm rounded-md transition-colors"
                        style={{
                          backgroundColor: isSelected
                            ? "#4baac5"
                            : "transparent",
                          color: isSelected ? "#ffffff" : "#4b5563",
                          fontWeight: isSelected ? "600" : "400",
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = "#4baac5";
                            e.currentTarget.style.color = "#ffffff";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color = "#4b5563";
                          }
                        }}
                      >
                        {formatDay(date)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
