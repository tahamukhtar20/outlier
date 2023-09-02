import {GradientRoundedButton, Instagram, Linkedin, Logo, Twitter} from "./SharedComponents.jsx";

export default function Footer() {
    const Logos = [
        <Linkedin/>,
        <Instagram/>,
        <Twitter/>,
    ]
    return (
        <footer className="px-28 p-10 w-full border border-x-0">
            <div className="flex flex-row justify-between">
                <div className="py-4 pb-10">
                    <div className="flex w-36 ml-2 aspect-square">
                        <Logo/>
                    </div>
                    <p className={"max-w-5xl text-2xl text-gray-300"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lorem risus, ullamcorper vel
                        bibendum
                        sed, egestas imperdiet metus. Duis mattis massa eget augue semper, id volutpat dui dictum.
                        Integer
                        ultricies non ex eu dapibus.
                    </p>
                </div>
                <div className="self-center text-xl">
                    <ul className="flex flex-row gap-10">
                        <li><a href="#">Home</a></li>
                        <li><a href="#about">About me</a></li>
                        <li><a href="#contact">Contact me</a></li>
                    </ul>
                    <ul className="flex flex-row gap-5 justify-end pt-10">
                        {Logos.map((logo, index) => (
                            <li key={index}>
                                <GradientRoundedButton className="w-14 aspect-square flex justify-center items-center">
                                    {logo}
                                </GradientRoundedButton>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="border border-gray-500 mt-4"/>
            <p className="w-full flex justify-center items-center p-6 text-lg">
                © Copyright 2023. All rights reserved
            </p>
        </footer>
    )
}
