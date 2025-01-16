import Image from "next/image";
import DropDown from "@/images/icons/chevronDown.svg";

interface MobileNavProps {
    handleScrollToFaq: () => void;
    handleScrollToFeatures: () => void;
}

export default function MobileNav({handleScrollToFaq, handleScrollToFeatures}:MobileNavProps) {
  return (
    <div className="bg-white w-screen h-screen overflow-scroll absolute bottom-0 right-0 left-0 top-0 lg:hidden z-10 pt-32">
        <div className="flex flex-col gap-[30px] pt-4 items-center">
            <button onClick={handleScrollToFeatures} className="text-base text-black px-3 py-1 font-normal rounded-[32px] border-b">Features</button>
            <button onClick={handleScrollToFaq} className="text-base text-black px-3 py-1 font-normal rounded-[32px] border-b">FAQ</button>
            <button className="text-base text-black px-3 py-1 font-normal rounded-[32px] border-b">Contact</button>
            <button className="px-4 py-2 rounded-[32px] items-center flex gap-2 bg-black w-fit">
                <p className="text-base text-white uppercase mr-[2px] font-semibold">eng</p>
                <Image
                    alt="open dropdown language"
                    src={DropDown}
                    width={20}
                    height={20}
                />
            </button>
        </div>
    </div>
)};