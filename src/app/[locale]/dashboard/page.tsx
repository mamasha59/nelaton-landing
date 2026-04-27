"use client";

import AddPatientModal from "@/components/Dashboard/AddPatientModal";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import EmptyState from "@/components/Dashboard/EmptyState";
import LoadingState from "@/components/Dashboard/LoadingState";
import MarketingBlock from "@/components/Dashboard/MarketingBlock";
import PatientCard from "@/components/Dashboard/PatientCard";
import SessionWarningModal from "@/components/SessionWarningModal/SessionWarningModal";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { createBrowserClient } from "@/utils/supabase/client";
import { UserPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Patient {
  patient_id: string;
  patient_name: string;
  patient_email: string;
  access_granted_at: string;
  added_at?: string;
  expires_at?: string | null;
  patient_note?: string;
}

export default function DashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(true);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const supabase = createBrowserClient();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string;

  // Управление таймаутом сессии (безопасность медицинских данных)
  const { extendSession } = useSessionTimeout({
    onWarning: () => setShowSessionWarning(true),
    onSessionEnd: () => setShowSessionWarning(false),
    enabled: isReady, // Включаем только после подтверждения авторизации
  });

  const handleExtendSession = useCallback(() => {
    setShowSessionWarning(false);
    extendSession();
  }, [extendSession]);

  useEffect(() => {
    checkUser();
    loadPatients();

    // Подписываемся на изменения состояния авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        // Очищаем данные пациентов из памяти перед редиректом
        setPatients([]);
        setUserEmail("");
        setError(null);
        router.push(`/${locale}/admin-login`);
      } else if (event === "TOKEN_REFRESHED") {
        console.log("Token refreshed successfully");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/${locale}/admin-login`);
      return;
    }
    setUserEmail(user.email || "");
    setIsReady(true);

    // Показываем модалку с кодом приглашения, если у пользователя нет пациентов
    const { data } = await supabase.rpc("get_my_patients", {
      p_trusted_person_id: user.id,
    });
    if (!data || data.length === 0) {
      setShowAddModal(true);
    }
  };

  const loadPatients = async () => {
    setIsLoadingPatients(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase.rpc("get_my_patients", {
        p_trusted_person_id: user.id,
      });

      if (error) throw error;
      setPatients(data || []);
    } catch (err: any) {
      console.error("Load patients error:", err);
      setError(err.message);
    } finally {
      setIsLoadingPatients(false);
    }
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsAddingPatient(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Не авторизован");

      const { data, error } = await supabase.rpc("activate_invitation_code", {
        p_trusted_person_id: user.id,
        p_invitation_code: newCode.toUpperCase(),
      });

      if (error) throw error;

      setShowAddModal(false);
      setNewCode("");
      loadPatients();
      alert(`Пациент ${data[0].patient_name} добавлен!`);
    } catch (err: any) {
      setError(err.message || "Ошибка добавления пациента");
    } finally {
      setIsAddingPatient(false);
    }
  };

  const loadPatientData = async (patient: Patient) => {
    router.push(`/${locale}/view?patient_id=${patient.patient_id}`);
  };

  const handleSkipInvitation = () => {
    setShowAddModal(false);
  };

  const handleDeletePatient = async (
    patientId: string,
    patientName: string,
  ) => {
    if (!confirm(`Удалить пациента "${patientName}" из списка?`)) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Не авторизован");

      const { error } = await supabase.rpc(
        "remove_patient_from_trusted_person",
        {
          p_trusted_person_id: user.id,
          p_patient_id: patientId,
        },
      );

      if (error) throw error;

      loadPatients();
      alert("Пациент удален из вашего списка");
    } catch (err: any) {
      alert("Ошибка: " + err.message);
    }
  };

  const handleLogout = async () => {
    // Очищаем все данные пациентов из React state
    setPatients([]);
    setUserEmail("");
    setError(null);
    await supabase.auth.signOut();
    router.push(`/${locale}/admin-login`);
  };

  return (
    <>
      <SessionWarningModal
        isVisible={showSessionWarning}
        onExtendSession={handleExtendSession}
      />
      <div
        className={`min-h-screen transition-colors ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <DashboardHeader
          isDarkMode={isDarkMode}
          userEmail={userEmail}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onLogout={handleLogout}
        />

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Простая статистика */}
          <div className="mb-6 flex items-center justify-between">
            <p
              className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              В списке:{" "}
              <span
                className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
              >
                {patients.length}
              </span>
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#4baac5] to-[#7076b0] px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
            >
              <UserPlus size={20} />
              <span>Добавить пользователя</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {/* Patients Cards */}
          {isLoadingPatients ? (
            <LoadingState isDarkMode={isDarkMode} />
          ) : patients.length === 0 ? (
            <EmptyState
              isDarkMode={isDarkMode}
              onAddPatient={() => setShowAddModal(true)}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              {patients.map((patient) => (
                <PatientCard
                  key={patient.patient_id}
                  patient={patient}
                  isDarkMode={isDarkMode}
                  locale={locale}
                  onDelete={handleDeletePatient}
                />
              ))}
            </div>
          )}

          <MarketingBlock isDarkMode={isDarkMode} />
        </div>

        <AddPatientModal
          isOpen={showAddModal}
          isLoading={isAddingPatient}
          newCode={newCode}
          error={error}
          onCodeChange={setNewCode}
          onSubmit={handleAddPatient}
          onSkip={handleSkipInvitation}
        />
      </div>
    </>
  );
}
