import Image from "next/image";
import Test from "@/images/icons/limbL.png";
import { useTranslations } from "next-intl";

export default function HighlightSection() {
    const t = useTranslations('HomePage');
    
  return (
    <div className="bg-white flex justify-between lg:flex-col flex-row gap-x-5 lg:gap-x-0 lg:px-9 px-2 py-6 rounded-lg border">
        <div className="flex items-center justify-center">
            <Image
                alt="Highlight - build on Real Patient Needs"
                src={Test}
                className="-rotate-3"
                width={30}
                height={30}
            />
            <p className="max-w-[150px] mx-2 text-wrap text-center text-black lg:text-lg tracking-tighter lg:leading-[22px] text-sm font-medium">
                {t("header.built_on_real_patient_needs")}
            </p>
            <Image
                alt="Highlight - build on Real Patient Needs"
                src={Test}
                className="scale-x-[-1] rotate-3"
                width={30}
                height={30}
            />
        </div>
        <div className="border-b border-mainBlue/20 my-4"/>
        <div className="flex items-center justify-center">
            <Image
                alt="Highlight - build on Real Patient Needs"
                src={Test}
                className="-rotate-3"
                width={30}
                height={30}
            />
            <p className="max-w-[150px] mx-2 text-center text-black lg:text-lg tracking-tighter lg:leading-[22px] text-sm font-medium">
                <span className="text-[#49AFF5]">{t("header.european_product.bold_2025")}</span> <br/> {t("header.european_product.european_product")}
            </p>
            <Image
                alt="Highlight - build on Real Patient Needs"
                src={Test}
                className="scale-x-[-1] rotate-3"
                width={30}
                height={30}
            />
        </div>
    </div>
)}