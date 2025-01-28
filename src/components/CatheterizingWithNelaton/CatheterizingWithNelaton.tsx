import Image from "next/image";
import JournalScreenShot from '@/images/screenshots/screenShotPdfJournal.webp';
import DecorArrow from '@/images/icons/decorArrow.svg';
import JournalScreenShotIos from '@/images/screenshots/journalScreenShotIos.webp';

export default function CatheterizingWithNelaton() {
  return (
  <section className="bg-greenBg lg:py-[124px] py-12">
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
                    className="absolute lg:hidden right-0 w-[50vw] -bottom-2 z-10"
                />
            </div>
            <div className="flex flex-1 w-full text-black justify-start">
                <div className="flex flex-col justify-between relative">
                    <div>
                        <h2 className="lg:text-5xl text-3xl lg:leading-[61px] font-medium tracking-tighter mb-4 max-w-[511px]">
                            Catheterizing with the <span className="text-blue font-bold">Nelaton app</span> is convenient!
                        </h2>
                        <p className="lg:text-2xl text-xl font-normal max-w-[400px]">
                            All your statistics are gathered in one place.
                        </p>
                    </div>
                    <Image
                        alt="decoration arrow"
                        src={DecorArrow}
                        className="hidden lg:flex"
                    />
                    <div className="px-9 py-4 bg-yellow rounded-lg max-w-[560px] mt-6">
                        <p className="lg:text-2xl text-base font-medium tracking-tighter">You can also download or share a PDF version.</p>
                    </div>
                </div>
                <Image
                    alt="journal screen ios screen shot"
                    src={JournalScreenShotIos}
                    height={330}
                    className="absolute right-0 hidden lg:flex top-10 z-10 w-auto"
                />
            </div>
        </div>
    </div>
  </section>
)}