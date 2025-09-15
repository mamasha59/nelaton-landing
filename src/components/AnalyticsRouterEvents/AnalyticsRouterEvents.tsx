'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AnalyticsRouterEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const path =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Meta Pixel SPA PageView
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }

    // GA4 SPA page_view (если используешь gtag вне GTM)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', { page_path: path });
    }

    // Прокидываем событие в dataLayer (если внутри GTM есть триггеры на pageview)
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: 'pageview', page_path: path });
  }, [pathname, searchParams]);

  return null;
}
