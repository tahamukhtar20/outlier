import {GradientRoundedButton, Instagram, Linkedin, Logo, Twitter} from "./SharedComponents.jsx";

export default function Footer() {
    const Logos = [
        <Linkedin/>,
        <Instagram/>,
        <Twitter/>,
    ]
    return (
        <footer className="2xl:px-28 lg:p-10 sm:p-8 p-4 w-full border border-x-0" id="footer">
            <div className="flex lg:flex-row flex-col lg:justify-between">
                <div className="py-4 pb-10">
                    <div className="flex lg:w-36 sm:w-20 w-16 ml-2 aspect-square">
                        <Logo/>
                    </div>
                    <p className={"2xl:max-w-5xl xl:max-w-4xl lg:max-w-3xl w-full lg:text-2xl md:text-xl text-lg text-gray-300"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lorem risus, ullamcorper vel
                        bibendum
                        sed, egestas imperdiet metus. Duis mattis massa eget augue semper, id volutpat dui dictum.
                        Integer
                        ultricies non ex eu dapibus.
                    </p>
                </div>
                <div className="lg:self-center self-start lg:text-xl md:text-lg text-md">
                    <ul className="flex sm:flex-row flex-col lg:gap-6 gap-4">
                        <li><a href="#">Home</a></li>
                        <li><a href="#about">About me</a></li>
                        <li><a href="/contact">Contact me</a></li>
                    </ul>
                    <ul className="flex flex-row gap-5 lg:justify-end justify-start pt-10">
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
