import Image from "next/image";
import HappyPeople from '@/images/picturePeople/happyPeople.webp';
import iPhoneScreenshots3 from '@/images/screenshots/iPhoneScreenshots3.webp';
import CheckedIcon from "@/IconsComponent/CheckedIcon";

export default function HydrationLevel() {
    const benefits = [
        'Easily log your fluid intake and urine output.',
        'Monitor your hydration balance at any time.',
        'Manage the timing and volume of fluid intake to achieve optimal hydration levels.'
    ];

  return (
  <section className="centred-view flex-col">
    <div className="lg:mb-[132px] mb-12">
        <h2 className="text-black font-semibold lg:text-5xl text-[32px] leading-[40px] w-full text-center lg:mb-9 mb-6">
            Track and Maintain Optimal Hydration <br/> with <span className="text-blue italic">Nelaton app</span>
        </h2>
        <div className="flex flex-row flex-wrap w-full justify-center gap-7 items-center">
            <div className="flex lg:order-1 order-2">
                <Image
                    height={658}
                    className="rounded-3xl w-auto"
                    alt="happy people on wheel chair"
                    src={HappyPeople}
                    priority
                />
            </div>
            <div className="flex flex-col justify-between items-center flex-1 order-1 lg:order-2">
                <Image
                    alt="iPhone Screenshot 3"
                    src={iPhoneScreenshots3}
                />
                <div className="bg-greenBg lg:py-9 lg:px-8 py-6 px-5 rounded-lg mt-[19px]">
                    <ul className="flex flex-col gap-[17px]">
                        {benefits.map((item, index) => 
                            <li className="text-black font-normal text-xl flex flex-row items-center gap-3" key={index}>
                                <div className="flex">
                                    <CheckedIcon fill={'#292D32'} size={21}/>
                                </div>
                                {item}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </section>
)}