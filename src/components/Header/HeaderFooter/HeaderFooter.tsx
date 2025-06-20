import Image from "next/image";
import StoreButtons from "../../StoreButtons/StoreButtons";
import HighlightSection from "./HighlightSection/HighlightSection";
import CatheterTube from '@/images/CatheterPictures/catheterTube.jpg';
import CatheterCapSvg from "@/images/CatheterPictures/CatheterCap/CatheterCapSvg";
import { useTranslations } from "next-intl";

export default function HeaderFooter() {
    const t = useTranslations('HomePage');
  return( 
    <div className="centred-view">
        <div className="mt-[172px] lg:mt-[360px] flex flex-row justify-center items-end flex-wrap lg:flex-nowrap gap-7">
            <div className="bg-white rounded-2xl flex flex-col py-8 shadow-xl relative lg:max-w-[65%] max-w-full">
                <h1 className="tracking-[-3%] text-black mb-6">
                    <span className="flex items-center lg:h-[110px] h-20 relative">
                        <span className="w-fit lg:py-10 py-0 absolute lg:left-14 left-10 right-0">
                            <p className="text-white lg:text-[64px] lg:leading-[72px] text-[40px] leading-[48px] font-semibold text-center">
                                {t("header.your", {ending: ''})}
                            </p>
                        </span>
                        <CatheterCapSvg/>
                        <div className="block">
                            <Image
                                alt="catheter caps"
                                width={400}
                                className=""
                                src={CatheterTube}
                            />
                        </div>
                    </span>
                    <span className="block p-8 pt-0">
                        <p style={{ fontSize: "clamp(28px, 3vw, 44px)" }} className="font-semibold text-blue tracking-tighter">
                            {t("header.bold_smart_assistant")}
                        </p>
                        <p style={{ fontSize: "clamp(28px, 3vw, 44px)" }} className="font-semibold tracking-tighter"> 
                            {t("header.slogan")}
                        </p>
                    </span>
                </h1>
                <div className="px-8">
                    <StoreButtons/>
                </div>
            </div>
            <HighlightSection/>
        </div>
    </div>
)}