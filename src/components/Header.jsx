import {Logo} from "./SharedComponents.jsx";

export default function Header() {
    return (
        <header className="p-20 flex flex-row justify-between px-28 items-center h-24">
            <div className="w-32 aspect-square flex justify-center items-center">
                <Logo/>
            </div>
            <ul className="flex flex-row gap-14 text-xl">
                <li><a href="#about">About</a></li>
                <li><a href="#roadmap">Roadmap</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#team">Team</a></li>
            </ul>
            <div className="w-32"></div>
        </header>
    );
}
