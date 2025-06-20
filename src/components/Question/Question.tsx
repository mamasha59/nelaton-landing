"use client"
import { useTranslations } from "next-intl";
import { RefObject, useRef, useState } from "react";

interface QuestionProps{
    faqBlockRef: RefObject<HTMLDivElement | null>;
}

export default function Question({faqBlockRef}:QuestionProps) {
    const t = useTranslations('HomePage');
       
    const [selected, setSelected] = useState<number | null>();
    const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const handleQuestion = (id:number) => {
        setSelected(id);
        const element = questionRefs.current[id];

        if (element) {
          const offset = 500; // Отступ от верха (на случай фиксированного хедера)
          const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
    }

    const questions = [
        {
            id: 1,
            question: "questions.list.1.title",
            answer: "questions.list.1.answer"
        },
        {
            id: 2,
            question: "questions.list.2.title",
            answer: "questions.list.2.answer"
        },
        {
            id: 3,
            question: "questions.list.3.title",
            answer: "questions.list.3.answer"
        },
        {
            id: 4,
            question: "questions.list.4.title",
            answer: "questions.list.4.answer"
        },
        {
            id: 5,
            question: "questions.list.5.title",
            answer: "questions.list.5.answer"
        },
        {
            id: 6,
            question: "questions.list.6.title",
            answer: "questions.list.6.answer"
        },
        {
            id: 7,
            question: "questions.list.7.title",
            answer: "questions.list.7.answer"
        },
        {
            id: 8,
            question: "questions.list.8.title",
            answer: "questions.list.8.answer"
        }
    ]

  return (
  <section ref={faqBlockRef} className="bg-black lg:py-[124px] py-12">
    <div className="centred-view">
        <div className="flex flex-1 flex-col items-center justify-center text-white">
            <h2 className="text-white w-[68%] font-medium text-center lg:text-5xl text-[32px] leading-10 tracking-tighter lg:leading-[60px] lg:mb-11 mb-6">
                {t("questions.title")}
            </h2>
            <div className='flex flex-1 w-full flex-col gap-8 lg:p-16 p-3'>
                {questions.map((item, index) =>
                    <div ref={(el) => {if (el) questionRefs.current[item.id] = el}} className="flex lg:flex-row flex-col border-b border-[#DBFF0033] pb-6 flex-wrap" key={item.id}>
                        <p className="mr-8">0{index + 1}</p>
                        <div className='flex flex-1 w-full flex-col'>
                            <button onClick={() => handleQuestion(item.id)} className='flex flex-1 items-center flex-row justify-between lg:mb-4 mb-3'>
                                <h2 className="font-medium lg:text-2xl text-xl tracking-tighter text-start">{t(item.question)}</h2>
                                <div className='flex items-center justify-center lg:w-6 lg:h-6 w-[14px] h-[14px] relative'>
                                    <p className='w-full h-[2px] bg-white rounded-full'/>
                                    {selected !== item.id && <p className='w-[2px] h-full bg-white rounded-full absolute'/>}
                                </div>

                            </button>
                            <div className={`transition-all duration-700 ease-in-out ${
                                    selected === item.id ? "h-auto opacity-100 translate-y-0" : "h-0 overflow-hidden opacity-0 -translate-y-10"
                                }`}
                                >
                                <p className="max-w-[554px]">{t(item.answer)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  </section>
)}