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
        <div className="relative w-full pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-3xl"
            src="https://www.youtube.com/embed/Cy3NtJoUW4E?si=euzR8ciRtJ8e_Nbk"
            title="Nelaton App – Your Smart Assistant for Self-Catheterization!"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </section>
  );
}
