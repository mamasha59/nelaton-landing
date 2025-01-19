import Image from "next/image";
import StoreButtons from "../StoreButtons/StoreButtons";
import HighlightSection from "./HighlightSection/Highlight Section";
import CatheterTube from '@/images/catheterCaps/catheterTube.jpg';

export default function HeaderFooter() {
  return( 
    <div className="centred-view">
        <div className="mt-[172px] lg:mt-[360] flex flex-row justify-between items-end flex-wrap lg:gap-[95px] gap-8">
            <div className="bg-white rounded-2xl flex flex-col py-8 shadow-xl relative">
                <h1 className="tracking-[-3%] text-black mb-6">
                    <span className="flex items-center pl-8">
                        <span className="lg:w-[240px] w-[145px] animation-change-bg lg:bg-[length:240px_85px] bg-[length:148px_60px] bg-no-repeat bg-bottom py-2 ml-[2px]">
                            <p className="text-white lg:text-[64px] lg:leading-[72px] text-[40px] leading-[48px] font-semibold tracking-tighter px-3">
                                Your
                            </p>
                        </span>
                        <span className="flex flex-1">
                            <Image
                                alt=""
                                width={400}
                                src={CatheterTube}
                            />
                        </span>
                    </span>
                    <span className="block p-8">
                        <p className="lg:text-[56px] lg:leading-[68px] text-[44px] leading-[52px] font-semibold">
                            <span className="text-blue tracking-tighter">Smart Assistant</span>
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