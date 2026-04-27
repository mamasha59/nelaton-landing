"use client";

import { Download, X } from "lucide-react";
import { useState } from "react";

interface ExportPDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (days: number) => void;
  availableDaysCount: number;
  format?: "pdf" | "excel";
}

const PRESET_OPTIONS = [
  { label: "1 день", value: 1 },
  { label: "3 дня", value: 3 },
  { label: "7 дней", value: 7 },
  { label: "14 дней", value: 14 },
  { label: "30 дней", value: 30 },
  { label: "Все данные", value: 0 },
];

export default function ExportPDFModal({
  isOpen,
  onClose,
  onExport,
  availableDaysCount,
  format = "pdf",
}: ExportPDFModalProps) {
  const [selectedDays, setSelectedDays] = useState<number>(7);

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(selectedDays);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4baac5] to-[#7076b0] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Download size={22} className="text-white" />
            <h2 className="text-lg font-bold text-white">
              {format === "excel" ? "Экспорт в Excel" : "Экспорт в PDF"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/20"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-gray-600 text-sm mb-4">
            Выберите период данных для экспорта:
          </p>

          <div className="grid grid-cols-3 gap-2">
            {PRESET_OPTIONS.map((option) => {
              const isSelected = selectedDays === option.value;
              const isDisabled =
                option.value > availableDaysCount && option.value !== 0;

              return (
                <button
                  key={option.value}
                  onClick={() => !isDisabled && setSelectedDays(option.value)}
                  disabled={isDisabled}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#4baac5] to-[#7076b0] text-white border-transparent shadow-md"
                      : isDisabled
                        ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-200 hover:border-[#4baac5] hover:text-[#4baac5]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Доступно данных за {availableDaysCount}{" "}
            {availableDaysCount === 1
              ? "день"
              : availableDaysCount < 5
                ? "дня"
                : "дней"}
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
          >
            Отмена
          </button>
          <button
            onClick={handleExport}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#4baac5] to-[#7076b0] text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Экспорт
          </button>
        </div>
      </div>
    </div>
  );
}
