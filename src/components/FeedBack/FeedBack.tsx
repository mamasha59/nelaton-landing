import Image from "next/image";
import QuoteIcon from '@/images/icons/quoteIcon.svg';
import StarRateIcon from "./StarRateIcon/StarRateIcon";

import FeedBack1 from '@/images/picturePeople/feedback1.jpg';
import FeedBack2 from '@/images/picturePeople/feedback2.jpg';
import FeedBack3 from '@/images/picturePeople/feedback3.jpg';

export default function FeedBack() {
  return (
    <section className="centred-view bg-white">
        <div className="lg:py-[120px] py-12 flex flex-1 items-center justify-center flex-col">
            <div className="lg:mb-9 mb-6">
                <h3 className="text-black font-medium text-center lg:text-5xl text-[32px] lg:leading-[60px] leading-10 tracking-tighter">
                    What Our Users Say
                </h3>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center lg:gap-[26px] gap-5">
                <div className="flex flex-col justify-between border border-[#E2E2E2] rounded-xl p-7 text-black">
                    <Image
                        alt="quote of feedback"
                        src={QuoteIcon}
                        className="mb-9"
                    />
                    <p className="text-xl leading-8 font-medium max-w-xs mb-12 italic">
                        The app quickly set itself up to suit my needs—basically, it just asked me a few questions and handled the rest. Honestly, it’s super convenient and really makes life easier.
                    </p>
                    <div className="flex flex-row">
                        <Image
                            alt=""
                            className="rounded-full"
                            width={60}
                            src={FeedBack1}
                        />
                        <div className="flex flex-col items-start ml-3">
                            <p className="text-2xl">Antônio Silva</p>
                            <div className="flex flex-row gap-1 mt-2">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <StarRateIcon
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between border border-[#E2E2E2] rounded-xl p-7 text-black">
                    <Image
                        alt="quote of feedback"
                        src={QuoteIcon}
                        className="mb-9"
                    />
                    <p className="text-xl leading-8 font-medium max-w-xs mb-12 italic">
                        When I was told I’d need to keep cathing regularly, I was terrified. But I’m so glad I found this app—it helped me calm down and feel like I’ve got everything under control.
                    </p>
                    <div className="flex flex-row">
                        <Image
                            alt=""
                            className="rounded-full"
                            width={60}
                            src={FeedBack2}
                        />
                        <div className="flex flex-col items-start ml-3">
                            <p className="text-2xl">Camille</p>
                            <div className="flex flex-row gap-1 mt-2">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <StarRateIcon
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between border border-[#E2E2E2] rounded-xl p-7 text-black">
                    <Image
                        alt="quote of feedback"
                        src={QuoteIcon}
                        className="mb-9"
                    />
                    <p className="text-xl leading-8 font-medium max-w-xs mb-12 italic">
                        At the hospital, they told me to keep a urination diary and even gave me a stack of paper forms. Doing this in the app is so much easier and way more convenient.
                    </p>
                    <div className="flex flex-row">
                        <Image
                            alt=""
                            className="rounded-full w-auto"
                            width={60}
                            src={FeedBack3}
                        />
                        <div className="flex flex-col items-start ml-3">
                            <p className="text-2xl">Viktor</p>
                            <div className="flex flex-row gap-1 mt-2">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <StarRateIcon
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)};