import { languages } from "@/utils/const";
import Image from "next/image";

export default function ModalSetLanguage({handleModalSelectLanguage, openSelectLanguage}:{handleModalSelectLanguage: () => void, openSelectLanguage: boolean}) {
  return (
    <div onClick={handleModalSelectLanguage} className={`fixed top-0 left-0 right-0 w-full h-full bg-[#00000045] z-[9999] transition-opacity ${openSelectLanguage ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div onClick={(e) => e.stopPropagation()} className={`relative h-full lg:w-1/4 w-[65%] overflow-y-scroll bg-black text-white transition-all ${openSelectLanguage ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-1 flex-col items-center">
            <div className="flex justify-center items-center gap-6 px-3">
            <p className="text-lg my-5">Select preferred language</p>
            <button 
                className="relative w-6 h-6 flex items-center justify-center hover:animate-pulse"
                onClick={handleModalSelectLanguage}
            >
                <span className="absolute w-6 h-[2px] bg-white rotate-45"></span>
                <span className="absolute w-6 h-[2px] bg-white -rotate-45"></span>
            </button>
            </div>
            <div className="flex flex-col gap-3 py-5">
                {languages.map((language) => (
                <button key={language.id} className={`hover:text-black hover:bg-white flex items-center relative px-4 py-2 rounded-lg transition ${
                    !language.isAvailable && "opacity-50 cursor-not-allowed" 
                    }`}
                    disabled={!language.isAvailable}
                >
                    <Image
                        src={language.icon}
                        width={50}
                        height={50}
                        className="w-[50px] h-[50px] rounded-full"
                        alt={`flag of country - ${language.title}`}
                    />
                        <p className="text-lg ml-3">{language.title}</p>
                    {!language.isAvailable && (
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md">
                        Not available yet
                    </div>
                )}
          </button>
          
                ))}
            </div>
        </div>
        </div>
    </div>
  )
}