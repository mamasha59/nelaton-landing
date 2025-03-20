"use client"
import MobileNav from "./MobileNav/MobileNav";
import { useEffect, useState } from "react";
import DesktopNav from "./DesktopNav/DesktopNav";
import ModalSetLanguage from "./ModalSetLanguage/ModalSetLanguage";

interface HeaderNavProps {
  isInView?: boolean,
  handleScrollToFaq?: () => void
  handleScrollToFeatures?: () => void,
  openMenu?: boolean,
  setOpenMenu?: (openMenu: boolean) => void,
}

export default function HeaderNav({ handleScrollToFaq, handleScrollToFeatures, isInView, openMenu, setOpenMenu }: HeaderNavProps) {
  const [openSelectLanguage, setOpenSelectLanguage] = useState<boolean>(false);
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScrollbarWidth(window.innerWidth - document.documentElement.clientWidth);
    }
  }, []);
  
  useEffect(() => {
    if (openMenu || openSelectLanguage) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.overflow = "hidden"; // Останавливаем скролл на <html>
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
    }
  }, [openMenu, openSelectLanguage, scrollbarWidth]);

  
  const handleModalSelectLanguage = () => setOpenSelectLanguage(!openSelectLanguage);

  const handleMenu = () => {
    setOpenMenu && setOpenMenu(!openMenu);
  }

  return (
    <>
    {isInView && <div className="h-[84px]"></div>} {/* Заглушка Высота соответствует навигации */}
    <nav className={`centred-view justify-between py-4 h-[84px] ${isInView ? "fixed left-0 right-0 top-0 lg:bottom-0 z-[1000]" : ''}`}>
      <DesktopNav
        handleScrollToFaq={handleScrollToFaq!}
        handleScrollToFeatures={handleScrollToFeatures!}
        handleMenu={handleMenu!}
        isInView={isInView!}
        openMenu={openMenu!}
        handleModalSelectLanguage={handleModalSelectLanguage}
      />
      {openMenu && (
        <MobileNav
          handleScrollToFaq={handleScrollToFaq!}
          handleScrollToFeatures={handleScrollToFeatures!}
          handleModalSelectLanguage={handleModalSelectLanguage}
        />
      )}
    </nav>
    <ModalSetLanguage
      handleModalSelectLanguage={handleModalSelectLanguage}
      openSelectLanguage={openSelectLanguage}/>
  </>
  );
}