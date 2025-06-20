import Image from "next/image";
import HappyPeople from '@/images/picturePeople/happyPeople.webp';
import iPhoneScreenshots3 from '@/images/screenshots/iPhoneScreenshots3.webp';
import CheckedIcon from "@/IconsComponent/CheckedIcon";
import { useTranslations } from "next-intl";

export default function HydrationLevel() {
    const t = useTranslations('HomePage');

    const benefits = [
        "hydration.list.1",
        'hydration.list.2',
        'hydration.list.3'
    ];

  return (
  <section className="relative">
        <div className="triangle absolute right-0 top-0"></div>

        <div className="centred-view flex-col relative z-10">
            <div className="lg:my-[66px] my-6">
                <h2 className="text-black font-semibold lg:text-5xl text-[32px] leading-[40px] w-[80%] mx-auto text-center lg:mb-9 mb-6">
                    {t("hydration.title")} <span className="text-blue italic">{t("bold_nelaton_app")}</span>
                </h2>
                <div className="flex flex-row flex-wrap w-full justify-center gap-7 items-center">
                    <div className="flex lg:order-1 order-2">
                        <Image
                            height={658}
                            className="rounded-3xl w-auto"
                            alt="happy people on wheel chair"
                            src={HappyPeople}
                        />
                    </div>
                    <div className="flex flex-col justify-between items-center flex-1 order-1 lg:order-2">
                        <Image
                            alt="iPhone Screenshot 3"
                            src={iPhoneScreenshots3}
                        />
                        <div className="bg-greenBg lg:py-9 lg:px-8 py-6 px-5 rounded-lg mt-[19px]">
                            <ul className="flex flex-col gap-[17px]">
                                {benefits.map((item, index) => 
                                    <li className="text-black font-normal text-xl flex flex-row items-center gap-3" key={index}>
                                        <div className="flex">
                                            <CheckedIcon fill={'#292D32'} size={21}/>
                                        </div>
                                        {t(item)}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </section>
)}