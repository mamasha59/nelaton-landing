import Image from "next/image";
import StoreButtons from "../StoreButtons/StoreButtons";
import iPhoneScreenShots from '@/images/screenshots/iPhoneScreenShots.webp'

export default function GetStarted() {
  return (
    <div className="centred-view">
        <div className="lg:p-[72px] w-full p-5 rounded-2xl flex flex-row bg-white shadow-md relative flex-wrap lg:-my-32 -my-10 lg:mb-40 mb-5 z-[2000]">
            <div className="flex flex-col lg:order-1 order-2">
                <h5 className="text-black font-medium lg:text-5xl lg:leading-[52px] text-[32px] leading-10 mb-6 tracking-tighter max-w-[252px]">
                    Get started now
                </h5>
                <StoreButtons col/>
            </div>
            <div className="lg:-mb-52 mb-6 z-10 lg:order-2 order-1 flex flex-1 justify-center ml-5">
                <Image
                    alt=""
                    src={iPhoneScreenShots}
                />
            </div>
            <div className="bg-cyan-50 absolute w-1/2 h-1/w-1/2 -top-40 left-1/3 rounded-full clip-circle border border-red-900"/>
        </div>
    </div>
)}