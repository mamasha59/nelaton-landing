import Image from "next/image";
import Limb from "@/images/icons/limb.svg";

export default function HighlightSection() {
  return (
    <div className="bg-[#F9F9F9] flex justify-center flex-row lg:px-9 px-2 py-6 rounded-lg border">
        <div className="relative flex items-center justify-center max-w-48">
            <Image
                alt="Highlight - build on Real Patient Needs"
                src={Limb}
                width={146}
                height={100}
            />
            <p className="lg:max-w-[99px] max-w-[80px] text-center absolute text-black lg:text-lg tracking-tighter lg:leading-[22px] text-sm font-medium">
                Built on <br/> Real Patient Needs
            </p>
        </div>
        <div className="relative flex items-center justify-center w-48">
            <Image
                alt="Highlight European Product"
                src={Limb}
                width={146}
                height={100}
            />
            <p className="lg:max-w-[100px] max-w-[80px] text-center absolute text-black lg:text-lg tracking-tighter lg:leading-[22px] text-sm font-medium">
                <span className="text-[#49AFF5]">2025</span> European Product
            </p>
        </div>
    </div>
)}