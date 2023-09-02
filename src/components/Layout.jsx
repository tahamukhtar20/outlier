import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout({children}) {
    return (
        <>
            <Header/>
            <main
                className="min-h-screen w-full text-white scroll-smooth p-28">
                {children}
            </main>
            <Footer/>
        </>
    )
}