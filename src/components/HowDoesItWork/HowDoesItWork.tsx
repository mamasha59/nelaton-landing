import { RefObject } from "react";

interface HowDoesItWorkProps {
  ref: RefObject<HTMLDivElement | null>;
}

export default function HowDoesItWork({ ref }: HowDoesItWorkProps) {
  return (
    <section ref={ref} className="lg:my-[32px] my-12">
      <h2 className="text-black font-semibold lg:text-[64px] lg:leading-[72px] text-[32px] leading-[40px] text-center lg:mb-8 mb-6 tracking-tighter">
        How the Nelaton App Works
      </h2>
      <div className="centred-view">
        <div className="relative border mx-auto">
          <iframe width="315" height="560"
            src="https://www.youtube.com/embed/4Bgibcigu-g?si=uGjI570vMbxrwpH8"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowFullScreen
            ></iframe>
        </div>
      </div>
    </section>
  );
}
