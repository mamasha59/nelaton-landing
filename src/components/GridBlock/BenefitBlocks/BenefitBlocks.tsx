import Image from "next/image";

import MotherAndSon from '@/images/picturePeople/motherAndSon.webp';
import BoyInWheelChair from '@/images/picturePeople/menInWheelChair.webp';
import OrganStructure from '@/images/picturePeople/OrganStructure.webp';
import WomanWalking from '@/images/picturePeople/WomanWalking.webp';

export default function BenefitBlocks() {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">

      <div className="bg-blueBg p-6 rounded-xl">
        <div className="bg-[#0090F3] p-6 rounded-xl mb-4">
          <p className="text-white lg:text-[32px] lg:leading-[44px] text-2xl font-normal tracking-tighter">
            With the Nelaton app, you can track more than 10 key parameters for your bladder health
          </p>
        </div>
        <Image
          className="rounded-2xl"
            alt="mother and son picture"
            src={MotherAndSon}
          />
      </div>

      <div className="bg-yellowBg p-6 rounded-xl">
        <Image
          className="rounded-2xl"
          alt="mother and son picture"
          src={BoyInWheelChair}
        />
        <div className="bg-yellow p-6 rounded-xl mt-4">
          <p className="text-black lg:text-[32px] lg:leading-[44px] text-2xl font-normal tracking-tighter">
            Prompt response to infection symptoms significantly<span className="font-bold"> reduces the risk</span> of urinary tract complications.
          </p>
        </div>
      </div>

      <div className="bg-yellowBg p-6 rounded-xl">
        <Image
          className="rounded-2xl"
          alt="mother and son picture"
          src={OrganStructure}
        />
        <div className="bg-yellow p-6 rounded-xl mt-4">
          <p className="text-black lg:text-[32px] lg:leading-[44px] text-2xl font-normal tracking-tighter">
            Adherence to catheterization intervals reduces the risk of urinary tract infections <span className="font-bold">by 84.8%</span>
          </p>
        </div>
      </div>

      <div className="bg-blueBg p-6 rounded-xl">
        <div className="bg-[#0090F3] p-6 rounded-xl mb-4">
          <p className="text-white lg:text-[32px] lg:leading-[44px] text-2xl font-normal tracking-tighter">
            Taking control of <span className="font-bold"><br/> self-catheterization</span> has never been easier.
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