"use client"
import Link from "next/link";
import Image from "next/image";

import RedditIcon from "@/images/icons/redditIcon.svg";
import InstagramIcon from "@/images/icons/instagramIcon.svg";
import FacebookIcon from "@/images/icons/facebookIcon.svg";
import TwitterIcon from "@/images/icons/twitterIcon.svg";
import TikTokIcon from "@/images/icons/tiktokIcon.svg";
import ButtonScrollToTop from "../ButtonScrollToTop/ButtonScrollToTop";

export default function Footer() {
  return (
    <footer className="centred-view relative z-[2000]">
        <div className="flex flex-row justify-between items-end w-full flex-wrap gap-10 bg-white py-5">
            <div className="flex flex-col">
                <p className="text-black font-medium lg:text-4xl text-[32px] leading-10 tracking-tighter lg:mb-7 mb-5">Join our <br/> community:</p>
                <div className="bg-[#DCF0FD] rounded-full px-8 py-5 lg:gap-4 gap-2 flex flex-row flex-wrap items-center justify-center">
                    <button className="w-11 h-11 rounded-full border border-red-950">
                        <Image
                            alt="reddit icon"
                            src={RedditIcon}
                        />
                    </button>
                    <Link
                        href={'https://www.instagram.com/nelaton.app?igsh=MXY1ZmQxem95dXB6cw=='}
                        target="_blank"
                        className="w-11 h-11 rounded-full border border-red-950">
                        <Image
                            alt="instagram icon"
                            src={InstagramIcon}
                        />
                    </Link>
                    <button className="w-11 h-11 rounded-full border border-red-950">
                        <Image
                            alt="facebook icon"
                            src={FacebookIcon}
                        />
                    </button>
                    <button className="w-11 h-11 rounded-full border border-red-950">
                        <Image
                            alt="twitter icon"
                            src={TwitterIcon}
                        />
                    </button>
                    <button className="w-11 h-11 rounded-full border border-red-950">
                        <Image
                            alt="TikTok icon"
                            src={TikTokIcon}
                        />
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-start text-xl leading-8 relative">
                <Link href={'/privacypolicy'} className="text-black font-semibold mb-2">Privacy Policy</Link>
                <Link href={'/termsofuse'} className="text-black font-semibold">Terms of Use</Link>
                <p className="text-black font-light mt-6">© {new Date().getUTCFullYear()} Ulibkin OÜ - All rights reserved</p>
                <ButtonScrollToTop/>
            </div>
        </div>
    </footer>
)}