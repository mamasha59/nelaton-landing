import * as XLSX from "xlsx";
import { CatheterizationRecord } from "../types";
import { filterByDays, getRecordType, groupByDay } from "./helpers";

interface ExportExcelOptions {
  records: CatheterizationRecord[];
  days: number;
  patientName: string;
}

export function exportExcel({
  records,
  days,
  patientName,
}: ExportExcelOptions): void {
  const filteredCathData = filterByDays(records, days);

  // Сортируем по дате (новые сверху)
  const sorted = [...filteredCathData].sort(
    (a, b) =>
      new Date(b.timeStamp.replace(" ", "T")).getTime() -
      new Date(a.timeStamp.replace(" ", "T")).getTime(),
  );

  const recordsByDay = groupByDay(sorted);
  const sortedDays = Object.keys(recordsByDay).sort((a, b) =>
    b.localeCompare(a),
  );

  const rows: Record<string, string | number>[] = [];

  sortedDays.forEach((dateKey, dayIndex) => {
    recordsByDay[dateKey].forEach((record) => {
      const [date, timePart] = record.timeStamp.split(" ");
      const time = timePart?.substring(0, 5) || "-";

      const pain =
        record.naturalUrination?.painVote != null
          ? String(record.naturalUrination.painVote)
          : "-";

      let urge = "-";
      if (record.urineUrge) {
        if (record.urineUrge.urgeType) urge = record.urineUrge.urgeType;
        if (record.urineUrge.intensity)
          urge += ` (${record.urineUrge.intensity})`;
      } else if (record.naturalUrination?.urgeVote != null) {
        urge = String(record.naturalUrination.urgeVote);
      }

      const intake = record.amountOfDrankFluids?.value || "";
      const output =
        record.urine?.amountOfReleasedUrine ||
        record.naturalUrination?.releasedUrine ||
        "";

      const uColor =
        record.urine?.urineColor || record.naturalUrination?.urineColor;
      const rawTitle = uColor?.title || "";
      const colorLabel = rawTitle.includes(".")
        ? rawTitle.split(".").pop()?.replace(/_/g, " ") || "-"
        : rawTitle || "-";

      const leaking = record.leakageReason?.value || "-";

      rows.push({
        Date: date,
        Time: time,
        Action: getRecordType(record).label,
        Pain: pain,
        Urge: urge,
        "Intake (ml)": intake,
        "Output (ml)": output,
        Color: colorLabel,
        Leaking: leaking,
      });
    });

    // Пустая строка-разделитель между днями
    if (dayIndex < sortedDays.length - 1) {
      rows.push({
        Date: "",
        Time: "",
        Action: "",
        Pain: "",
        Urge: "",
        "Intake (ml)": "",
        "Output (ml)": "",
        Color: "",
        Leaking: "",
      });
    }
  });

  const ws = XLSX.utils.json_to_sheet(rows);

  // Ширины столбцов
  ws["!cols"] = [
    { wch: 12 }, // Date
    { wch: 6 }, // Time
    { wch: 18 }, // Action
    { wch: 6 }, // Pain
    { wch: 14 }, // Urge
    { wch: 12 }, // Intake
    { wch: 12 }, // Output
    { wch: 14 }, // Color
    { wch: 14 }, // Leaking
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Journal");

  const fileName = `journal_${patientName || "patient"}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
