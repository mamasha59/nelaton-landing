import Image from "next/image";
import Link from "next/link";

import AppleStoreButton from "@/images/appStoreButtonIcon.svg";
import GooglePlayStoreButton from "@/images/googlePlayStoreButton.svg";

export default function StoreButtons({col = false}:{col?: boolean}) {
  return (
    <div className={`flex ${col && 'lg:flex-col flex-row'} gap-4`}>
        <Link href={''} className="hover:opacity-55 transition-opacity">
            <Image
                alt="App Store Icon"
                src={AppleStoreButton}
                className="w-auto h-auto"
            />
        </Link>
        <Link
            href={'https://play.google.com/store/apps/details?id=com.ulibkin.nelaton'}
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