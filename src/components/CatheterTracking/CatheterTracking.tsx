import Image from "next/image";
import iPhoneScreenShot4 from '@/images/screenshots/iPhoneScreenShot4.webp';
import HappyWoman from '@/images/picturePeople/happyWomanPicture.webp';
import BenefitsCatheterInventory from "../BenefitsCatheterInventory/BenefitsCatheterInventory";

export default function CatheterTracking() {
  return (
    <section className="bg-greenBg relative">
        <div className="arrow-left absolute right-0 top-0"></div>
        <div className="centred-view relative z-10">
            <div className="-mb-20 flex flex-1 flex-col lg:pt-[124px] pt-12">
                <div className="flex flex-row">
                    <div className="-mb-32 -mr-20 z-10 lg:flex hidden">
                        <Image
                            alt="iPhone ScreenShot4"
                            src={iPhoneScreenShot4}
                            className=""
                        />
                    </div>
                    <div className="w-full flex flex-col lg:w-[65%] lg:items-center relative">
                        <h5 className="mb-8 text-black">
                            <p className="text-blue font-semibold text-[32px] leading-[40px] lg:leading-[61px] lg:text-5xl">Catheter inventory tracking</p>
                            <p className="font-semibold text-[32px] leading-[40px] lg:leading-[61px] lg:text-5xl">helps you always know the exact quantity remaining and plan for timely restocking</p>
                        </h5>
                        <Image
                            alt="happy woman"
                            src={HappyWoman}
                            className="rounded-2xl"
                        />
                        <div className="absolute left-0 bottom-0 lg:hidden flex w-[40%] h-[50%]">
                            <Image
                                alt="iPhone ScreenShot4"
                                src={iPhoneScreenShot4}
                            />
                        </div>
                    </div>
                </div>
                <BenefitsCatheterInventory/>
            </div>
        </div>
    </section>
)};