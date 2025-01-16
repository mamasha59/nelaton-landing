import Image from "next/image";
import Limb from "@/images/icons/limb.svg";

export default function HighlightSection() {
  return (
    <div className="bg-[#F9F9F9] px-9 py-6 flex flex-1 justify-center flex-row gap-16 rounded-lg">
        <div className="relative flex items-center justify-center">
            <Image
                alt="Catheter Cap"
                src={Limb}
                width={182}
                height={100}
            />
            <h3 className="lg:max-w-[99px]  max-w-[80px] text-center absolute text-black lg:text-lg tracking-tighter lg:leading-[22px] text-sm font-medium">
                Built on <br/> Real Patient Needs
            </h3>
        </div>
        <div className="relative flex items-center justify-center">
            <Image
                alt="Catheter Cap"
                src={Limb}
                width={182}
                height={100}
            />
            <h3 className="lg:max-w-[100px] max-w-[80px] text-center absolute text-black lg:text-lg tracking-tighter lg:leading-[22px] text-sm font-medium">
                <span className="text-[#49AFF5]">2025</span> European Product
            </h3>
        </div>
    </div>
)}