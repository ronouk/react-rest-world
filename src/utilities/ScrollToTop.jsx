import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
    // This hook gives us the current location object whenever the URL changes
    const { pathname } = useLocation();

    useEffect(() => {
        // Immediately move the window to the top-left corner
        window.scrollTo(0, 0);
    }, [pathname]); // This effect runs every time the path changes (e.g., from / to /countrydetails/BD)

    return null; // This component doesn't render anything visual
};

export default ScrollToTop;