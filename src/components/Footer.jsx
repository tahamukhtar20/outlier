import {Logo} from "./SharedComponents.jsx";

export default function Footer() {
    return (
        <footer className="p-10 w-full border border-x-0">
            <div className="flex flex-row justify-between">
                <div>
                    <div className="flex w-24 aspect-square">
                        <Logo/>
                    </div>
                    <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>                    <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut
                    labore et dolore magna aliqua.
                </p>                    <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut
                    labore et dolore magna aliqua.
                </p>
                </div>
                <div>
                    <ul className="flex flex-row gap-14">
                        <li><a href="#">Home</a></li>
                        <li><a href="#about">About me</a></li>
                        <li><a href="#contact">Contact me</a></li>
                    </ul>
                    <ul className="flex flex-row gap-14 justify-end pt-10">
                        <li>logo1</li>
                        <li>logo2</li>
                        <li>logo3</li>
                    </ul>
                </div>
            </div>
            <div className="border border-gray mt-4"/>
            <p className="w-full flex justify-center items-center p-6">
                © Copyright 2023. All rights reserved
            </p>
        </footer>
    )
}