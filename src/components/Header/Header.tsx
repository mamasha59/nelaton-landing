"use client"
import { RefObject, useEffect, useState } from "react";
import HeaderFooter from "../HeaderFooter/HeaderFooter";
import HeaderNav from "../HeaderNav/HeaderNav";

interface HeaderProps {
  isInView: boolean;
  refFeaturesBlock: RefObject<HTMLDivElement | null>;
  faqBlockRef: RefObject<HTMLDivElement | null>;
}

export default function Header({isInView, refFeaturesBlock, faqBlockRef}:HeaderProps) {

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const handleMenu = () => {
      setOpenMenu(!openMenu);
    }

    useEffect(() => {
      if (openMenu) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }, [openMenu]);

    const handleScrollToFeatures = () => { 
      if(openMenu) setOpenMenu(!openMenu);
      refFeaturesBlock.current && refFeaturesBlock.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScrollToFaq = () => {
      if(openMenu) setOpenMenu(!openMenu);
      faqBlockRef.current && faqBlockRef.current.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <header className="bg-header-background bg-cover bg-no-repeat lg:bg-top bg-[80%] bg-fixed lg:h-[694px] h-[500px]">
      <HeaderNav
        handleMenu={handleMenu}
        handleScrollToFaq={handleScrollToFaq}
        handleScrollToFeatures={handleScrollToFeatures}
        isInView={isInView}
        openMenu={openMenu}/>
      <HeaderFooter/>
    </header>
)};