import Image from "next/image";
import StoreButtons from "../StoreButtons/StoreButtons";
import iPhoneScreenShots from '@/images/screenshots/iPhoneScreenShots.webp'

export default function GetStarted() {
  return (
    <div className="centred-view">
        <div className="lg:p-[72px] w-full p-5 rounded-2xl flex flex-row bg-white shadow-md relative z-30 flex-wrap lg:-my-32 -my-10 lg:mb-40 mb-5">
            <div className="flex flex-col lg:order-1 order-2">
                <h3 className="text-black font-medium lg:text-5xl lg:leading-[52px] text-[32px] leading-10 mb-6 tracking-tighter max-w-[252px]">
                    Get started now
                </h3>
                <StoreButtons col/>
            </div>
            <div className="lg:-mb-52 mb-6 z-10 lg:order-2 order-1 flex flex-1 justify-center ml-5">
                <Image
                    alt=""
                    src={iPhoneScreenShots}
                />
            </div>
            {/* <div className="bg-gradient-to-b from-[#FFFFFF00] to-[#0099ff2a] absolute h-full w-full lg:max-w-[482px] max-w-[300px] lg:max-h-[482px] max-h-[300px] -top-1/2 -z-10 right-0 rounded-full"/> */}
        </div>
    </div>
)}