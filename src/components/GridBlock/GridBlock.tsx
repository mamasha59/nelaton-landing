import { useTranslations } from "next-intl";
import StoreButtons from "../StoreButtons/StoreButtons";
import BenefitBlocks from "./BenefitBlocks/BenefitBlocks";

function GridBlock() {
    const t = useTranslations('HomePage');
  return (
    <section className="lg:mt-[200px] mt-32 lg:mb-[124px] mb-12">
        <div className="centred-view flex-col">
            <div className="flex flex-1 flex-row justify-center items-end mb-9 flex-wrap lg:justify-between">
                <h2 className="text-black font-medium lg:text-5xl text-[32px] leading-10 tracking-tighter w-full mb-5 text-center lg:text-start lg:m-0 lg:w-[50%]">
                    {t("bladder_catheterization.title.systematic_approach")} <span className="text-blue">{t("bladder_catheterization.title.bold_self_description")}</span>
                </h2>
                    <StoreButtons/>
            </div>
            <BenefitBlocks/>
        </div>
    </section>
)};

export default GridBlock;