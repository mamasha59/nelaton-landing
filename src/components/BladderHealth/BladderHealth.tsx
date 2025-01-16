import { RefObject } from "react";
import Image from "next/image";

import StoreButtons from "../StoreButtons/StoreButtons";
import iPhoneScreenShot1 from '@/images/screenshots/iPhoneScreenShot1.webp';
import iPhoneScreenShot2 from '@/images/screenshots/iPhoneScreenShot2.webp';
import CheckedIcon from "@/IconsComponent/CheckedIcon";

interface BladderHealthProps {
    featuresBlock: RefObject<HTMLDivElement | null>;
}

export default function BladderHealth({featuresBlock}:BladderHealthProps) {

    const benefitsArray: string[] = [
        'Smart interval timer for precise adherence to your doctor’s recommendations.',
        'Catheter tracking: always know how many are left & when to restock.',
        'Support for fluid balance monitoring.',
        'Convenient self-catheterization journal (urination diary).',
        'Personalized reminders.',
        'Compatible with all urinary catheters for self-catheterization.'
    ];

  return (
    <section ref={featuresBlock} className="mt-[439px] lg:mt-[230px] my-12">
        <div className="centred-view flex-col">
            <h2 className="font-semibold lg:text-5xl text-[32px] leading-[40px] text-black text-center mx-auto lg:mb-8 mb-6 tracking-tighter">
                Your <span className="text-blue">Bladder Health</span>
            </h2>
            <div className="bg-greenBg rounded-2xl lg:py-12 lg:px-10 py-8 px-[21px] flex flex-row flex-wrap-reverse justify-center lg:gap-[52px] gap-6">
                <div className="flex flex-col flex-1">
                    <div className="rounded-lg bg-white py-10 px-8 mb-[30px]">
                        <h4 className="text-black font-medium lg:text-4xl text-[28px] leading-9 mb-4 tracking-tighter">Self-catheterization made easy & timely:</h4>
                        <ul className="text-black font-normal text-base flex flex-col gap-3">
                            {benefitsArray.map((item, index) => 
                                <li key={index} className="flex flex-row items-center gap-3">
                                    <div className="flex">
                                        <CheckedIcon fill={'#292D32'} size={21}/>
                                    </div>
                                    {item}
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="pl-9">
                        <p className="text-black font-medium text-2xl mb-4">Get started now</p>
                        <StoreButtons/>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex">
                        <Image
                            alt="iPhone Screen Shot home screen of app"
                            src={iPhoneScreenShot1}
                            className="w-auto h-auto"
                        />
                    </div>
                    <div className="flex">
                        <Image
                            alt="iPhone Screen Shot stocks screen"
                            src={iPhoneScreenShot2}
                            className="w-auto h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
)};