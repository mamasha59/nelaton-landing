"use client"
import Image from "next/image";
import Logo from "@/images/nelatonLogoSvg.svg";
import DropDown from "@/images/icons/chevronDown.svg";
import StoreButtons from "@/components/StoreButtons/StoreButtons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DesktopNavProps {
    handleMenu: () => void;
    isInView: boolean;
    openMenu: boolean;
    handleScrollToFaq: () => void;
    handleScrollToFeatures: () => void;
}

export default function DesktopNav({handleMenu, isInView, openMenu, handleScrollToFaq, handleScrollToFeatures}: DesktopNavProps) {    
    const path = usePathname();
    const whetherShowMenu = path !== '/privacypolicy' && path !== '/termsofuse';
    
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
                    Features
                    </button>
                    <button
                    onClick={handleScrollToFaq}
                    className="text-base text-linkBlur px-3 py-1 font-normal rounded-[32px] hover:text-black hover:bg-[#D1EBFD]"
                    >
                    FAQ
                    </button>
                    <button className="text-base text-linkBlur px-3 py-1 font-normal rounded-[32px] hover:text-black hover:bg-[#D1EBFD]">
                    Contact
                    </button>
                </div>
                ) : (
                <div className="flex px-3">
                    <StoreButtons />
                </div>
                )}
            </>
        )}
        <button className="px-4 py-2 rounded-[32px] lg:flex hidden gap-2 lg:gap-0 lg:bg-black bg-white items-center">
        {/* BIG SCREENS */}
            <p className="text-base text-white uppercase mr-[2px] font-semibold">eng</p>
            <Image
                alt="open dropdown language"
                src={DropDown}
                width={20}
                height={20}
            />
        </button>
       {whetherShowMenu && 
       <button onClick={handleMenu} className="flex lg:hidden items-center justify-center relative w-6 h-6">
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