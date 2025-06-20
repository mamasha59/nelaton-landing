import Image from "next/image";
import StoreButtons from "../StoreButtons/StoreButtons";
import iPhoneScreenShots from '@/images/screenshots/iPhoneScreenShots.webp'
import { useTranslations } from "next-intl";

export default function GetStarted() {
    const t = useTranslations('HomePage');
    
  return (
    <div className="centred-view">
        <div className="lg:p-[72px] w-full relative p-5 rounded-2xl flex flex-row bg-white shadow-md items-center z-30 flex-wrap lg:-my-32 -my-10 lg:mb-40 mb-5">
            <div className="flex flex-col lg:order-1 order-2 mt-3">
                <h3 className="text-black font-medium lg:text-5xl lg:leading-[52px] text-[32px] leading-10 mb-6 tracking-tighter max-w-[252px]">
                    {t("store_buttons.get_started_now")}
                </h3>
                <StoreButtons col/>
            </div>
            <div className="lg:-mb-52 z-10 lg:order-2 order-1 flex flex-1 justify-center items-center ml-5">
                <Image
                    alt="screenshots of water and urine glass screen of the app Nelaton"
                    src={iPhoneScreenShots}
                    width={700}
                    className="lg:ml-[58px] m-0"
                />
            </div>
                {/* <div className="bg-gradient-to-b from-[#FFFFFF00] to-[#0099ff2a] absolute w-full h-full lg:max-w-[482px] max-w-[300px] lg:max-h-[482px] max-h-[300px] -top-1/2 left-0 translate-x-1/2 translate-y-1/2 right-0 rounded-full"/> */}
        </div>
    </div>
)}