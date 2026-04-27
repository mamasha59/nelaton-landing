import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CatheterizationRecord } from "../types";
import {
  calcDayStats,
  extractRowData,
  filterByDays,
  formatDate,
  groupByDay,
  loadImageBase64,
} from "./helpers";

interface ExportPDFOptions {
  records: CatheterizationRecord[];
  days: number;
  patientName: string;
}

export async function exportPDF({
  records,
  days,
  patientName,
}: ExportPDFOptions): Promise<void> {
  const filteredCathData = filterByDays(records, days);
  const recordsByDay = groupByDay(filteredCathData);
  const sortedDays = Object.keys(recordsByDay).sort((a, b) =>
    b.localeCompare(a),
  );

  // Загружаем логотип и QR-код параллельно
  const [logoBase64, qrBase64] = await Promise.all([
    loadImageBase64(() => import("@/images/appLogoPngWhite.png")),
    loadImageBase64(() => import("@/images/qrCode.png")),
  ]);

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;

  // === GRADIENT HEADER (smooth) ===
  const headerH = 48;
  const gradSteps = Math.ceil(pageWidth * 4);
  const stepW = pageWidth / gradSteps;
  for (let i = 0; i < gradSteps; i++) {
    const t = i / (gradSteps - 1);
    const r = Math.round(75 + (112 - 75) * t);
    const g = Math.round(170 + (118 - 170) * t);
    const b = Math.round(197 + (176 - 197) * t);
    doc.setFillColor(r, g, b);
    doc.rect(i * stepW, 0, stepW + 0.5, headerH, "F");
  }

  // Логотип справа (5857x2065 → ratio 2.84:1)
  const logoW = 40;
  const logoH = 14;
  const rightBlockX = pageWidth - margin - logoW;
  if (logoBase64) {
    doc.addImage(
      logoBase64,
      "PNG",
      rightBlockX,
      (headerH - logoH) / 2,
      logoW,
      logoH,
    );
  }

  // QR-код по центру
  const qrSize = 22;
  const qrX = pageWidth / 2 - qrSize / 2;
  const qrY = (headerH - qrSize) / 2;
  if (qrBase64) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(
      qrX - 1.5,
      qrY - 1.5,
      qrSize + 3,
      qrSize + 3,
      1.5,
      1.5,
      "F",
    );
    doc.addImage(qrBase64, "PNG", qrX, qrY, qrSize, qrSize);
  }

  // Информация о пациенте слева
  const infoBlockH = 22;
  const infoStartY = (headerH - infoBlockH) / 2 + 4;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(patientName || "Patient", margin + 2, infoStartY);

  const exportDate = new Date();
  const exportDateStr = `${exportDate.getDate().toString().padStart(2, "0")}.${(exportDate.getMonth() + 1).toString().padStart(2, "0")}.${exportDate.getFullYear()}`;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Export: ${exportDateStr}`, margin + 2, infoStartY + 8);
  doc.text(
    `Period: ${days === 0 ? "all data" : `last ${days} day(s)`}`,
    margin + 2,
    infoStartY + 13,
  );
  doc.text(
    `Records: ${filteredCathData.length}`,
    margin + 2,
    infoStartY + 18,
  );

  let yPos = headerH + 8;

  // === TITLE ===
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(44, 62, 80);
  doc.text("Catheterization Journal", margin, yPos + 5);
  yPos += 12;

  // === ЗАПИСИ ПО ДНЯМ ===
  sortedDays.forEach((dateKey, dayIndex) => {
    const dayRecords = recordsByDay[dateKey];
    const { totalIntake, totalOutput, cathCount, leakCount } =
      calcDayStats(dayRecords);

    // Проверяем место на странице
    if (yPos > pageHeight - 65) {
      doc.addPage();
      yPos = 15;
    }

    // --- Date header ---
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80);
    doc.text(formatDate(dateKey), margin, yPos + 4);
    doc.setDrawColor(75, 170, 197);
    doc.setLineWidth(0.6);
    doc.line(margin, yPos + 7, pageWidth - margin, yPos + 7);
    yPos += 12;

    // --- Summary dashboard ---
    const dashY = yPos;
    const dashH = 14;
    doc.setFillColor(244, 251, 253);
    doc.setDrawColor(184, 228, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, dashY, pageWidth - margin * 2, dashH, 2, 2, "FD");

    const colW = (pageWidth - margin * 2) / 4;
    const labels = [
      "Fluid intake",
      "Urine output",
      "Catheterizations",
      "Leakage",
    ];
    const values = [
      totalIntake > 0 ? `${totalIntake} ml` : "-",
      totalOutput > 0 ? `${totalOutput} ml` : "-",
      cathCount.toString(),
      leakCount.toString(),
    ];
    const valColors: [number, number, number][] = [
      [44, 62, 80],
      [44, 62, 80],
      [44, 62, 80],
      leakCount > 0 ? [214, 48, 49] : [44, 62, 80],
    ];

    labels.forEach((label, i) => {
      const x = margin + colW * i + colW / 2;
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(85, 85, 85);
      doc.text(label.toUpperCase(), x, dashY + 5, { align: "center" });

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...valColors[i]);
      doc.text(values[i], x, dashY + 11, { align: "center" });
    });

    yPos = dashY + dashH + 4;

    // --- Таблица записей ---
    autoTable(doc, {
      startY: yPos,
      head: [
        ["Time", "Action", "Pain", "Urge", "Intake", "Output", "Color", "Leaking"],
      ],
      body: dayRecords.map((record) => {
        const row = extractRowData(record);
        return [
          row.time,
          row.type.label,
          row.pain,
          row.urge,
          row.intake,
          row.output,
          row.colorHex + "|" + row.colorLabel,
          row.leaking,
        ];
      }),
      styles: {
        font: "helvetica",
        fontSize: 8,
        cellPadding: 2,
        lineColor: [238, 238, 238],
        lineWidth: 0.3,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [75, 170, 197],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 7.5,
        cellPadding: 2,
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [250, 250, 252],
      },
      columnStyles: {
        0: { cellWidth: 16, halign: "center", fontStyle: "bold" },
        1: { cellWidth: 30 },
        2: { cellWidth: 14, halign: "center" },
        3: { cellWidth: 22, halign: "center", fontSize: 7 },
        4: { cellWidth: 22, halign: "center" },
        5: {
          cellWidth: 22,
          halign: "center",
          fontStyle: "bold",
          textColor: [78, 142, 239],
        },
        6: {
          cellWidth: 24,
          halign: "center",
          fontSize: 6.5,
          textColor: [255, 255, 255],
        },
        7: {
          cellWidth: "auto",
          fontSize: 7,
          textColor: [214, 48, 49],
        },
      },
      margin: { left: margin, right: margin },
      didParseCell: (hookData: any) => {
        if (hookData.section === "body" && hookData.row.raw) {
          const actionCell = hookData.row.raw[1];
          if (actionCell === "Leakage") {
            hookData.cell.styles.textColor = [214, 48, 49];
          }
          if (hookData.column.index === 2) {
            const painVal = parseFloat(hookData.row.raw[2]);
            if (painVal > 5) {
              hookData.cell.styles.textColor = [214, 48, 49];
              hookData.cell.styles.fontStyle = "bold";
            }
          }
          if (hookData.column.index === 6) {
            hookData.cell.text = [];
            const colorData = (hookData.row.raw[6] || "").toLowerCase();
            if (
              colorData.includes("red") ||
              colorData.includes("pink") ||
              colorData.includes("blood")
            ) {
              hookData.cell.styles.fillColor = [255, 240, 240];
            }
          }
        }
      },
      didDrawCell: (hookData: any) => {
        if (hookData.section === "body" && hookData.column.index === 6) {
          const rawValue = hookData.row.raw?.[6] || "";
          const [hexColor, label] = rawValue.split("|");

          if (hexColor && hexColor !== "-" && hexColor.startsWith("#")) {
            const cellX = hookData.cell.x;
            const cellY = hookData.cell.y;
            const cellW = hookData.cell.width;
            const cellH = hookData.cell.height;
            const centerX = cellX + cellW / 2;

            const hex = hexColor.replace("#", "");
            const rr = parseInt(hex.substring(0, 2), 16);
            const gg = parseInt(hex.substring(2, 4), 16);
            const bb = parseInt(hex.substring(4, 6), 16);

            const dotRadius = 1.5;
            const dotY =
              cellY + cellH / 2 - (label && label !== "-" ? 1.5 : 0);
            doc.setFillColor(rr, gg, bb);
            doc.setDrawColor(136, 136, 136);
            doc.setLineWidth(0.2);
            doc.circle(centerX, dotY, dotRadius, "FD");

            if (label && label !== "-") {
              doc.setFontSize(5);
              doc.setTextColor(100, 100, 100);
              doc.text(label, centerX, dotY + dotRadius + 2, {
                align: "center",
              });
            }
          } else if (label && label !== "-") {
            const cellX = hookData.cell.x;
            const cellW = hookData.cell.width;
            const cellY = hookData.cell.y;
            const cellH = hookData.cell.height;
            doc.setFontSize(6);
            doc.setTextColor(100, 100, 100);
            doc.text(label, cellX + cellW / 2, cellY + cellH / 2 + 1, {
              align: "center",
            });
          }
        }
      },
    });

    yPos =
      (doc as any).lastAutoTable.finalY +
      (dayIndex < sortedDays.length - 1 ? 12 : 6);
  });

  if (sortedDays.length === 0) {
    doc.setFontSize(12);
    doc.setTextColor(107, 114, 128);
    doc.text("No records for the selected period", pageWidth / 2, yPos + 10, {
      align: "center",
    });
  }

  // === FOOTER ===
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175);
    doc.text(
      `Created in Nelaton: Self-Catheterization App | Page ${i} / ${totalPages}`,
      pageWidth / 2,
      pageHeight - 6,
      { align: "center" },
    );
  }

  const fileName = `journal_${patientName || "patient"}.pdf`;
  doc.save(fileName);
}
