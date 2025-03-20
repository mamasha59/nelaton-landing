import Image from "next/image";
import Link from "next/link";

import AppleStoreButton from "@/images/StoreButtons/appStoreButtonIcon.svg";
import GooglePlayStoreButton from "@/images/StoreButtons/googlePlayStoreButton.svg";
import { APP_STORE_LINK, GOOGLE_STORE_LINK } from "@/utils/const";

export default function StoreButtons({col = false}:{col?: boolean}) {
  return (
    <div className={`flex ${col && 'lg:flex-col flex-row'} gap-4`}>
        <Link
            href={APP_STORE_LINK}
            target="_blank"
            className="hover:opacity-55 transition-opacity">
            <Image
                alt="App Store Icon"
                src={AppleStoreButton}
                className="w-auto h-auto"
            />
        </Link>
        <Link
            href={GOOGLE_STORE_LINK}
            target="_blank"
            className="hover:opacity-55 transition-opacity">
            <Image
                alt="Google Play Icon"
                src={GooglePlayStoreButton}
                className="w-auto h-auto"
            />
        </Link>
    </div>
)};