import Image from "next/image";
import QuoteIcon from '@/images/icons/quoteIcon.svg';
import StarRateIcon from "./StarRateIcon/StarRateIcon";

import FeedBack1 from '@/images/picturePeople/feedback1.jpg';
import FeedBack2 from '@/images/picturePeople/feedback2.jpg';
import FeedBack3 from '@/images/picturePeople/feedback3.jpg';
import { useTranslations } from "next-intl";

export default function FeedBack() {
    const t = useTranslations('HomePage');

  return (
    <section className="centred-view bg-white">
        <div className="lg:py-[120px] py-12 flex flex-1 items-center justify-center flex-col">
            <div className="lg:mb-9 mb-6">
                <h3 className="text-black font-medium text-center lg:text-5xl text-[32px] lg:leading-[60px] leading-10 tracking-tighter">
                    {t("what_our_users_say.title")}
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
                        {t("what_our_users_say.list.1.feedback")}
                    </p>
                    <div className="flex flex-row">
                        <Image
                            alt=""
                            className="rounded-full"
                            width={60}
                            src={FeedBack1}
                        />
                        <div className="flex flex-col items-start ml-3">
                            <p className="text-2xl">{t("what_our_users_say.list.1.name")}</p>
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
                        {t("what_our_users_say.list.2.feedback")}
                    </p>
                    <div className="flex flex-row">
                        <Image
                            alt=""
                            className="rounded-full"
                            width={60}
                            src={FeedBack2}
                        />
                        <div className="flex flex-col items-start ml-3">
                            <p className="text-2xl">{t("what_our_users_say.list.2.name")}</p>
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
                        {t("what_our_users_say.list.3.feedback")}
                    </p>
                    <div className="flex flex-row">
                        <Image
                            alt=""
                            className="rounded-full w-auto"
                            width={60}
                            src={FeedBack3}
                        />
                        <div className="flex flex-col items-start ml-3">
                            <p className="text-2xl">{t("what_our_users_say.list.3.name")}</p>
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