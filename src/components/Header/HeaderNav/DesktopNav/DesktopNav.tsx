"use client"
import Image from "next/image";
import Logo from "@/images/nelatonLogoSvg.svg";
import DropDown from "@/images/icons/chevronDown.svg";
import StoreButtons from "@/components/StoreButtons/StoreButtons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SUPPORT_EMAIL } from "@/utils/const";
import { useLocale, useTranslations } from "next-intl";

interface DesktopNavProps {
    handleMenu: () => void;
    isInView: boolean;
    openMenu: boolean;
    handleScrollToFaq: () => void;
    handleScrollToFeatures: () => void;
    handleModalSelectLanguage: () => void
}

export default function DesktopNav({handleMenu, isInView, openMenu, handleScrollToFaq, handleScrollToFeatures, handleModalSelectLanguage}: DesktopNavProps) {    
    const path = usePathname();
    const locale = useLocale(); // retrieve the current locale
    
    const t = useTranslations('HomePage');

    const whetherShowMenu = path !== '/privacypolicy' && path !== '/termsofuse';

    const [changeText, setChangeText] = useState<string>(t("nav.contacts"));

    const onClickContacts = () => {
        setChangeText(SUPPORT_EMAIL);
        if(changeText === SUPPORT_EMAIL){
            setChangeText(t("nav.contacts"))
        }
    }
    
  return (
    <div className="flex flex-1 px-6 py-4 mt-2 bg-[#ffffffcf] backdrop-blur-lg rounded-xl justify-between items-center shadow-md lg:shadow-none relative z-30">
        <Link href={'/'}>
            <Image
                src={Logo}
                alt="Logo"
                width={148}
                height={52}
                priority
                className={`${isInView && 'hidden lg:flex'}`}
            />
        </Link>
        {whetherShowMenu && (
        <>
            {!isInView ? (
                <div className="lg:flex hidden gap-[30px]">
                    <button
                    onClick={handleScrollToFeatures}
                    className="text-base text-linkBlur px-3 py-1 font-normal rounded-[32px] hover:text-black hover:bg-[#D1EBFD]"
                    >
                        {t("nav.features")}
                    </button>
                    <button
                    onClick={handleScrollToFaq}
                    className="text-base text-linkBlur px-3 py-1 font-normal rounded-[32px] hover:text-black hover:bg-[#D1EBFD]"
                    >
                        {t("nav.FAQ")}
                    </button>
                    <button onClick={onClickContacts} className="text-base text-linkBlur px-3 py-1 font-normal rounded-[32px] hover:text-black hover:bg-[#D1EBFD]">
                        {changeText}
                    </button>
                </div>
                ) : (
                <div className="flex px-3">
                    <StoreButtons />
                </div>
                )}
            </>
        )}
        <button onClick={handleModalSelectLanguage} className="px-4 py-2 rounded-[32px] lg:flex hidden gap-2 lg:gap-0 lg:bg-black bg-white items-center">
        {/* BIG SCREENS */}
            <p className="text-base text-white uppercase mr-[2px] font-semibold">{locale}</p>
            <Image
                alt="open dropdown language"
                src={DropDown}
                width={20}
                height={20}
            />
        </button>
       {whetherShowMenu && 
       <button title="burger menu(features-faq-contacts)" aria-label="burger menu(features-faq-contacts)" onClick={handleMenu} className="flex lg:hidden items-center justify-center relative w-6 h-6">
            <div className={`w-6 h-[2px] bg-black absolute transition-transform duration-300 ease-in-out ${
                openMenu ? 'rotate-45' : '-translate-y-[6px]'
                }`}
            />
            <div className={`w-6 h-[2px] bg-black absolute transition-opacity duration-300 ease-in-out ${
                openMenu ? 'opacity-0' : ''
                }`}
            />
            <div className={`w-6 h-[2px] bg-black absolute transition-transform duration-300 ease-in-out ${
                openMenu ? '-rotate-45' : 'translate-y-[6px]'
                }`}
            />
        </button>}
    </div>
)}