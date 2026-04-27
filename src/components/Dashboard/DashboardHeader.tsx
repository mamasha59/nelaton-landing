import { LogOut, Moon, Sun } from "lucide-react";
import Image from "next/image";

interface DashboardHeaderProps {
  isDarkMode: boolean;
  userEmail: string;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export default function DashboardHeader({
  isDarkMode,
  userEmail,
  onToggleDarkMode,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#4baac5] to-[#7076b0] text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center shrink-0">
            <Image
              width={200}
              alt="App Logo"
              height={50}
              src={require("@/images/appLogoPngWhite.png")}
              className="w-[120px] sm:w-[200px] h-auto"
            />
          </div>
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl lg:text-3xl font-bold whitespace-nowrap">
              Nelaton Health-Share
            </h1>
            {userEmail && (
              <p className="text-center text-sm text-white/80 mt-1">
                {userEmail}
              </p>
            )}
          </div>
          {/* Мобильная версия заголовка */}
          <div className="md:hidden flex-1 text-center px-2">
            <h1 className="text-sm sm:text-base font-bold">Health-Share</h1>
            {userEmail && (
              <p className="text-[10px] sm:text-xs text-white/80 truncate">
                {userEmail}
              </p>
            )}
          </div>
          <div className="flex gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={onToggleDarkMode}
              className="flex items-center justify-center rounded-lg bg-white/20 p-1.5 sm:p-2 transition-all hover:bg-white/30 hover:shadow-lg"
              title={isDarkMode ? "Светлый режим" : "Темный режим"}
            >
              {isDarkMode ? (
                <Sun size={18} className="sm:w-5 sm:h-5" />
              ) : (
                <Moon size={18} className="sm:w-5 sm:h-5" />
              )}
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1 sm:gap-2 rounded-lg bg-white/20 px-2 sm:px-4 py-1.5 sm:py-2 text-sm font-semibold text-white transition-all hover:bg-white/30 hover:shadow-lg"
            >
              <LogOut size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
