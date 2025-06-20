"use client"
import HeaderNav from "@/components/Header/HeaderNav/HeaderNav";
import Image from "next/image";
import DeletingDataGif from '@/images/deletingData.gif';
import { SUPPORT_EMAIL } from "@/utils/const";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer/Footer";

export default function Page() {
    const t = useTranslations('PrivacyPage'); 
  return (
    <>
    <div className="bg-privacy-background bg-cover bg-no-repeat bg-[50%] bg-fixed relative">
        <HeaderNav /> 
        <div className="centred-view-terms">
            <div className="flex flex-col bg-[#000000bc] backdrop-blur-lg text-white text-base lg:px-28 p-5 rounded-2xl mt-5 -mb-4 z-[3000]">
                <h1 className="text-blue text-3xl font-bold my-5">{t("privacy_policy")}</h1>
                <h2 className="text-blue text-xl my-5">1. {t("introduction")}</h2>
                <p>{t("description", {companyName: 'Ulibkin OÜ', email: SUPPORT_EMAIL})}</p>

                <h2 className="text-blue text-xl my-5">2. {t("data_we_process")}</h2>
                <div className="px-3">
                    <h3 className="text-blue text-xl my-5">2.1. {t("data_stored_on_your_device")}:</h3>
                    <p>{t("2_1_description")}</p>
                    <h3 className="text-blue text-xl my-5">2.2. {t("data_transmitted")}:</h3>
                    <p>{t("2_2_description")}</p>
                    <ul className="flex flex-col gap-5 m-4">
                        <li><strong className="font-bold text-orange-600">- {t("2_2_list.1.bold_text")}:</strong> {t("2_2_list.1.description")}</li>
                        <li><strong className="font-bold text-orange-600">- {t("2_2_list.2.bold_text")}:</strong> {t("2_2_list.2.description")}</li>
                        <li><strong className="font-bold text-orange-600">- {t("2_2_list.3.bold_text")}:</strong> {t("2_2_list.3.description")}</li>
                        <li><strong className="font-bold text-orange-600">- {t("2_2_list.4.bold_text")}:</strong> {t("2_2_list.4.description")}</li>
                        <li><strong className="font-bold text-orange-600">- {t("2_2_list.5.bold_text")}:</strong> {t("2_2_list.5.description")}</li>
                        <li><strong className="font-bold text-orange-600">- {t("2_2_list.6.bold_text")}:</strong> {t("2_2_list.6.description")}</li>
                    </ul>
                    <p>{t("2_2_list.description")}</p>
                </div>
                <h2 className="text-blue text-xl my-5">3. {t("where_your_data_is_stored")}</h2>
                <p>{t("3_description")}</p>

                <h2 className="text-blue text-xl my-5">4. {t("purpose_of_data_processing")}</h2>
                <p>{t("4_description")}</p>
                <ul className="flex flex-col gap-5 m-4">
                    <li>- {t("4_list.1")}</li>
                    <li>- {t("4_list.2")}</li>
                    <li>- {t("4_list.3")}</li>
                    <li>- {t("4_list.4")}</li>
                </ul>

                <h2 className="text-blue text-xl my-5">5. {t("your_consent")}</h2>
                <p>- {t("5_description.1")}</p>
                <p>- {t("5_description.2")}</p>

                <h2 className="text-blue text-xl my-5">6. {t("access_for_all_ages")}</h2>
                <p>{t("6_description")}</p>

                <h2 className="text-blue text-xl my-5">7. {t("limitation_of_liability")}</h2>
                <p><strong className="font-bold text-orange-600">Nelaton.app</strong> {t("7_description")}:</p>
                <ul className="flex flex-col gap-5 m-4">
                    <li><strong className="font-bold text-orange-600">- {t("7_list.1.bold_text")}</strong> {t("7_list.1.description")}</li>
                    <li><strong className="font-bold text-orange-600">- {t("7_list.2.bold_text")}</strong> {t("7_list.2.description")}</li>
                </ul>
                <p>{t("7_list.you_acknowledge_that")}:</p>
                <ul className="flex flex-col gap-5 m-4">
                    <li>- {t("7_list.the_application_is_not_a_medical_device")}</li>
                    <li>- {t("7_list.you_cannot_file_legal_claims")}</li>
                </ul>

                <h2 className="text-blue text-xl my-5">8. {t("data_security")}</h2>
                <p>{t("8_description")}:</p>
                <ul className="flex flex-col gap-5 m-4">
                    <li><strong className="font-bold text-orange-600">- {t("8_list.1.bold_text")}</strong> {t("8_list.1.description")}</li>
                    <li>- {t("8_list.2")}</li>
                </ul>
                <p>{t("8_note")}</p>

                <h2 className="text-blue text-xl my-5">9. {t("your_rights")}</h2>
                <p>{t("9_description")}:</p>
                <ul className="flex flex-col gap-5 m-4">
                    <li><strong className="font-bold text-orange-600">
                        - {t("bold_deleting_data")}:</strong> {t("deleting_data_description")}
                        <div className="flex flex-row w-full lg:justify-between justify-center flex-wrap items-center px-5 mt-5">
                            <div className="m-2 p-2 flex flex-1 flex-col border border-red-600 rounded-lg">
                                <p>* {t("9_list.1")}</p>
                                <p>* {t("9_list.2")}</p>
                                <p>* {t("9_list.3")}</p>
                            </div>
                            <Image
                                alt="deleting account data animation, you need to open profile screen,policy, reset profile"
                                src={DeletingDataGif}
                                width={200}
                                height={200}
                                unoptimized
                                className="rounded-xl"
                            />
                        </div>
                    </li>
                    <li><strong className="font-bold text-orange-600">- {t("bold_opting_out_of_analytics")}:</strong> {t("opting_out_of_analytics_description")}</li>
                    <li><strong className="font-bold text-orange-600">- {t("bold_data_control")}:</strong> {t("data_control_description")}</li>
                </ul>
                <p>{t("9_note")}</p>

                <h2 className="text-blue text-xl my-5">10. {t("links_to_third_party_resources")}</h2>
                <p>{t("10_description")}</p>

                <h2 className="text-blue text-xl my-5">11. {t("changes_to_this_policy")}</h2>
                <p>{t("11_description")}</p>

                <h2 className="text-blue text-xl my-5">12. {t("contact_us")}</h2>
                <p>{t("12_description")}</p>
            </div>
            <div className="absolute -bottom-4 left-0 right-0 h-9 w-full backdrop-blur-sm z-[2800]"></div>
        </div>
    </div>
    <Footer/>
    </>
  );
}
