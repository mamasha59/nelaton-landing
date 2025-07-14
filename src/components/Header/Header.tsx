"use client"
import Image from "next/image";
import { RefObject, useState } from "react";

import HeaderBackground from '../../../public/images/backgroundHeader.webp';
import HeaderFooter from "./HeaderFooter/HeaderFooter";
import HeaderNav from "./HeaderNav/HeaderNav";

interface HeaderProps {
  isInView: boolean;
  refFeaturesBlock: RefObject<HTMLDivElement | null>;
  faqBlockRef: RefObject<HTMLDivElement | null>;
}

export default function Header({isInView, refFeaturesBlock, faqBlockRef}:HeaderProps) {

    const [openMenu, setOpenMenu] = useState<boolean>(false);
    //test
    const handleScrollToFeatures = () => { 
      if(openMenu) setOpenMenu(!openMenu);
      refFeaturesBlock.current && refFeaturesBlock.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScrollToFaq = () => {
      if(openMenu) setOpenMenu(!openMenu);
      faqBlockRef.current && faqBlockRef.current.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <header className="relative">
      <Image
        alt="background image of header block - father and son enjoying swimming"
        src={HeaderBackground}
        className="absolute top-0 left-0 w-full object-cover lg:object-top object-right z-10 h-[694px]"
        priority
      />
      <div className="relative z-30">
        <HeaderNav
          handleScrollToFaq={handleScrollToFaq}
          handleScrollToFeatures={handleScrollToFeatures}
          isInView={isInView}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          />
        <HeaderFooter/>
      </div>
    </header>
)};