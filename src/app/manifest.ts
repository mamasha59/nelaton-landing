import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nelaton Health-Share",
    short_name: "Nelaton",
    description: "Приложение для контроля здоровья мочевого пузыря",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4baa7a",
    lang: "ru",
    orientation: "portrait",
    scope: "/",
    related_applications: [
      {
        platform: "play",
        url: "https://play.google.com/store/apps/details?id=com.ulibkin.nelaton",
        id: "com.ulibkin.nelaton",
      },
      {
        platform: "itunes",
        url: "https://apps.apple.com/app/nelaton",
      },
    ],
    icons: [
      {
        src: "/icons/Android/48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icons/Android/72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/icons/Android/96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icons/Android/144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/icons/Android/192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/Android/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
