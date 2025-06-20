import { RefObject } from "react";
import Image from "next/image";

import StoreButtons from "../StoreButtons/StoreButtons";
import iPhoneScreenShot1 from '@/images/screenshots/iPhoneScreenShot1.webp';
import CheckedIcon from "@/IconsComponent/CheckedIcon";
import { useTranslations } from "next-intl";

interface BladderHealthProps {
    featuresBlock: RefObject<HTMLDivElement | null>;
}

export default function BladderHealth({featuresBlock}:BladderHealthProps) {
    const t = useTranslations('HomePage');

    const benefitsArray: string[] = [
        'bladder_health.list.1',
        'bladder_health.list.2',
        'bladder_health.list.3',
        'bladder_health.list.4',
        'bladder_health.list.5',
        'bladder_health.list.6'
    ];

  return (
    <section ref={featuresBlock} className="pt-[39px] lg:pt-[132px]">
        <div className="centred-view flex-col">
            <h2 className="font-semibold lg:text-5xl text-[32px] leading-[40px] text-black text-center mx-auto lg:mb-8 mb-6 tracking-tighter">
                {t("header.your", {ending: 'е'})} <span className="text-blue">{t("bladder_health.title_bold")}</span>
            </h2>
            <div className="bg-greenBg rounded-2xl lg:py-12 lg:px-10 py-8 px-[21px] flex flex-row flex-wrap-reverse justify-center lg:gap-[52px] gap-6">
                <div className="flex flex-col flex-1 w-[80%]">
                    <div className="rounded-lg bg-white py-10 px-8 mb-[30px]">
                        <h2 className="text-black font-medium lg:text-4xl text-[28px] leading-9 mb-4 tracking-tighter">
                            {t("bladder_health.description")}:
                        </h2>
                        <ul className="text-black font-normal text-base flex flex-col gap-3">
                            {benefitsArray.map((item, index) => 
                                <li key={index} className="flex flex-row items-center gap-3">
                                    <div className="flex">
                                        <CheckedIcon fill={'#292D32'} size={21}/>
                                    </div>
                                    {t(item)}
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="pl-9">
                        <p className="text-black font-medium text-2xl mb-4">{t("store_buttons.get_started_now")}</p>
                        <StoreButtons/>
                    </div>
                </div>
                <Image
                    alt="iPhone Screen Shot home screen of app"
                    src={iPhoneScreenShot1}
                    // width={500}
                    height={590}
                    className=""
                />
            </div>
        </div>
    </section>
)};