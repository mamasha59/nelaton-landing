import Image from "next/image";
import JournalScreenShot from '@/images/screenshots/screenShotPdfJournal.webp';
import DecorArrow from '@/images/icons/decorArrow.svg';
import JournalScreenShotIos from '@/images/screenshots/journalScreenShotIos.webp';
import { useTranslations } from "next-intl";

export default function CatheterizingWithNelaton() {
    const t = useTranslations('HomePage');
    
  return (
  <section className="bg-greenBg lg:py-[100px] py-12">
    <div className="centred-view">
        <div className="flex flex-1 flex-row lg:justify-between justify-center flex-wrap gap-12 relative">
            <div className="relative">
                <Image
                    alt="journal screen shot"
                    src={JournalScreenShot}
                    className="rounded-2xl"
                />
                <Image
                    alt="journal screen android screen shot"
                    src={JournalScreenShotIos}
                    width={200}
                    height={200}
                    className="absolute lg:hidden right-0 w-[40vw] -bottom-2 z-10"
                />
            </div>
            <div className="flex flex-1 w-full text-black justify-start">
                <div className="flex flex-col justify-between relative">
                    <div>
                        <h2 className="lg:text-5xl text-3xl lg:leading-[61px] font-medium tracking-tighter mb-4 max-w-[511px]">
                            {t("catheterizing_with_the_nelaton_app_is_convenient.catheterizing_with_the")} <span className="text-blue font-bold">{t("bold_nelaton_app")}</span> {t("catheterizing_with_the_nelaton_app_is_convenient.is_convenient")}
                        </h2>
                        <p className="lg:text-2xl text-xl font-normal max-w-[400px]">
                           {t("all_your_statistics_are_gathered_in_one_place")}
                        </p>
                    </div>
                    <Image
                        alt="decoration arrow"
                        src={DecorArrow}
                        className="hidden lg:flex animate-bounce"
                    />
                    <div className="px-9 py-4 bg-yellow rounded-lg max-w-[560px] mt-6 animate-glow">
                        <p className="lg:text-2xl text-base font-medium tracking-tighter">
                            {t("you_can_also_download_or_share_a_pdf_version")}
                        </p>
                    </div>
                </div>
                <Image
                    alt="journal screen ios screen shot"
                    src={JournalScreenShotIos}
                    height={430}
                    className="absolute right-0 hidden lg:flex top-10 z-10 w-auto"
                />
            </div>
        </div>
    </div>
  </section>
)}