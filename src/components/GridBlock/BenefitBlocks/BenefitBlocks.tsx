import Image from "next/image";

import MotherAndSon from '@/images/picturePeople/motherAndSon.webp';
import BoyInWheelChair from '@/images/picturePeople/menInWheelChair.webp';
import OrganStructure from '@/images/picturePeople/OrganStructure.webp';
import WomanWalking from '@/images/picturePeople/WomanWalking.webp';
import { useTranslations } from "next-intl";

export default function BenefitBlocks() {
  const t = useTranslations('HomePage');

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">

      <div className="bg-blueBg p-6 rounded-xl">
        <div className="bg-[#0090F3] p-6 rounded-xl mb-4 flex items-center">
          <p className="text-white lg:text-[32px] lg:leading-[44px] text-2xl font-normal tracking-tighter">
            {t("bladder_catheterization.list.1")}
          </p>
        </div>
        <Image
          className="rounded-2xl"
            alt="mother and son picture"
            src={MotherAndSon}
          />
      </div>

      <div className="bg-yellowBg p-6 rounded-xl inline-grid">
        <Image
          className="rounded-2xl"
          alt="mother and son picture"
          src={BoyInWheelChair}
        />
        <div className="bg-yellow p-6 rounded-xl mt-4 flex items-center">
          <p className="text-black lg:text-[32px] lg:leading-[44px] text-2xl font-normal tracking-tighter">
            {t("bladder_catheterization.list.2.first_sentence")}<span className="font-bold"> {t("bladder_catheterization.list.2.bold_text")}</span> {t("bladder_catheterization.list.2.third_sentence")}.
          </p>
        </div>
      </div>

      <div className="bg-yellowBg p-6 rounded-xl">
        <Image
          className="rounded-2xl"
          alt="mother and son picture"
          src={OrganStructure}
        />
        <div className="bg-yellow p-6 rounded-xl mt-4 flex items-center">
          <p className="text-black lg:text-[32px] lg:leading-[44px] text-2xl font-normal tracking-tighter">
            {t("bladder_catheterization.list.4.first_sentence")} <span className="font-bold">{t("bladder_catheterization.list.4.bold_text")}</span>
          </p>
        </div>
      </div>

      <div className="bg-blueBg p-6 rounded-xl inline-grid">
        <div className="bg-[#0090F3] p-6 rounded-xl mb-4 flex items-center">
          <p className="text-white lg:text-[32px] lg:leading-[44px] text-2xl font-normal tracking-tighter">
            {t("bladder_catheterization.list.3.first_sentence")} <span className="font-bold"><br/> {t("bladder_catheterization.list.3.bold_text")}</span> {t("bladder_catheterization.list.3.third_sentence")}
          </p>
        </div>
        <Image
          className="rounded-2xl"
            alt="mother and son picture"
            src={WomanWalking}
          />
      </div>
    </div>
)}