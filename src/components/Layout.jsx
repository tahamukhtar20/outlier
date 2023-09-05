import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {useMemo} from 'react';

export default function Layout({children}) {
    return (
        <>
            <Header/>
            <LightOrbs/>
            <main className="min-h-screen w-full text-white scroll-smooth lg:p-28 sm:p-8 p-4 flex flex-col gap-y-24">
                {children}
            </main>
            <Footer/>
        </>
    )
}

function LightOrbs() {
    const orbs = useMemo(() => {
        return [...Array(10)].map((_, index) => (
            <div
                key={index}
                className={`absolute w-1/2 aspect-square rounded-full blur-[28rem] z-[-9999] ${
                    index % 2 !== 0 ? "bg-[#20C7EF]" : "bg-[#B327FF]"
                }`}
                style={{
                    top: `${10 * index}%`,
                    left: index % 2 !== 0 ? "-2%" : "auto",
                    right: index % 2 === 0 ? "-2%" : "auto",
                    transform: index % 2 !== 0 ? "translate(-50%, -50%)" : "translate(50%, -50%)",
                }}
            ></div>
        ));
    }, []);
    return <>{orbs}</>;
}
