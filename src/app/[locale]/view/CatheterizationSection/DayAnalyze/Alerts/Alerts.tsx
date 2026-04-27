import { AlertCircle, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Alerts({ alert }: { alert: any }) {
  const t = useTranslations("Journal");
  return (
    <div
      key={alert.id}
      className={`flex items-center p-4 rounded-xl border ${
        alert.level === "red"
          ? "bg-red-50 border-red-300"
          : "bg-yellow-50 border-yellow-300"
      }`}
    >
      <div className="mr-3">
        {alert.level === "red" ? (
          <AlertTriangle className="w-5 h-5 text-red-600" />
        ) : (
          <AlertCircle className="w-5 h-5 text-yellow-600" />
        )}
      </div>
      <p className="flex-1 text-sm text-gray-800 font-semibold leading-5">
        {t(alert.key, alert.params)}
      </p>
    </div>
  );
}
