import React, {useState, useEffect} from "react";
import {Logo} from "./SharedComponents.jsx";
import {useNavigate, useLocation} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrollToSection, setScrollToSection] = useState(null);

    useEffect(() => {
        // Check if the current page is not the main page
        const isMainPage = location.pathname === "/";

        if (!isMainPage && scrollToSection) {
            // Navigate back to the main page
            navigate("/");
        } else if (scrollToSection) {
            // Scroll to the section on the main page
            const section = document.querySelector(scrollToSection);
            if (section) {
                section.scrollIntoView({behavior: "smooth"});
                // Reset scrollToSection after scrolling
                setScrollToSection(null);
            }
        }
    }, [navigate, location.pathname, scrollToSection]);

    const handleAboutClick = () => {
        // Check if the current page is the main page
        const isMainPage = location.pathname === "/";
        if (isMainPage) {
            setScrollToSection("#about");
        } else {
            // Set the section to scroll to when navigating back to the main page
            setScrollToSection("#about");
            navigate("/");
        }
    };

    const handleRoadmapClick = () => {
        // Check if the current page is the main page
        const isMainPage = location.pathname === "/";
        if (isMainPage) {
            setScrollToSection("#footer");
        } else {
            // Set the section to scroll to when navigating back to the main page
            setScrollToSection("#footer");
            navigate("/");
        }
    };

    const handlePricingClick = () => {
        // Check if the current page is the main page
        const isMainPage = location.pathname === "/";
        if (isMainPage) {
            setScrollToSection("#footer");
        } else {
            // Set the section to scroll to when navigating back to the main page
            setScrollToSection("#footer");
            navigate("/");
        }
    };

    const handleTeamClick = () => {
        // Check if the current page is the main page
        const isMainPage = location.pathname === "/";
        if (isMainPage) {
            setScrollToSection("#team");
        } else {
            // Set the section to scroll to when navigating back to the main page
            setScrollToSection("#team");
            navigate("/");
        }
    };

    return (
        <header className="lg:p-20 sm:p-8 p-4 flex flex-row justify-between lg:px-28 items-center md:h-24 h-16">
            <a href={"/"} className="lg:w-32 sm:w-20 w-16 aspect-square flex justify-center items-center">
                <Logo/>
            </a>
            <div className="flex flex-row md:gap-14 md:text-xl text-md gap-4">
                <button onClick={handleAboutClick}>About</button>
                <button onClick={handleRoadmapClick}>Roadmap</button>
                <button onClick={handlePricingClick}>Pricing</button>
                <button onClick={handleTeamClick}>Team</button>
            </div>
            <div className="lg:w-32 w-24 hidden lg:block"></div>
        </header>
    );
}
