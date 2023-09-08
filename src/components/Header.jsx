import {Logo} from "./SharedComponents.jsx";

export default function Header() {
    return (
        <header className="lg:p-20 sm:p-8 p-4 flex flex-row justify-between lg:px-28 items-center md:h-24 h-16">
            <a href={"/"} className="lg:w-32 sm:w-20 w-16 aspect-square flex justify-center items-center">
                <Logo/>
            </a>
            <ul className="flex flex-row md:gap-14 md:text-xl text-md gap-4">
                <li><a href={"#about"}>About</a></li>
                <li><a href={"#roadmap"}>Roadmap</a></li>
                <li><a href={"#pricing"}>Pricing</a></li>
                <li><a href={"#team"}>Team</a></li>
            </ul>
            <div className="lg:w-32 w-24 hidden lg:block"></div>
        </header>
    );
}
