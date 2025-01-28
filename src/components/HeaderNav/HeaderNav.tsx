import DesktopNav from "../Header/DesktopNav/DesktopNav";
import MobileNav from "../Header/MobileNav/MobileNav";

interface HeaderNavProps {
    isInView?: boolean,
    handleScrollToFaq?: () => void
    handleScrollToFeatures?: () => void,
    handleMenu?: () => void,
    openMenu?: boolean,
}

export default function HeaderNav({ handleMenu, handleScrollToFaq, handleScrollToFeatures, isInView, openMenu }: HeaderNavProps) {
    return (
      <>
        {/* Заглушка */}
        {isInView && <div className="h-[84px]"></div>} {/* Высота соответствует навигации */}
        {/* Навигация */}
        <nav className={`centred-view justify-between py-4 h-[84px] ${isInView && "fixed left-0 right-0 top-0 lg:bottom-0 z-[1000]"}`}>
          <DesktopNav
            handleScrollToFaq={handleScrollToFaq!}
            handleScrollToFeatures={handleScrollToFeatures!}
            handleMenu={handleMenu!}
            isInView={isInView!}
            openMenu={openMenu!}
          />
          {openMenu && (
            <MobileNav
              handleScrollToFaq={handleScrollToFaq!}
              handleScrollToFeatures={handleScrollToFeatures!}
            />
          )}
        </nav>
      </>
    );
}