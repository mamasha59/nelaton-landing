import Image from "next/image";
import StoreButtons from "../../StoreButtons/StoreButtons";
import HighlightSection from "./HighlightSection/Highlight Section";
import CatheterTube from '@/images/CatheterPictures/catheterTube.jpg';
import CatheterCapSvg from "@/images/CatheterPictures/CatheterCap/CatheterCapSvg";

export default function HeaderFooter() {
  return( 
    <div className="centred-view">
        <div className="mt-[172px] lg:mt-[360px] flex flex-row justify-center items-end flex-wrap lg:flex-nowrap gap-7">
            <div className="bg-white rounded-2xl flex flex-col py-8 shadow-xl relative">
                <h1 className="tracking-[-3%] text-black mb-6">
                    <span className="flex items-center lg:h-[110px] h-20 relative">
                        <span
                            className="w-fit lg:py-10 py-0 absolute left-10 right-0">
                            <p className="text-white lg:text-[64px] lg:leading-[72px] text-[40px] leading-[48px] font-semibold text-center">
                                Your
                            </p>
                        </span>
                        <CatheterCapSvg/>
                        <div className="block">
                            <Image
                                alt="catheter caps"
                                width={400}
                                src={CatheterTube}
                            />
                        </div>
                    </span>
                    <span className="block p-8 pt-0">
                        <p className="lg:text-[56px] lg:leading-[68px] text-[44px] leading-[52px] font-semibold text-blue tracking-tighter">
                            Smart Assistant
                        </p>
                        <p className="lg:text-[56px] lg:leading-[68px] text-[44px] leading-[52px] font-semibold tracking-tighter"> 
                            for Self-Catheterization!
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