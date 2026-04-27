import { CatheterizationRecord } from "../types";

/**
 * Фильтрует записи по количеству дней от текущей даты.
 * days=0 — все записи.
 */
export function filterByDays(
  records: CatheterizationRecord[],
  days: number,
): CatheterizationRecord[] {
  if (days <= 0) return records;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  cutoffDate.setHours(0, 0, 0, 0);

  return records.filter((record) => {
    const recordDate = new Date(record.timeStamp.replace(" ", "T"));
    return recordDate >= cutoffDate;
  });
}

/**
 * Группирует записи по дню (YYYY-MM-DD).
 */
export function groupByDay(
  records: CatheterizationRecord[],
): Record<string, CatheterizationRecord[]> {
  const grouped: Record<string, CatheterizationRecord[]> = {};
  records.forEach((record) => {
    const dateKey = record.timeStamp.split(" ")[0];
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(record);
  });
  return grouped;
}

/**
 * Определяет тип записи.
 */
export function getRecordType(record: CatheterizationRecord): {
  label: string;
  color: [number, number, number];
} {
  if (record.urine?.catheterType)
    return { label: "Catheterization", color: [45, 52, 54] };
  if (record.amountOfDrankFluids)
    return { label: "Fluid intake", color: [78, 142, 239] };
  if (record.leakageReason) return { label: "Leakage", color: [214, 48, 49] };
  if (record.naturalUrination)
    return { label: "Natural urination", color: [0, 184, 148] };
  if (record.urineUrge) return { label: "Urge", color: [106, 127, 137] };
  return { label: "-", color: [100, 100, 100] };
}

/**
 * Форматирует дату для отображения (английские названия).
 */
export function formatDate(dateKey: string): string {
  const d = new Date(dateKey + "T00:00:00");
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Извлекает данные строки из записи (общее для PDF и Excel).
 */
export function extractRowData(record: CatheterizationRecord) {
  const time = record.timeStamp.split(" ")[1]?.substring(0, 5) || "-";
  const type = getRecordType(record);

  const pain =
    record.naturalUrination?.painVote != null
      ? String(record.naturalUrination.painVote)
      : "-";

  let urge = "-";
  if (record.urineUrge) {
    if (record.urineUrge.urgeType) urge = record.urineUrge.urgeType;
    if (record.urineUrge.intensity) urge += ` (${record.urineUrge.intensity})`;
  } else if (record.naturalUrination?.urgeVote != null) {
    urge = String(record.naturalUrination.urgeVote);
  }

  const intake = record.amountOfDrankFluids?.value
    ? `${record.amountOfDrankFluids.value} ml`
    : "-";

  const output = record.urine?.amountOfReleasedUrine
    ? `${record.urine.amountOfReleasedUrine} ml`
    : record.naturalUrination?.releasedUrine
      ? `${record.naturalUrination.releasedUrine} ml`
      : "-";

  const uColor =
    record.urine?.urineColor || record.naturalUrination?.urineColor;
  const colorHex = uColor?.color || "";
  const rawTitle = uColor?.title || "";
  const colorLabel = rawTitle.includes(".")
    ? rawTitle.split(".").pop()?.replace(/_/g, " ") || "-"
    : rawTitle || "-";

  const leaking = record.leakageReason?.value || "-";

  return {
    time,
    type,
    pain,
    urge,
    intake,
    output,
    colorHex,
    colorLabel,
    leaking,
  };
}

/**
 * Подсчёт суммарной статистики за день.
 */
export function calcDayStats(records: CatheterizationRecord[]) {
  let totalIntake = 0;
  let totalOutput = 0;
  let cathCount = 0;
  let leakCount = 0;

  records.forEach((r) => {
    if (r.amountOfDrankFluids?.value)
      totalIntake += r.amountOfDrankFluids.value;
    if (r.urine?.amountOfReleasedUrine) {
      totalOutput += r.urine.amountOfReleasedUrine;
      cathCount++;
    }
    if (r.naturalUrination?.releasedUrine)
      totalOutput += r.naturalUrination.releasedUrine;
    if (r.leakageReason) leakCount++;
  });

  return { totalIntake, totalOutput, cathCount, leakCount };
}

/**
 * Загружает изображение из Next.js модуля и возвращает base64 dataURL.
 */
export async function loadImageBase64(
  importFn: () => Promise<any>,
): Promise<string | null> {
  try {
    const mod = await importFn();
    const src = mod.default?.src || mod.default;
    const url: string = typeof src === "string" ? src : String(src);
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
