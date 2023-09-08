import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {useMemo} from 'react';
import {useNavigation} from "react-router-dom";

export default function Layout({children}) {
    return (
        <div className="relative overflow-x-hidden">
            <Header/>
            <LightOrbs/>
            <main
                className="min-h-screen w-full text-white scroll-smooth lg:p-28 sm:p-8 p-4 flex flex-col gap-y-24 lg:pt-0 sm:pt-2 pt-4">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

function LightOrbs() {
    const orbs = useMemo(() => {
        return [...Array(window.location.pathname === "/" ? 10 : 2)].map((_, index) => (
            <div
                key={index}
                className={`absolute w-1/2 aspect-square rounded-full blur-[28rem] z-[-9999] ${
                    index % 2 !== 0 ? "bg-[#20C7EF]" : "bg-[#B327FF]"
                }`}
                style={{
                    top: `${window.location.pathname === "/" ? 10 * index : 50 * index}%`,
                    left: index % 2 !== 0 ? "-2%" : "auto",
                    right: index % 2 === 0 ? "-2%" : "auto",
                    transform: index % 2 !== 0 ? "translate(-50%, -50%)" : "translate(50%, -50%)",
                }}
            ></div>
        ));
    }, []);
    return <>{orbs}</>;
}
