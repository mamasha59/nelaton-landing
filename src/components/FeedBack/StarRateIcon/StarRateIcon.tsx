import Image from "next/image";
import RateIcon from '@/images/icons/starRateIcon.svg';

export default function StarRateIcon() {
  return  (
    <div>
        <Image
            alt="user feed back rate"
            src={RateIcon}
        />
    </div>
  )
}