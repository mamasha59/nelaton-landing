import Image from "next/image";
import ArrowIcon from '@/images/icons/chevronDown.svg';

export default function ButtonScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      className="absolute right-[10%] top-0 bg-black rounded-full animate-bounce">
      <Image
          alt="scroll to top"
          width={40}
          height={40}
          src={ArrowIcon}
          className="rotate-180"
      />
    </button>
  );
}