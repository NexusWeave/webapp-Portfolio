//  RWD - Responsive Web Design
import { tabletWidth, desktop } from "./breakpoints";

export function isMobile() {
    //  Ensure that the window object is below the tablet width

    if (window.innerWidth < tabletWidth)
    {
        return true;

    }
        return false;
}

export function isDesktop() {
    //  Ensure that the window object is below the tablet width

    if (window.innerWidth > desktop)
    {
        return true;

    }
        return false;
}