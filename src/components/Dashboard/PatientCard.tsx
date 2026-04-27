import {
  Calendar,
  Clock,
  FileText,
  Lock,
  Mail,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Patient {
  patient_id: string;
  patient_name: string;
  patient_email: string;
  access_granted_at: string;
  added_at?: string;
  expires_at?: string | null;
  patient_note?: string;
}

interface PatientCardProps {
  patient: Patient;
  isDarkMode: boolean;
  locale: string;
  onDelete: (patientId: string, patientName: string) => void;
}

export default function PatientCard({
  patient,
  isDarkMode,
  locale,
  onDelete,
}: PatientCardProps) {
  const router = useRouter();

  const isExpired = patient.expires_at
    ? new Date(patient.expires_at) < new Date()
    : false;
  const expiresDate = patient.expires_at ? new Date(patient.expires_at) : null;
  const now = new Date();
  const daysLeft =
    expiresDate && !isExpired
      ? Math.ceil(
          (expiresDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        )
      : null;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl shadow-md transition-all hover:shadow-xl border ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      }`}
    >
      {/* Status indicator */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          isExpired
            ? "bg-red-500"
            : daysLeft && daysLeft < 7
              ? "bg-orange-500"
              : "bg-green-500"
        }`}
      />

      <div className="p-6 pl-8 pb-4 relative">
        <div className="flex items-start justify-between gap-4">
          {/* Patient Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#4baac5] to-[#7076b0] flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg font-semibold truncate ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                >
                  {patient.patient_name}
                </h3>
                {patient.patient_note && (
                  <p
                    className={`text-sm line-clamp-1 mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {patient.patient_note}
                  </p>
                )}
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div
                className={`flex items-center gap-2 text-sm rounded-lg p-3 border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-300"
                    : "bg-gray-50 border-gray-100 text-gray-600"
                }`}
              >
                <Calendar size={16} className="text-gray-400" />
                <div>
                  <div
                    className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Добавлен
                  </div>
                  <div
                    className={`font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                  >
                    {patient.added_at || patient.access_granted_at
                      ? new Date(
                          patient.added_at || patient.access_granted_at,
                        ).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "short",
                        })
                      : "—"}
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center gap-2 text-sm rounded-lg p-3 border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <Clock size={16} className="text-gray-400" />
                <div>
                  <div
                    className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Срок действия
                  </div>
                  {!patient.expires_at ? (
                    <div
                      className={`font-medium ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                    >
                      Бессрочно
                    </div>
                  ) : isExpired ? (
                    <div className="font-medium text-red-600">Истёк</div>
                  ) : (
                    <div
                      className={`font-medium ${
                        daysLeft && daysLeft < 7
                          ? "text-orange-600"
                          : isDarkMode
                            ? "text-green-400"
                            : "text-green-600"
                      }`}
                    >
                      {daysLeft === 1
                        ? "1 день"
                        : daysLeft && daysLeft < 5
                          ? `${daysLeft} дня`
                          : `${daysLeft} дней`}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact */}
            {patient.patient_email && (
              <div
                className={`flex items-center gap-2 text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                <Mail size={14} />
                <span className="truncate">{patient.patient_email}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  router.push(
                    `/${locale}/view?patient_id=${patient.patient_id}`,
                  )
                }
                disabled={isExpired}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium text-sm transition-all ${
                  isExpired
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#4baac5] to-[#7076b0] text-white hover:shadow-lg"
                }`}
              >
                <FileText size={16} />
                <span>Журнал катетеризаций</span>
              </button>

              <button
                onClick={() =>
                  onDelete(patient.patient_id, patient.patient_name)
                }
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium text-sm transition-all border ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-red-900/20 hover:border-red-600 hover:text-red-400"
                    : "border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                }`}
              >
                <Trash2 size={16} />
                <span>Удалить</span>
              </button>
            </div>
          </div>

          {/* Status Badge */}
          {isExpired && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                <Lock size={12} />
                <span>Доступ закрыт</span>
              </div>
            </div>
          )}
          {!isExpired && daysLeft && daysLeft < 7 && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                <Zap size={12} />
                <span>Истекает</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
