"use client";

import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Регистрируем Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
        })
        .then((registration) => {
          console.log("Service Worker зарегистрирован:", registration);
        })
        .catch((error) => {
          console.error("Ошибка регистрации Service Worker:", error);
        });
    }

    // Проверяем установлено ли приложение
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Проверяем был ли уже установлен
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("Пользователь установил PWA");
      setShowInstallBanner(false);
    } else {
      console.log("Пользователь отклонил установку PWA");
    }

    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShowInstallBanner(false);
    // Сохраняем в localStorage что пользователь закрыл баннер
    localStorage.setItem("pwa-banner-dismissed", "true");
  };

  // Не показываем если уже установлено
  if (isInstalled) {
    return null;
  }

  // Проверяем не закрывал ли пользователь баннер ранее
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("pwa-banner-dismissed") === "true"
  ) {
    // Но всё равно показываем маленькую кнопку в углу
    if (deferredPrompt) {
      return (
        <button
          onClick={handleInstallClick}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          title="Установить приложение"
        >
          <Download size={20} />
          <span className="hidden sm:inline">Установить</span>
        </button>
      );
    }
    return null;
  }

  if (!showInstallBanner || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 p-4 shadow-2xl">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Download size={24} className="text-white" />
          </div>
          <div className="text-white">
            <h3 className="text-lg font-bold">
              Установите Nelaton Health-Share
            </h3>
            <p className="text-sm text-white/90">
              Быстрый доступ, работа офлайн, как нативное приложение
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleInstallClick}
            className="rounded-lg bg-white px-6 py-2.5 font-semibold text-teal-600 transition-all hover:scale-105 hover:shadow-lg"
          >
            Установить
          </button>
          <button
            onClick={handleClose}
            className="rounded-lg bg-white/20 p-2 text-white transition-all hover:bg-white/30"
            title="Закрыть"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
