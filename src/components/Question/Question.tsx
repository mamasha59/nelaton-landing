"use client"
import { log } from "console";
import { RefObject, useRef, useState } from "react";

interface QuestionProps{
    faqBlockRef: RefObject<HTMLDivElement | null>;
}

export default function Question({faqBlockRef}:QuestionProps) {
       
    const [selected, setSelected] = useState<number | null>();
    const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const handleQuestion = (id:number) => {
        // if(selected) return setSelected(null);
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
            question: 'How does the timer on the main screen work?',
            answer: 'The timer counts down to the next catheterization. You need to catheterize before the timer runs out to stick to the schedule set by your doctor. If you miss the scheduled catheterization, the timer will show the time that has passed since the last one. After each catheterization, go into the app and press the \'Done\' button to start the countdown for the next catheterization.'
        },
        {
            id: 2,
            question: 'How often do I need to catheterize?',
            answer: 'The frequency of catheterization is determined by your doctor, based on your condition. It\'s also important to note that the frequency may change. We help you easily track your urination habits, which helps your doctor adjust the interval between catheterizations as needed. It\'s recommended to perform self-catheterization regularly throughout the day, depending on the volume of fluids you consume and your doctor\'s recommendations. You may need to catheterize every 4-6 hours to ensure that the urine volume in the bladder does not exceed 400 ml. If you do not catheterize frequently enough and your bladder becomes overfilled, the risk of urinary tract infections and leakage increases. Prolonged bladder stretching can cause serious damage to the kidneys.'
        },
        {
            id: 3,
            question: 'How much water should I drink?',
            answer: 'Adults should drink at least 1.5 liters of water a day. This is just a recommendation, and you should consult your doctor to know how much water is right for you. Remember, water is the best drink. It\'s recommended to avoid caffeinated drinks, as caffeine irritates the bladder. Drinking enough water helps flush the urinary system. The Nelaton app helps you track your hydration levels. You can log your water intake on the main screen using the \'+Drank\' button, and the \'Water Balance\' screen lets you monitor your fluid intake and urine output.'
        },
        {
            id: 4,
            question: 'How can I prevent urinary tract infections?',
            answer: 'Maintain hygiene, regularly and completely empty your bladder, and drink enough fluids. We recommend filling out our catheterization satisfaction survey at least once a month and sharing it with your doctor.'
        },
        {
            id: 5,
            question: 'Do I need to catheterize at night?',
            answer: 'Usually, it\'s enough to catheterize before bed and right after waking up, then continue at intervals throughout the day. However, your doctor will advise you on what\'s best for you. The app helps you follow any schedule and interval of catheterization. You can set up a nighttime catheterization, follow the interval during the night, or even disable nighttime catheterization by enabling sleep mode. It all depends on your doctor\'s advice, and our app is ready to help you follow any schedule.'
        },
        {
            id: 6,
            question: 'How do I track catheter usage?',
            answer: 'The app automatically tracks catheter usage. You need to specify how many catheters you have and whether you use additional supplies during catheterization (such as aseptic wipes, urine bags, gloves, etc.). This will help you keep track of how many catheters and necessary supplies you have and replenish them in time. Every time you press the \'Done\' button, the app will deduct the appropriate amount of supplies. When you purchase catheters and other supplies, don\'t forget to update the quantity in the app.'
        },
        {
            id: 7,
            question: 'What should I do when traveling abroad?',
            answer: 'Take enough catheters with you and carry a medical certificate confirming their necessity. This certificate will help you pass security checks at airports or other events with heightened security measures. On the \'Catheter Usage\' tab, you can calculate how many catheters you need to take with you based on your average consumption.'
        },
        {
            id: 8,
            question: 'What should I do if a feature is missing from the app?',
            answer: 'Write to us using the form on this page. Describe the situation you encountered and what functionality you feel is missing in the Nelaton app. We will consider your suggestions in future updates.'
        }
    ]

  return (
  <section ref={faqBlockRef} className="bg-black lg:py-[124px] py-12">
    <div className="centred-view">
        <div className="flex flex-1 flex-col items-center justify-center text-white">
            <h2 className="text-white font-medium text-center lg:text-5xl text-[32px] leading-10 tracking-tighter lg:leading-[60px] lg:mb-11 mb-6">
                Common Questions About <br/> Intermittent Self-Catheterisation (ISC) and Our App
            </h2>
            <div className='flex flex-1 w-full flex-col gap-8 lg:p-16 p-3'>
                {questions.map((item, index) =>
                    <div ref={(el) => {if (el) questionRefs.current[item.id] = el}} className="flex lg:flex-row flex-col border-b border-[#DBFF0033] lg:pb-8 pb-6 flex-wrap" key={item.id}>
                        <p className="mr-8">0{index + 1}</p>
                        <div className='flex flex-1 w-full flex-col'>
                            <button onClick={() => handleQuestion(item.id)} className='flex flex-1 items-center flex-row justify-between lg:mb-4 mb-3'>
                                <h2 className="font-medium lg:text-2xl text-xl tracking-tighter text-start">{item.question}</h2>
                                <div className='flex items-center justify-center lg:w-6 lg:h-6 w-[14px] h-[14px] relative'>
                                    <p className='w-full h-[2px] bg-white rounded-full'/>
                                    {selected !== item.id && <p className='w-[2px] h-full bg-white rounded-full absolute'/>}
                                </div>

                            </button>
                            <div className={`transition-all duration-700 ease-in-out ${
                                    selected === item.id ? "h-auto opacity-100 translate-y-0" : "h-0 overflow-hidden opacity-0 -translate-y-10"
                                }`}
                                >
                                <p className="max-w-[554px]">{item.answer}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  </section>
)}