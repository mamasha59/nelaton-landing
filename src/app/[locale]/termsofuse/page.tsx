"use client"
import Footer from "@/components/Footer/Footer";
import HeaderNav from "@/components/Header/HeaderNav/HeaderNav"
import { SUPPORT_EMAIL } from "@/utils/const"
import { useTranslations } from "next-intl";
import Link from "next/link"

export default function Page() {
    const t = useTranslations('PolicyPage');
    const prohibitedList = t.raw('prohibited_list');

  return (
    <>
        <div className="bg-termOfUse-background bg-cover bg-no-repeat bg-[50%] bg-fixed relative">
            <HeaderNav/>
            <div className="centred-view-terms">
                <div className="flex flex-col bg-[#000000bc] backdrop-blur-lg text-white text-base lg:px-28 p-5 rounded-2xl mt-5 -mb-4 z-[3000]">
                    <h1 className="text-blue text-3xl font-bold my-5">{t("terms_title")}</h1>
                    <p className="my-6">{t("terms_last_updated")}</p>
                    <p>{t("terms_intro.first_sentence")} <Link className="font-bold text-orange-600" href="/privacypolicy">{t("terms_intro.link")}</Link>. {t("terms_intro.second_sentence")}</p>

                    <h2 className="text-blue text-xl my-5">{t("acceptance_title")}</h2>
                    <p>{t("acceptance_text")}</p>

                    <h2 className="text-blue text-xl my-5">{t("usage_title")}</h2>
                    <p>{t("usage_text")}</p>

                    <h2 className="text-blue text-xl my-5">{t("data_usage_title")}</h2>
                    <p>{t("data_usage_text")}</p>

                    <h2 className="text-blue text-xl my-5">{t("prohibited_title")}</h2>
                    <ul>
                        {prohibitedList.map((item:string, index:number) => 
                            <li key={index}>- {item}</li>
                        )}
                    </ul>

                    <h2 className="text-blue text-xl my-5">{t("no_warranty_title")}</h2>
                    <p>{t("no_warranty_text")}</p>

                    <h2 className="text-blue text-xl my-5">{t("medical_title")}</h2>
                    <p>{t("medical_text")}</p>

                    <h2 className="text-blue text-xl my-5">{t("liability_title")}</h2>
                    <p>{t("liability_text")}</p>

                    <h2 className="text-blue text-xl my-5">{t("data_deletion_title")}</h2>
                    <p>{t("data_deletion_text")}</p>

                    <h2 className="text-blue text-xl my-5">{t("ip_title")}</h2>
                    <p>{t("ip_text")}</p>

                    <h2 className="text-blue text-xl my-5">{t("changes_title")}</h2>
                    <p>{t("changes_text")}</p>

                    <h2 className="text-blue text-xl my-5">{t("law_title")}</h2>
                    <p>{t("law_text")}</p>

                    <p>{t("contact",{ email: SUPPORT_EMAIL})}</p>

                    <p className="my-6"><strong>{t("slogan")}</strong></p>
                </div>
                <div className="absolute -bottom-4 left-0 right-0 h-9 w-full backdrop-blur-sm z-[2800]"></div>
            </div>
        </div>
        <Footer/>
    </>
)}