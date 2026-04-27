import type { ReactNode } from "react";

/**
 * Layout для Dashboard - минимальная обертка
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <>{children}</>;
}
