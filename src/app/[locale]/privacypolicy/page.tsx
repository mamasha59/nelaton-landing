// "use client"
import Footer from "@/components/Footer/Footer";
import HeaderNav from "@/components/Header/HeaderNav/HeaderNav";

export const metadata = {
  title: "Privacy Policy — Nelaton",
  description: "Privacy Policy for Nelaton mobile app."
};

export default function Page() {
  return (
    <>
    <div className="bg-privacy-background bg-cover bg-no-repeat bg-[50%] bg-fixed relative">
        <HeaderNav /> 
        <main className="w-full my-12 rounded-t-lg mx-auto min-h-screen bg-[#000000bc] text-white max-w-[1040px] px-5">
            <article className="max-w-4xl mx-auto prose prose-invert py-16 lg:prose-lg">
                {/* Header */}
                <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0073a6]">
                    Privacy Policy — Nelaton
                </h1>
                <p className="mt-2 text-orange-600">
                    <time dateTime="2025-10-14">Effective date: 14 October 2025</time> • Version: v2025-10-14
                </p>
                <p className="mt-4 sm:text-justify md:text-left text-white">
                    This Privacy Policy (the “Policy”) applies to the Nelaton mobile application (the “App”)
                    and related services provided by Ulibkin OÜ (Estonia), acting as the data controller
                    (“we”, “us”). You may use the App only after accepting this Policy and the Terms of Use.
                    For the processing of health data, we will ask for your explicit consent inside the App.
                </p>
                </header>

                {/* 1 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">1. At a glance (TL;DR)</h2>
                <p className="text-orange-600 mt-1">Summary</p>
                <ul className="list-disc pl-6 mt-3 space-y-2 sm:text-justify md:text-left text-white">
                    <li>
                    Your data, including health records, is stored in the cloud in the EU (Supabase) with
                    encryption in transit and at rest.
                    </li>
                    <li>
                    Using the App requires your explicit consent to process health data and your consent
                    to technical analytics (Amplitude/Google Analytics). Without these consents, the App
                    cannot be used.
                    </li>
                    <li>
                    We use internal AI algorithms to generate personalised reports. Health records are not
                    shared with analytics providers and are not used to train third-party AI models.
                    </li>
                    <li>
                    You control your data: you can export, withdraw consents, and delete your account and
                    all data in settings. Backups are purged within 30 days.
                    </li>
                    <li>Sign-in is via e-mail (account required).</li>
                    <li>The App is not intended for persons under 16.</li>
                </ul>
                </section>

                {/* 2 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">2. Controller and contact</h2>
                <p className="mt-3 sm:text-justify md:text-left text-white">
                    <strong>Controller:</strong> Ulibkin OÜ (Estonia)
                </p>
                <p className="mt-1 sm:text-justify md:text-left text-white">
                    <strong>Contact for data matters:</strong> <a className="text-white underline" href="mailto:support@nelaton.app">support@nelaton.app</a>
                </p>
                </section>

                {/* 3 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">3. What we process and why</h2>
                <p className="text-orange-600 mt-1">Categories of data & purposes</p>

                <div className="mt-4">
                    <h3 className="text-xl font-medium text-[#0073a6]">3.1. Account data</h3>
                    <p className="mt-2 sm:text-justify md:text-left text-white">
                    <strong>What:</strong> e-mail, authentication/session tokens, interface language, time zone, notification settings.
                    </p>
                    <p className="mt-1 sm:text-justify md:text-left text-white">
                    <strong>Why:</strong> create and maintain your account, authentication, interface personalisation, notifications.
                    </p>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-medium text-[#0073a6]">3.2. Health data (special category)</h3>
                    <p className="mt-2 sm:text-justify md:text-left text-white">
                    <strong>What:</strong> diary entries (event timestamps, volume/colour, symptoms/well-being, notes), fluid intake, leak events,
                    natural urination, urges, schedules, reminders, attachments/files, generated reports.
                    </p>
                    <p className="mt-1 sm:text-justify md:text-left text-white">
                    <strong>Why:</strong> core App functions (diary, statistics, reminders), secure synchronisation across devices, export.
                    </p>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-medium text-[#0073a6]">3.3. AI reports (internal processing)</h3>
                    <p className="mt-2 sm:text-justify md:text-left text-white">
                    <strong>What:</strong> the health data you entered.
                    </p>
                    <p className="mt-1 sm:text-justify md:text-left text-white">
                    <strong>Why:</strong> create personalised reports and insights as part of your subscription.
                    </p>
                    <p className="mt-1 sm:text-justify md:text-left text-white">
                    <strong>Important:</strong> processing takes place in environments we control (server functions/handlers within Supabase EU
                    infrastructure). The contents of your health records are not shared with analytics providers and are not used to train
                    third-party models.
                    </p>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-medium text-[#0073a6]">3.4. Technical analytics and diagnostics (external providers)</h3>
                    <p className="mt-2 sm:text-justify md:text-left text-white">
                    <strong>What:</strong> event and technical data (screen views, taps, stability/crashes, OS/App version, device model,
                    system language, IP/region, install/notification identifiers). The contents of your health records are not sent.
                    </p>
                    <p className="mt-1 sm:text-justify md:text-left text-white">
                    <strong>Why:</strong> improve UX, performance and stability; measure installs/campaigns.
                    </p>
                    <p className="mt-1 sm:text-justify md:text-left text-white">
                    <strong>Providers:</strong> Amplitude, Google Analytics (product analytics); AppsFlyer (install attribution when IDFA/GAID
                    is permitted by the OS).
                    </p>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-medium text-[#0073a6]">3.5. Subscriptions and purchases</h3>
                    <p className="mt-2 sm:text-justify md:text-left text-white">
                    <strong>What:</strong> product identifiers, subscription/purchase status, anonymised receipts/tokens. Full card/payment data
                    is processed by Apple App Store / Google Play.
                    </p>
                    <p className="mt-1 sm:text-justify md:text-left text-white">
                    <strong>Provider:</strong> RevenueCat (receipt validation/statuses).
                    </p>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-medium text-[#0073a6]">3.6. Aggregated/anonymous data</h3>
                    <p className="mt-2 sm:text-justify md:text-left text-white">
                    We may use aggregated or anonymous datasets for research and service improvement — such data does not allow identification of a user.
                    If only pseudonymisation is applied, GDPR/UK GDPR still applies.
                    </p>
                </div>
                </section>

                {/* 4 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">4. Legal bases (GDPR / UK GDPR)</h2>
                <p className="text-orange-600 mt-1">Grounds for processing</p>

                <div className="mt-4">
                    <h3 className="text-xl font-medium text-[#0073a6]">Core functions & sync</h3>
                    <p className="mt-2 sm:text-justify md:text-left text-white">
                    Art. 6(1)(b) (contract) and, for health data, Art. 9(2)(a) (explicit consent).
                    </p>
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-medium text-[#0073a6]">AI reports on health data</h3>
                    <p className="mt-2 sm:text-justify md:text-left text-white">
                    Art. 6(1)(b) (contract) plus Art. 9(2)(a) (explicit consent).
                    </p>
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-medium text-[#0073a6]">Product analytics (Amplitude/GA)</h3>
                    <p className="mt-2 sm:text-justify md:text-left text-white">
                    Art. 6(1)(a) — consent (without consent the App is unavailable).
                    </p>
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-medium text-[#0073a6]">Install attribution (AppsFlyer)</h3>
                    <p className="mt-2 sm:text-justify md:text-left text-white">
                    Art. 6(1)(a) — consent (and OS permission for IDFA/GAID).
                    </p>
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-medium text-[#0073a6]">Minimal security/diagnostics & logging</h3>
                    <p className="mt-2 sm:text-justify md:text-left text-white">
                    Art. 6(1)(f) — legitimate interests (abuse prevention, service resilience).
                    </p>
                </div>

                <p className="mt-4 sm:text-justify md:text-left text-white">
                    You may withdraw consent in the App settings or by e-mail. Withdrawal does not affect the lawfulness
                    of prior processing but may render the App unavailable.
                </p>
                </section>

                {/* 5 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">5. Storage, transfers and recipients</h2>
                <p className="text-orange-600 mt-1">Where we store and who processes data</p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    <strong>Supabase (EU)</strong> — cloud database/storage and synchronisation. Encryption in transit/at rest,
                    row-level security (RLS), least-privilege access controls.
                </p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    <strong>Amplitude / Google Analytics</strong> — product analytics and diagnostics (technical/event data only; not the contents
                    of health records). International transfers, where applicable, rely on SCCs/DPF and data processing agreements.
                </p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    <strong>RevenueCat</strong> — subscription management/receipt validation (no card PANs).
                </p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    <strong>AppsFlyer</strong> — install/campaign attribution (IDFA/GAID only if permitted by the OS).
                </p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    Where data is processed outside the EEA, we use Standard Contractual Clauses (SCCs) and other safeguards as required by law.
                    We do not disclose the contents of your health records to advertising networks.
                </p>
                </section>

                {/* 6 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">6. Retention and deletion</h2>
                <p className="text-orange-600 mt-1">How long we keep data</p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    We keep data while your account is active or as needed for the purposes in Section 4.
                    You can delete your account and all cloud data in settings: <strong>Profile → Settings → Delete account & data</strong>.
                    Backups are purged within 30 days. Deletion is irreversible — please export data (PDF/CSV/JSON) beforehand if needed.
                </p>
                </section>

                {/* 7 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">7. Your rights</h2>
                <p className="text-orange-600 mt-1">Data subject rights</p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    You have the rights to: access and obtain a copy; rectify inaccuracies; request erasure; restrict processing;
                    receive data in a portable format; object to processing based on legitimate interests; and withdraw consent at any time.
                </p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    We respond within 1 month (extendable by up to 2 months for complex requests). We may ask you to verify your e-mail/account
                    ownership. You may also lodge a complaint with your local data protection authority or the Estonian authority.
                </p>
                </section>

                {/* 8 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">8. Security</h2>
                <p className="text-orange-600 mt-1">Measures we take</p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    We implement organisational and technical measures: TLS encryption, at-rest encryption at providers, access control and auditing,
                    data minimisation and segmentation, stability monitoring and patching. If a personal-data breach creates a high risk to your rights
                    and freedoms, we will notify you and the authorities within statutory timeframes.
                </p>
                </section>

                {/* 9 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">9. Age restrictions</h2>
                <p className="text-orange-600 mt-1">Who may use the App</p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    The App is not intended for persons under 16. If we learn that we process data of a person under 16 without the required guardian
                    consent (where applicable), we will delete such data and close the account.
                </p>
                </section>

                {/* 10 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">10. Medical notice and liability</h2>
                <p className="text-orange-600 mt-1">Disclaimer and liability</p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    <strong>Medical notice.</strong> Nelaton is a self-monitoring tool and is not a medical device. It does not replace professional medical advice
                    and is not intended for diagnosis, treatment or prevention of disease. All information is for informational purposes only. Always follow your
                    healthcare provider’s advice.
                </p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    <strong>Liability.</strong> To the maximum extent permitted by law, we are not liable for indirect, incidental, punitive damages or loss of
                    profits arising from the use of the App. This does not limit liability that cannot be limited by law. Details are set out in the Terms of Use.
                </p>
                </section>

                {/* 11 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">11. Third-party links</h2>
                <p className="text-orange-600 mt-1">External sites</p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    The App may contain links to third-party sites/services. We do not control them and are not responsible for their practices. Please review their
                    privacy policies.
                </p>
                </section>

                {/* 12 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">12. Governing law and disputes</h2>
                <p className="text-orange-600 mt-1">Applicable law</p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    This Policy is governed by Estonian law together with applicable GDPR/UK GDPR rules. Disputes are subject to Estonian courts unless mandatory
                    consumer laws provide otherwise.
                </p>
                </section>

                {/* 13 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">13. Changes to this Policy</h2>
                <p className="text-orange-600 mt-1">Updates</p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    We may update this Policy. The current version is available in the App and on our website. Where changes materially affect your rights,
                    we will endeavour to notify you via the App and/or app stores.
                </p>
                </section>

                {/* 14 */}
                <section className="mt-10">
                <h2 className="text-2xl font-semibold text-[#0073a6]">14. Contact</h2>
                <p className="text-orange-600 mt-1">How to reach us</p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    Ulibkin OÜ
                </p>
                <p className="mt-1 sm:text-justify md:text-left text-white">
                    E-mail: <a className="text-white underline" href="mailto:support@nelaton.app">support@nelaton.app</a>
                </p>
                </section>

                {/* Change log */}
                <section className="mt-10 mb-6">
                <h2 className="text-2xl font-semibold text-[#0073a6]">Change log</h2>
                <p className="text-orange-600 mt-1">Recent changes</p>

                <p className="mt-3 sm:text-justify md:text-left text-white">
                    <strong>14.10.2025</strong> — migration to EU cloud (Supabase); added AI reports; analytics based on consent (Amplitude/GA),
                    attribution (AppsFlyer), subscriptions (RevenueCat); deletion procedures and 30-day backup retention; age threshold 16+;
                    clarified international transfers (SCC/DPF).
                </p>
                </section>
            </article>
        </main>
        {/* <div className="absolute -bottom-4 left-0 right-0 h-9 w-full backdrop-blur-sm "></div> */}
    </div>
    <Footer/>
    </>
  );
}
