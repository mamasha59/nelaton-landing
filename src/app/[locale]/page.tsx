"use client"
import { useEffect, useRef, useState } from "react";

import Header from "@/components/Header/Header";
import BladderHealth from "@/components/BladderHealth/BladderHealth";
import HowDoesItWork from "@/components/HowDoesItWork/HowDoesItWork";
import HydrationLevel from "@/components/HydrationLevel/HydrationLevel";
import CatheterTracking from "@/components/CatheterTracking/CatheterTracking";
import GridBlock from "@/components/GridBlock/GridBlock";
import CatheterizingWithNelaton from "@/components/CatheterizingWithNelaton/CatheterizingWithNelaton";
import FeedBack from "@/components/FeedBack/FeedBack";
import Question from "@/components/Question/Question";
import GetStarted from "@/components/GetStarted/GetStarted";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import { languages } from "@/utils/const";

export default function Page() {

  const [isInView, setIsInView] = useState<boolean>(false);

  const targetRef = useRef<HTMLDivElement>(null);
  const featuresBlock = useRef<HTMLDivElement>(null); //scroll to block
  const faqBlock = useRef<HTMLDivElement>(null); //scroll to block
  
  useEffect(() => {    
    const handleScroll = () => {
      if (!targetRef.current || !faqBlock.current) return;
  
      // Абсолютные координаты элементов
        const targetPosition = targetRef.current.getBoundingClientRect().top + window.scrollY;
        const faqBlockPosition = faqBlock.current.getBoundingClientRect().top + window.scrollY;
    
      const scrollPosition = window.scrollY;
      const headerHeight = 84; // Высота хедера
  
      // Проверка условий для липкого заголовка
      if (scrollPosition >= targetPosition - headerHeight && scrollPosition + headerHeight <= faqBlockPosition) {
        setIsInView(true); // Хедер становится липким
      } else {
        setIsInView(false); // Хедер возвращается наверх
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [targetRef, faqBlock]); // Обе зависимости добавлены
  
  return (
    <>
    <Head>
      {languages.map(lang => (
        <link
          key={lang.id}
          rel="alternate"
          hreflang={lang.id}
           href={lang.id === 'en'
            ? 'https://nelaton.app/'
            : `https://nelaton.app/${lang.id}`
          }
        />
      ))}
      <link
        rel="alternate"
        hreflang="x-default"
        href="https://nelaton.app/"
      />
    </Head>
    <Header isInView={isInView} refFeaturesBlock={featuresBlock} faqBlockRef={faqBlock}/>
    <main>
      <BladderHealth featuresBlock={featuresBlock}/>
      <HowDoesItWork ref={targetRef}/>
      <HydrationLevel/>
      <CatheterTracking/>
      <GridBlock/>
      <CatheterizingWithNelaton/>
      <FeedBack/>
      <Question faqBlockRef={faqBlock}/>
      <GetStarted/>
    </main>
    <Footer/>
    </>
  );
}
