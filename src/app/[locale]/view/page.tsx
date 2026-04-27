"use client";

import SessionWarningModal from "@/components/SessionWarningModal/SessionWarningModal";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { createBrowserClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ErrorScreen from "./ErrorScreen/ErrorScreen";
import JournalContent from "./JournalContent/JournalContent";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import { JournalData } from "./types";

export default function ViewJournalPage({
  searchParams,
}: {
  searchParams: Promise<{ patient_id?: string }>;
}) {
  const [patientId, setPatientId] = useState("");
  const [, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [journalData, setJournalData] = useState<JournalData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const supabase = createBrowserClient();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string;
  const isInitialized = useRef(false);

  // Управление таймаутом сессии (безопасность медицинских данных)
  const { extendSession } = useSessionTimeout({
    onWarning: () => setShowSessionWarning(true),
    onSessionEnd: () => setShowSessionWarning(false),
    enabled: !isInitializing, // Включаем после инициализации
  });

  const handleExtendSession = useCallback(() => {
    setShowSessionWarning(false);
    extendSession();
  }, [extendSession]);

  // Получаем patient_id из URL и загружаем данные
  useEffect(() => {
    if (isInitialized.current) return;

    searchParams.then((params) => {
      const urlPatientId = params.patient_id;

      if (urlPatientId) {
        setPatientId(urlPatientId);
        loadJournalData(urlPatientId);
      }

      isInitialized.current = true;
      setIsInitializing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Подписка на изменения состояния авторизации
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        // Очищаем медицинские данные из памяти перед редиректом
        setJournalData(null);
        setPatientId("");
        setLastUpdate(null);
        setError("");
        router.push(`/${locale}/admin-login`);
      } else if (event === "TOKEN_REFRESHED") {
        console.log("Token refreshed successfully");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadJournalData = async (
    patientIdToUse?: string,
    isManualRefresh = false,
  ) => {
    const activePatientId = patientIdToUse || patientId;

    if (!activePatientId) {
      setError("ID пациента отсутствует");
      return;
    }

    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Не авторизован");

      const { data, error } = await supabase.rpc(
        "get_patient_data_for_trusted_person",
        {
          p_trusted_person_id: user.id,
          p_patient_id: activePatientId,
        },
      );
      console.log(data, "data1");
      if (error) throw error;
      if (data && data.length > 0) {
        console.log("Received data from RPC:", data);
        // RPC возвращает TABLE, Supabase оборачивает это в массив
        const row = data[0];

        // Формируем правильную структуру JournalData
        const journalDataObj: JournalData = {
          patient_name: row.patient_name,
          catheterization_data: row.catheterization_data || [],
          intervals_data: row.intervals_data || [],
        };

        console.log("Formatted journal data:", journalDataObj);
        console.log(
          "Catheterization records count:",
          journalDataObj.catheterization_data.length,
        );
        setJournalData(journalDataObj);
        setLastUpdate(new Date());
        setError("");
      } else {
        setJournalData(null);
        setError("Данные не найдены");
      }
    } catch (err: any) {
      setJournalData(null);
      setError(err.message || "Ошибка загрузки данных");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setIsInitializing(false);
    }
  };

  const handleRetry = () => {
    setError("");
    setJournalData(null);
    loadJournalData(patientId);
  };

  const handleManualRefresh = () => {
    loadJournalData(patientId, true);
  };

  const handleBack = () => {
    router.push(`/${locale}/dashboard`);
  };

  // Автоматическое обновление каждые 2 минуты
  useEffect(() => {
    if (!patientId || !journalData) return;

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadJournalData(patientId, true);
      }
    };

    const interval = setInterval(() => {
      if (!document.hidden) {
        loadJournalData(patientId, true);
      }
    }, 120000); // 2 минуты

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, journalData]);

  // Состояние: инициализация
  if (isInitializing) {
    return <LoadingScreen />;
  }

  // Состояние: ошибка загрузки данных
  if (error) {
    return <ErrorScreen error={error} onRetry={handleRetry} locale={locale} />;
  }
  // Состояние: загрузка данных
  if (!journalData) {
    return <LoadingScreen />;
  }

  // Основное содержимое: журнал
  return (
    <>
      <SessionWarningModal
        isVisible={showSessionWarning}
        onExtendSession={handleExtendSession}
      />
      <JournalContent
        data={journalData}
        onRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
        lastUpdate={lastUpdate}
        onBack={handleBack}
      />
    </>
  );
}
