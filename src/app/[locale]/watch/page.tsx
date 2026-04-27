// app/watch/page.tsx (или pages/watch.tsx если используешь Pages Router)
// Страница авторизации часов

"use client";

import { createBrowserClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WatchAuthPage() {
  const supabase = createBrowserClient();
  const searchParams = useSearchParams();
  const deviceId = searchParams.get("device_id");

  const [step, setStep] = useState<"email" | "code" | "success" | "error">(
    "email"
  );
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Проверяем есть ли уже сессия
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && deviceId) {
        // Уже залогинен — сразу привязываем
        await linkWatch(deviceId);
      }
    };
    checkSession();
  }, [deviceId]);

  // Отправка кода на email
  const sendCode = async () => {
    if (!email) return;

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    setLoading(false);

    if (error) {
      console.log("Send code error:", error);
      setError(error.message);
    } else {
      setStep("code");
    }
  };

  // Проверка кода
  const verifyCode = async () => {
    if (!code || code.length !== 6) return;

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    setLoading(false);

    if (error) {
      console.log("Verification error:", error);
      setError(error.message);
    } else {
      // Код верный — привязываем устройство
      await linkWatch(deviceId!);
    }
  };

  // Привязка устройства к пользователю
  // Привязка устройства к пользователю
  const linkWatch = async (deviceId: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const { error } = await supabase.from("device_links").upsert(
        {
          device_id: deviceId,
          user_id: session.user.id,
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          linked_at: new Date().toISOString(),
        },
        { onConflict: "device_id" }
      );

      if (error) {
        console.log("Linking error:", error);
        setError(error.message);
        setStep("error");
      } else {
        setStep("success"); // <-- Добавь это!
      }
    }
  };

  // Нет device_id в URL
  if (!deviceId) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.icon}>⚠️</div>
          <h1 style={styles.title}>Invalid Link</h1>
          <p style={styles.subtitle}>Please open this page from your watch</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* STEP: Email */}
        {step === "email" && (
          <>
            <div style={styles.icon}>⌚</div>
            <h1 style={styles.title}>Connect Watch</h1>
            <p style={styles.subtitle}>Enter your email to link your watch</p>

            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              disabled={loading}
            />

            {error && <p style={styles.error}>{error}</p>}

            <button
              onClick={sendCode}
              disabled={loading || !email}
              style={styles.button}
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
          </>
        )}

        {/* STEP: Enter Code */}
        {step === "code" && (
          <>
            <div style={styles.icon}>📧</div>
            <h1 style={styles.title}>Check Email</h1>
            <p style={styles.subtitle}>
              Enter the 6-digit code sent to
              <br />
              <strong>{email}</strong>
            </p>

            <input
              type="text"
              placeholder="000000"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              style={{ ...styles.input, ...styles.codeInput }}
              maxLength={6}
              disabled={loading}
            />

            {error && <p style={styles.error}>{error}</p>}

            <button
              onClick={verifyCode}
              disabled={loading || code.length !== 6}
              style={styles.button}
            >
              {loading ? "Verifying..." : "Verify & Connect"}
            </button>

            <button
              onClick={() => {
                setStep("email");
                setCode("");
                setError("");
              }}
              style={styles.linkButton}
            >
              Use different email
            </button>
          </>
        )}

        {/* STEP: Success */}
        {step === "success" && (
          <>
            <div style={styles.successIcon}>✓</div>
            <h1 style={styles.title}>Watch Connected!</h1>
            <p style={styles.subtitle}>
              Your watch is now linked to your account.
              <br />
              You can close this page.
            </p>
          </>
        )}

        {/* STEP: Error */}
        {step === "error" && (
          <>
            <div style={styles.icon}>❌</div>
            <h1 style={styles.title}>Connection Failed</h1>
            <p style={styles.subtitle}>{error}</p>
            <button
              onClick={() => {
                setStep("email");
                setError("");
              }}
              style={styles.button}
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Стили
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a0a0a",
    padding: "20px",
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: "24px",
    padding: "40px 32px",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  successIcon: {
    fontSize: "64px",
    marginBottom: "16px",
    color: "#4CAF50",
    backgroundColor: "#4CAF5020",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
  },
  title: {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#888888",
    fontSize: "14px",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  input: {
    width: "100%",
    padding: "16px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "1px solid #333",
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    marginBottom: "16px",
    outline: "none",
    boxSizing: "border-box",
  },
  codeInput: {
    textAlign: "center",
    fontSize: "24px",
    letterSpacing: "8px",
    fontFamily: "monospace",
  },
  button: {
    width: "100%",
    padding: "16px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    cursor: "pointer",
    marginBottom: "12px",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "#f44336",
    fontSize: "14px",
    marginBottom: "16px",
  },
};
