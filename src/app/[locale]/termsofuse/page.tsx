"use client"
import Footer from "@/components/Footer/Footer";
import HeaderNav from "@/components/Header/HeaderNav/HeaderNav";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations('PolicyPage');
    const prohibitedList = t.raw('prohibited_list');

  return (
    <>
        <div className="bg-termOfUse-background bg-cover bg-no-repeat bg-[50%] bg-fixed relative">
            <HeaderNav/>
            <main className="w-full min-h-screen bg-[#000000bc] text-white px-6 py-12 centred-view-terms">
                <article className="max-w-4xl mx-auto prose prose-invert py-16 lg:prose-lg">
       
                    <header className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#0073a6]">
                            Terms of Use (Service Terms)
                        </h1>
                        <p className="mt-2 text-orange-600">
                            <time dateTime="2025-10-15">Effective date: 15 October 2025</time> • Version: v2025-10-15
                        </p>
                        <p className="mt-4 sm:text-justify md:text-left text-white">
                            These Terms of Use (the “Terms”, the “Agreement”) govern your use of the Nelaton mobile application
                            and related services (collectively, the “Service”) provided by Ulibkin OÜ (Estonia, “we”, “us”). By installing,
                            registering for, or using the Service, you (“User”, “you”) acknowledge that you have read, understood,
                            and agree to be bound by these Terms.
                        </p>
                        <p className="text-orange-600">
                            If you do not agree to the Terms, delete the App and stop using the Service.
                        </p>
                    </header>

                    {/* Sections 1–22 */}
                    {[
                    {
                        number: "1",
                        title: "Scope and relationship",
                        subsections: [
                        { number: "1.1", text: "We provide access to the Service for keeping a self-catheterisation diary, reminders, statistics, personalised AI reports, and related functions." },
                        { number: "1.2", text: "The contract is formed when you create an account (e-mail sign-in) or otherwise use the Service." },
                        ]
                    },
                    {
                        number: "2",
                        title: "Age and eligibility",
                        subsections: [
                        { number: "2.1", text: "The Service is not intended for persons under 16." },
                        { number: "2.2", text: "Where the applicable law in your country sets a different age for self-consent to information-society services (between 13 and 16), use is permitted only with the required guardian consent." },
                        { number: "2.3", text: "You represent that you meet the requirements of this section." },
                        ]
                    },
                    {
                        number: "3",
                        title: "Account and security",
                        subsections: [
                        { number: "3.1", text: "Sign-in to the Service is via e-mail. You must keep your access credentials confidential and promptly inform us about unauthorised access." },
                        { number: "3.2", text: "We may restrict or suspend access to protect security, prevent fraud, or where we reasonably suspect a breach of the Terms." },
                        ]
                    },
                    {
                        number: "4",
                        title: "Licence and restrictions",
                        subsections: [
                        { number: "4.1", text: "We grant you a personal, limited, non-transferable, revocable, non-exclusive licence to use the Service in accordance with these Terms." },
                        { number: "4.2", text: "You must not: (i) circumvent technical protection measures; (ii) decompile, disassemble, or reverse engineer except as allowed by law; (iii) use the Service for unlawful activity or to post/transmit content that infringes others’ rights; (iv) upload/process third-party data without a lawful basis/consent; (v) interfere with the Service or attempt unauthorised access to data or systems." },
                        ]
                    },
                    {
                        number: "5",
                        title: "User content and data accuracy",
                        subsections: [
                        { number: "5.1", text: "Data you enter into the Service (including health data) belongs to you. You are responsible for its accuracy and currency." },
                        { number: "5.2", text: "You confirm you have all rights and legal bases to enter such data." },
                        { number: "5.3", text: "We may remove or restrict access to data if its processing violates law or these Terms." },
                        ]
                    },
                    {
                        number: "6",
                        title: "Medical notice",
                        subsections: [
                        { number: "6.1", text: "Nelaton is not a medical device and does not replace professional medical advice. The Service is not intended for diagnosis, treatment, or prevention of disease." },
                        { number: "6.2", text: "Any information in the Service is for informational purposes only. Always follow your healthcare provider’s advice." },
                        ]
                    },
                    {
                        number: "7",
                        title: "Subscriptions, purchases, and “lifetime access”",
                        subsections: [
                        { number: "7.1", text: "Paid features are provided by subscription or as a one-time purchase (“lifetime access”). Billing, subscription management, and refunds are handled by Apple App Store and Google Play under their rules. We do not process card details." },
                        { number: "7.2", text: "Subscriptions renew automatically until cancelled. You can cancel auto-renewal in the relevant store settings before the next charge date." },
                        { number: "7.3", text: "Refunds are governed by store policies. We can assist but cannot guarantee approval." },
                        { number: "7.4", text: "Lifetime access means time-unlimited access to purchased features for the commercial life of the product/account and subject to our ability to operate the Service. It does not guarantee: (i) uninterrupted availability in cases of force majeure, regulatory restrictions, or platform deprecations; (ii) release of new features beyond those initially available; (iii) cross-platform portability or transfer to third parties." },
                        ]
                    },
                    {
                        number: "8",
                        title: "Privacy and data",
                        subsections: [
                        { number: "8.1", text: "Personal-data processing is governed by the Privacy Policy (the current version is available in the Service and on our website). The Policy forms an integral part of these Terms." },
                        { number: "8.2", text: "Using the Service requires: (i) explicit consent to process health data; and (ii) consent to technical analytics (Amplitude/Google Analytics). Withdrawing consents may make the Service unavailable." },
                        ]
                    },
                    {
                        number: "9",
                        title: "Intellectual property",
                        subsections: [
                        { number: "9.1", text: "All rights in the Service, including software, design, databases, trademarks and other IP, belong to us and/or our licensors." },
                        { number: "9.2", text: "You obtain no rights other than the licence expressly granted." },
                        { number: "9.3", text: "By providing feedback/ideas/suggestions, you grant us a non-exclusive, royalty-free right to use them without restriction or attribution." },
                        ]
                    },
                    {
                        number: "10",
                        title: "Third-party services and components",
                        subsections: [
                        { number: "10.1", text: "The Service may contain links to third-party resources or include third-party libraries (including open-source). We do not control third-party resources and are not responsible for their availability, security, or content." },
                        { number: "10.2", text: "Use of third-party resources is governed by their terms. Key providers (e.g., Supabase, RevenueCat, Amplitude, AppsFlyer, Google Analytics) are listed in the Privacy Policy." },
                        ]
                    },
                    {
                        number: "11",
                        title: "Changes to the Service",
                        subsections: [
                        { number: "11.1", text: "We may modify, suspend, or discontinue the Service (in whole or in part) with regard to users’ legitimate interests and applicable law. Where changes are material, we will endeavour to notify you via the Service and/or app stores." },
                        ]
                    },
                    {
                        number: "12",
                        title: "Warranties and disclaimer",
                        subsections: [
                        { number: "12.1", text: "The Service is provided “as is” and “as available.” To the maximum extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and uninterrupted/error-free operation. This does not affect rights that cannot be limited by law." },
                        ]
                    },
                    {
                        number: "13",
                        title: "Limitation of liability",
                        subsections: [
                        { number: "13.1", text: "To the maximum extent permitted by law, we are not liable for indirect, incidental, punitive, special damages, loss of profits, data, reputation, or business opportunity arising from or related to the Service." },
                        { number: "13.2", text: "To the extent permitted by law, our aggregate liability under all claims arising out of or in connection with the Service is limited to the amounts actually paid by you for paid features during the 12 (twelve) months preceding the event giving rise to liability." },
                        { number: "13.3", text: "Nothing in these Terms excludes or limits liability that cannot be excluded or limited by law (including liability for death or personal injury caused by negligence, fraud)." },
                        ]
                    },
                    {
                        number: "14",
                        title: "Indemnity",
                        subsections: [
                        { number: "14.1", text: "To the extent allowed by consumer law, you agree to indemnify us for losses arising from your breaches of the Terms or unlawful use of the Service (e.g., posting unlawful content, unauthorised access). This clause does not apply where prohibited by applicable law." },
                        ]
                    },
                    {
                        number: "15",
                        title: "Termination and account deletion",
                        subsections: [
                        { number: "15.1", text: "You may stop using the Service and delete your account at any time through settings." },
                        { number: "15.2", text: "We may suspend or terminate your access if you breach the Terms, pose a security risk, or create a risk of legal liability for us or others." },
                        { number: "15.3", text: "Effect of termination: access ends; paid periods are not refunded unless required by store rules or law; data is processed and deleted as set out in the Privacy Policy." },
                        ]
                    },
                    {
                        number: "16",
                        title: "Force majeure",
                        subsections: [
                        { number: "16.1", text: "We are not liable for failure to perform due to circumstances beyond our reasonable control (force majeure), including provider infrastructure outages, natural disasters, war/hostilities, regulatory bans, power or communications failures." },
                        ]
                    },
                    {
                        number: "17",
                        title: "Notices and contact",
                        subsections: [
                        { number: "17.1", text: "Official notices may be sent by e-mail, via in-App messages, or push notifications." },
                        { number: "17.2", text: "Contact: support@nelaton.app." },
                        ]
                    },
                    {
                        number: "18",
                        title: "Governing law and dispute resolution",
                        subsections: [
                        { number: "18.1", text: "These Terms are governed by Estonian law together with mandatory EU/UK consumer-protection rules where applicable." },
                        { number: "18.2", text: "Disputes are subject to the courts of Estonia, unless mandatory consumer laws provide otherwise." },
                        { number: "18.3", text: "For EEA users, information about out-of-court settlement and the EU ODR platform is available (no link provided here)." },
                        ]
                    },
                    {
                        number: "19",
                        title: "Changes to the Terms",
                        subsections: [
                        { number: "19.1", text: "We may update the Terms. The current version is always available in the Service and on our website. If changes are material, we will endeavour to notify you in advance. By continuing to use the Service after changes take effect, you accept the updated Terms." },
                        ]
                    },
                    {
                        number: "20",
                        title: "Language priority",
                        subsections: [
                        { number: "20.1", text: "The Service may be available in multiple languages. In case of discrepancies between translations, the English version prevails." },
                        ]
                    },
                    {
                        number: "21",
                        title: "App store terms (Apple/Google)",
                        subsections: [
                        { number: "21.1", text: "If you obtained the App from the Apple App Store, you acknowledge that Apple and its subsidiaries are third-party beneficiaries of these Terms and that Apple may enforce these Terms against you. Apple is not responsible for providing support or warranties for the App unless required by law." },
                        { number: "21.2", text: "You must comply with the terms of the relevant store (App Store or Google Play). In case of inconsistency, store rules prevail for billing, refunds, and subscriptions." },
                        ]
                    },
                    {
                        number: "22",
                        title: "Miscellaneous",
                        subsections: [
                        { number: "22.1", text: "If any provision is held invalid, the remainder remains in effect." },
                        { number: "22.2", text: "Failure or delay to enforce any right is not a waiver." },
                        { number: "22.3", text: "You may not assign the Agreement without our consent. We may assign in connection with a reorganisation or sale of business, subject to your consumer rights." },
                        ]
                    },
                    ].map(section => (
                    <section key={section.number} className="mt-10">
                        <h2 className="text-2xl font-semibold text-[#0073a6]">{section.number}. {section.title}</h2>
                        {section.subsections.map(sub => (
                        <div key={sub.number} className="mt-3">
                            <h3 className="text-xl font-medium text-[#0073a6]">{sub.number}</h3>
                            <p className="mt-1 sm:text-justify md:text-left text-white">{sub.text}</p>
                        </div>
                        ))}
                    </section>
                    ))}

                    {/* Contact at the bottom */}
                    <section className="mt-10">
                        <h2 className="text-2xl font-semibold text-[#0073a6]">Contact</h2>
                        <p className="mt-2 sm:text-justify md:text-left text-white">Ulibkin OÜ</p>
                        <p className="mt-1 sm:text-justify md:text-left text-white">E-mail: support@nelaton.app</p>
                    </section>

                </article>
            </main>
        </div>
        <Footer/>
    </>
)}