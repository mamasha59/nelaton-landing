import Image from "next/image";
import Video from '@/images/picturePeople/video.svg';
import { RefObject } from "react";

interface HowDoesItWorkProps {
  ref: RefObject<HTMLDivElement | null>;
}

export default function HowDoesItWork({ref}:HowDoesItWorkProps) {
  return (
  <section ref={ref} className="lg:my-[132px] my-12">
    <h2 className="text-black font-semibold lg:text-[64px] lg:leading-[72px] text-[32px] leading-[40px] text-center lg:mb-8 mb-6 tracking-tighter">
      How the Nelaton App Works
    </h2>
    <div className="centred-view">
      <Image
        alt="video how its works"
        src={Video}
      />
    </div>
  </section>
)};