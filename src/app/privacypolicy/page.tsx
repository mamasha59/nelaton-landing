import HeaderNav from "@/components/HeaderNav/HeaderNav";
import Image from "next/image";
import DeletingDataGif from '@/images/deletingData.gif';

export default async function Page() {

  return (
        <div className="bg-privacy-background bg-cover bg-no-repeat bg-center bg-fixed overflow-hidden h-screen">
            <HeaderNav/>

        
            <div className="centred-view  overflow-scroll bg-[#000000bc] backdrop-blur-lg">
                <div className="flex flex-col  text-white text-base lg:px-28 p-5 rounded-2xl mb-5">
                    <h1 className="text-blue text-3xl font-bold my-5">Privacy Policy</h1>
                    <h2 className="text-blue text-xl my-5">1. Introduction</h2>
                    <p>The application is developed by <strong>Ulibkin OÜ</strong>, which is responsible for complying with this Privacy Policy.
                    We respect your privacy and are committed to ensuring transparency in data processing.
                    This Policy explains what data we process, how it is protected, and for what purposes it is used.</p>
                    <p>If you have any questions, please contact us at: support@nelaton.app.</p>
                    <p>By installing and using the application, you confirm that you have read and agree to this Privacy Policy.
                    If you do not agree, please delete the application and discontinue its use.</p>

                    <h2 className="text-blue text-xl my-5">2. Data We Process</h2>
                    <div className="px-3">
                        <h3 className="text-blue text-xl my-5">2.1. Data Stored on Your Device:</h3>
                        <p>Personal and medical data that you enter to use the application’s features, such as generating reminders and creating reports.</p>
                        <h3 className="text-blue text-xl my-5">2.2. Data Transmitted:</h3>
                        <p >We transmit minimal technical data to services that help analyze application usage, manage subscriptions, and improve functionality. This data includes:</p>
                        <ul className="flex flex-col gap-5 m-4">
                            <li><strong className="font-bold text-orange-600">- Device Identifier:</strong> Used for analytics related to app usage and advertising campaigns.</li>
                            <li><strong className="font-bold text-orange-600">- IP Address:</strong> Used to determine the user’s region for statistical purposes.</li>
                            <li><strong className="font-bold text-orange-600">- App Interaction Data:</strong> Includes actions taken within the app to help us improve the user experience (e.g., frequently used features).</li>
                            <li><strong className="font-bold text-orange-600">- Device Technical Data:</strong> Includes operating system version, device model, and other parameters necessary for app performance analysis.</li>
                            <li><strong className="font-bold text-orange-600">- App Version:</strong> Helps track the compatibility of the app with devices.</li>
                            <li><strong className="font-bold text-orange-600">- System Language:</strong> Used to analyze user preferences and localize the interface.</li>
                        </ul>
                        <p>This data is used solely for the purposes stated above and does not include personal information such as name, email, or medical data entered into the application.</p>
                    </div>
                    <h2 className="text-blue text-xl my-5">3. Where Your Data Is Stored</h2>
                    <p>All data you enter is stored <strong>only on your device</strong>. We do not store it on servers or share it with third parties,
                    except for technical data used for support and analytics.</p>

                    <h2 className="text-blue text-xl my-5">4. Purpose of Data Processing</h2>
                    <p>We process data for the following purposes:</p>
                    <ul className="flex flex-col gap-5 m-4">
                        <li>- Generating reminders.</li>
                        <li>- Creating reports.</li>
                        <li>- Managing subscriptions.</li>
                        <li>- Analyzing interactions with the application and improving its functionality.</li>
                    </ul>

                    <h2 className="text-blue text-xl my-5">5. Your Consent</h2>
                    <p>- Installing and using the application automatically indicates your agreement with this Privacy Policy.</p>
                    <p>- If you do not agree with this Privacy Policy, please delete the application and discontinue its use.</p>

                    <h2 className="text-blue text-xl my-5">6. Access for All Ages</h2>
                    <p>The application is available for users of all ages. If the user is a minor, parents or guardians are responsible for overseeing their use of the application.
                    We do not collect data on the user’s age.</p>

                    <h2 className="text-blue text-xl my-5">7. Limitation of Liability</h2>
                    <p><strong className="font-bold text-orange-600">Nelaton.app</strong> is a tool designed to assist users in adhering to their healthcare provider&apos;s recommendations. The application:</p>
                    <ul className="flex flex-col gap-5 m-4">
                        <li><strong className="font-bold text-orange-600">- Does not replace professional medical advice.</strong> Users should rely solely on the recommendations of their healthcare provider.</li>
                        <li><strong className="font-bold text-orange-600">- Is not liable for the application’s use.</strong> By installing and using the application, users accept all risks associated with its use.</li>
                    </ul>
                    <p>You acknowledge that:</p>
                    <ul className="flex flex-col gap-5 m-4">
                        <li>- The application is not a medical device.</li>
                        <li>- You cannot file legal claims against Ulibkin OÜ or third parties involved in the operation of the application in any jurisdiction.</li>
                    </ul>

                    <h2 className="text-blue text-xl my-5">8. Data Security</h2>
                    <p>We protect your data using modern technologies:</p>
                    <ul className="flex flex-col gap-5 m-4">
                        <li><strong className="font-bold text-orange-600">- Data encryption</strong> during transmission to services that support the application’s functionality.</li>
                        <li>- All data you enter is available only to you and is stored on your device.</li>
                    </ul>
                    <p>Your payment data is processed by <strong className="font-bold text-orange-600">App Store</strong> and <strong className="font-bold text-orange-600">Google Play</strong>, and we do not have access to it.</p>

                    <h2 className="text-blue text-xl my-5">9. Your Rights</h2>
                    <p>Since your data is stored only on your device and not transferred to the developer, you have full control over it. Your rights include:</p>
                    <ul className="flex flex-col gap-5 m-4">
                        <li><strong className="font-bold text-orange-600">
                            - Deleting Data:</strong> You can delete all entered data through the app’s settings.
                            <div className="flex flex-row w-full lg:justify-between justify-center flex-wrap items-center px-5 mt-5">
                                <div className="m-2 p-2 flex flex-1 flex-col border border-red-600 rounded-lg">
                                    <p>* Once deleted, this data cannot be recovered.</p>
                                    <p>* Deleting your data will reset the application to its original state, as if it were newly installed.</p>
                                    <p>* If you wish to retain any information, please export the necessary data (e.g., as PDF reports) before deleting it.</p>
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
                        <li><strong className="font-bold text-orange-600">- Opting Out of Analytics:</strong> You can disable the use of analytics services through your device settings.</li>
                        <li><strong className="font-bold text-orange-600">- Data Control:</strong> Since your data remains on your device, only you have access to it.</li>
                    </ul>
                    <p>If you have questions about your rights or would like more information, contact us at: support@nelaton.app.</p>

                    <h2 className="text-blue text-xl my-5">10. Links to Third-Party Resources</h2>
                    <p>The application may contain links to websites or services of third parties. We do not control their content or data processing practices. Please review their privacy policies before using them.</p>

                    <h2 className="text-blue text-xl my-5">11. Changes to This Policy</h2>
                    <p>We may update this Privacy Policy. The current version will always be available via the link on the app’s page in the <strong className="font-bold text-orange-600">App Store</strong> or <strong className="font-bold text-orange-600">Google Play</strong>. If changes significantly affect your rights, we will notify you through app stores or other means.</p>

                    <h2 className="text-blue text-xl my-5">12. Contact Us</h2>
                    <p>If you have any questions or requests, contact us at: support@nelaton.app.</p>
                </div>
            </div>
        </div>
  );
}
