'use client'
import Image from "next/image";

import AppleStoreButton from "@/images/StoreButtons/appStoreButtonIcon.svg";
import GooglePlayStoreButton from "@/images/StoreButtons/googlePlayStoreButton.svg";
import { APP_STORE_LINK, GOOGLE_STORE_LINK } from "@/utils/const";
import { sendGTMEvent } from "@next/third-parties/google";

export default function StoreButtons({col = false}:{col?: boolean}) {

    const handleClickAppStoreIcon = () => {
        sendGTMEvent({ event: 'buttonClicked', value: 'App Store' });
        window.open(APP_STORE_LINK, "_blank");
    }

    const handleClickGooglePlayIcon = () => {
        sendGTMEvent({ event: "buttonClicked", value: "Google Play" });
        window.open(GOOGLE_STORE_LINK, "_blank");
    }

  return (
    <div className={`flex ${col && 'lg:flex-col flex-row'} gap-4`}>
        <button
            onClick={handleClickAppStoreIcon}
            className="hover:opacity-55 transition-opacity">
            <Image
                alt="App Store Icon"
                src={AppleStoreButton}
                className="w-auto h-auto"
            />
        </button>
        <button
            onClick={handleClickGooglePlayIcon}
            className="hover:opacity-55 transition-opacity">
            <Image
                alt="Google Play Icon"
                src={GooglePlayStoreButton}
                className="w-auto h-auto"
            />
        </button>
    </div>
)};