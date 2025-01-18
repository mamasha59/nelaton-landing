"use client"
import HeaderNav from "@/components/HeaderNav/HeaderNav"
import { SUPPORT_EMAIL } from "@/utils/const"
import Link from "next/link"

export default function Page() {
    
  return (
    <div>
        <div className="bg-termOfUse-background bg-cover bg-no-repeat bg-[50%] bg-fixed relative">
            <HeaderNav/>
            <div className="centred-view-terms">
                <div className="flex flex-col bg-[#000000bc] backdrop-blur-lg text-white text-base lg:px-28 p-5 rounded-2xl mt-5 -mb-4 z-[3000]">
                    <h1 className="text-blue text-3xl font-bold my-5">Terms of Service</h1>
                    <p className="my-6"><strong>Last updated:</strong> 29.12.2024</p>
                    <p>Please read these Terms of Service (&quot;Terms&quot;) carefully before using the Nelaton Application (&quot;Application&quot;) operated by Ulibkin OÜ (&quot;us,&quot; &quot;we,&quot; &quot;our&quot;). These Terms contain important information regarding the limitations of our liability and the rules for using the Application. By accessing or using the Application, you agree to be bound by these Terms and our <Link className="font-bold text-orange-600" href="/privacypolicy">Privacy Policy</Link>. If you do not agree with any part of these Terms, you are not permitted to access or use the Application.</p>

                    <h2 className="text-blue text-xl my-5">Acceptance of Terms</h2>
                    <p>By installing, accessing, or using the Application, you confirm that you are at least 13 years of age and agree to comply with these Terms and all applicable laws and regulations. Children under the age of 18 may use the Application only with the consent and under the supervision of their parents or legal guardians. Parents or legal guardians are responsible for ensuring that the Application is used in accordance with these Terms.</p>

                    <h2 className="text-blue text-xl my-5">Application Usage</h2>
                    <p>The Application does not require the creation of user accounts. Users install the Application, purchase subscriptions if applicable, and store all personal data locally on their devices. Users are responsible for ensuring the security of their devices and any data stored within the Application. If you suspect unauthorized access to your device or data, you are encouraged to take appropriate measures to secure your information.</p>

                    <h2 className="text-blue text-xl my-5">Data Usage</h2>
                    <p>By using the Application, you consent to the processing of your data in accordance with our Privacy Policy. The Application does not share personal data with third parties except for necessary analytics and subscription management partners, including AppsFlyer, RevenueCat, Amplitude, and Google Analytics. All user data is stored locally on the user&apos;s device unless required for functionality.</p>

                    <h2 className="text-blue text-xl my-5">Prohibited Uses</h2>
                    <ul>
                        <li>- Interfere with the operation of the Application.</li>
                        <li>- Use the Application for unlawful purposes.</li>
                        <li>- Modify, copy, or reverse-engineer the Application.</li>
                        <li>- Attempt unauthorized access to any part of the Application or related systems.</li>
                        <li>- Use the Application to harm others or compromise data security.</li>
                        <li>- Violate any applicable local laws while using the Application.</li>
                    </ul>

                    <h2 className="text-blue text-xl my-5">No Warranty</h2>
                    <p>The Application is provided &quot;as is&quot; without any warranties, express or implied. We do not guarantee that the Application will be error-free or uninterrupted.</p>

                    <h2 className="text-blue text-xl my-5">Medical Disclaimer</h2>
                    <p>The Application is a tool to assist users in following medical recommendations. It does not provide medical advice or replace professional healthcare consultation. Users must rely on their physician&apos;s guidance. By using the Application, you acknowledge and agree that Ulibkin OÜ is not responsible for any medical outcomes, complications, or issues arising from the use of the Application. All medical decisions should be made in consultation with a licensed healthcare professional. You are solely responsible for your use of the Application and any consequences arising from such use.</p>

                    <h2 className="text-blue text-xl my-5">Limitation of Liability</h2>
                    <p>To the fullest extent permitted by law, Ulibkin OÜ shall not be liable for any damages arising from your use of or inability to use the Application. You agree to indemnify and hold harmless Ulibkin OÜ from any claims or liabilities resulting from your use of the Application.</p>

                    <h2 className="text-blue text-xl my-5">User Data Deletion</h2>
                    <p>Users may delete their data at any time using the settings within the Application. Deleting data may result in loss of access to certain features. Users accept full responsibility for any consequences of data deletion.</p>

                    <h2 className="text-blue text-xl my-5">Intellectual Property</h2>
                    <p>All content within the Application is owned by Ulibkin OÜ or its licensors. You may not reproduce, distribute, or create derivative works based on the Application without express permission.</p>

                    <h2 className="text-blue text-xl my-5">Changes to Terms</h2>
                    <p>We reserve the right to update or modify these Terms at any time at our sole discretion. Any updates will be posted on this page with the &quot;Last updated&quot; date. It is your responsibility to review these Terms periodically for changes. Continued use of the Application after any modifications signifies your acceptance of the revised Terms. Users will also be notified of significant changes to these Terms upon their next access to the Application.</p>

                    <h2 className="text-blue text-xl my-5">Governing Law</h2>
                    <p>These Terms are governed by the laws of Estonia. Any disputes arising from these Terms will be resolved in the courts of Estonia.</p>

                    <p>If you have questions regarding these Terms, please contact us at {SUPPORT_EMAIL}.</p>

                    <p className="my-6"><strong>Your Self-Catheterization Assistant: Track, Manage, and Log with Ease</strong></p>
                </div>
                <div className="absolute -bottom-4 left-0 right-0 h-9 w-full backdrop-blur-sm z-[2800]"></div>
            </div>
        </div>
    </div>
)}