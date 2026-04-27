import { createBrowserClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnalysisResult } from "../DayAnalyze";

type UseAnalysisProps =
  | {
      range: string;
      date?: undefined;
    }
  | {
      date: string | undefined;
      range?: undefined;
    };

export function useAnalysis(params: UseAnalysisProps) {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const supabase = createBrowserClient();

  const searchParams = useSearchParams();
  const patientId = searchParams.get("patient_id") || "";

  // Мемоизируем ключ для предотвращения лишних вызовов
  const paramsKey =
    "date" in params && params.date
      ? `date:${params.date}`
      : "range" in params && params.range
        ? `range:${params.range}`
        : "";

  const lastFetchedKey = useRef<string>("");

  useEffect(() => {
    // Не делаем fetch если нет patientId или ключ не изменился
    if (
      !patientId ||
      !paramsKey ||
      lastFetchedKey.current === `${patientId}:${paramsKey}`
    ) {
      return;
    }

    const fetchAnalysis = async () => {
      lastFetchedKey.current = `${patientId}:${paramsKey}`;
      setLoading(true);
      setError(false);

      try {
        const body: any = {
          user_id: patientId,
        };

        if ("date" in params && params.date) {
          // Для single-day анализа передаем одну и ту же дату
          body.start_date = params.date;
          body.end_date = params.date;
        } else if ("range" in params && params.range) {
          // Для предустановленных периодов
          body.selected_range = params.range;
        }

        const { data, error: invokeError } = await supabase.functions.invoke(
          "analyze-catheterization",
          { body },
        );

        if (invokeError) {
          console.error("Edge function error:", invokeError);
          setError(true);
          setLoading(false);
          return;
        }

        if (data?.error) {
          console.log("No data available:", data.message);
          setError(true);
          setLoading(false);
          return;
        }

        if (data?.results) {
          setAnalysisResults(data.results);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [patientId, paramsKey]);

  return { analysisResults, loading, error };
}
