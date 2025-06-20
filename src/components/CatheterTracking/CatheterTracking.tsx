import Image from "next/image";
import iPhoneScreenShot4 from '@/images/screenshots/iPhoneScreenShot4.webp';
import HappyWoman from '@/images/picturePeople/happyWomanPicture.webp';
import BenefitsCatheterInventory from "../BenefitsCatheterInventory/BenefitsCatheterInventory";
import { useTranslations } from "next-intl";

export default function CatheterTracking() {
    const t = useTranslations('HomePage');
  return (
    <section className="bg-greenBg relative">
        <div className="arrow-left absolute right-0 top-0"></div>
        <div className="centred-view relative z-10">
            <div className="-mb-20 flex flex-1 flex-col pt-12">
                <h2 className="text-blue font-semibold text-[32px] leading-[40px] lg:leading-[61px] lg:text-5xl">
                    {t("inventory_tracking.title.bold_catheter_inventory_tracking")}
                </h2>
                <div className="flex flex-row justify-between w-full">
                    <div className="rotate-6">
                        <Image
                            alt="iPhone ScreenShot4"
                            src={iPhoneScreenShot4}
                            width={200}
                            height={300}
                            className="hidden lg:flex flex-1 h-auto w-full"
                        />
                    </div>
                    <div className="w-full flex flex-col lg:w-[65%] lg:items-center relative">
                        <h2 className="mb-8 text-black">
                     
                            <p className="font-semibold text-[32px] leading-[40px] lg:text-3xl">
                                {t("inventory_tracking.title.description")}
                            </p>
                        </h2>
                        <Image
                            alt="happy woman"
                            src={HappyWoman}
                            className="rounded-2xl"
                        />
                        <div className="absolute right-0 -bottom-10 lg:hidden flex sm:w-auto lg:w-1/2">
                            <Image
                                alt="iPhone ScreenShot4"
                                className="h-auto"
                                src={iPhoneScreenShot4}
                                height={300}
                            />
                        </div>
                    </div>
                </div>
                <BenefitsCatheterInventory/>
            </div>
        </div>
    </section>
)};