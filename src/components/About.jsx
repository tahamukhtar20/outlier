import AboutPng from "../assets/images/About.png";
import {Gradient} from "./SharedComponents.jsx";

export default function About() {
    return (
        <div className="flex flex-row relative min-h-screen">
            <div className="flex flex-col gap-14">
                <h1 className="text-[6.5rem]">About beyond <Gradient direction="left"><span
                    className="font-black">Humans</span></Gradient>
                </h1>
                <p className="max-w-3xl text-2xl leading-snug font-sans flex flex-col gap-4">
                    <span>
                    Having experience as previous Start-up founders, we found that for most of today&apos;s projects, an IT
                    Team was mandatory. This leaves a lot of great ideas between a rock and a hard place, were they need
                    to choose to wait and possibly lost the opportunity or to expend a huge amount of resources building
                    an internal team.
                    </span>
                    <span>
                    The solution was clear for us, but not easy to step up, as we choose to maintain a high-level of
                    secrecy on our customers requirements and solutions. Keeping us in a position were we can&apos;t show a
                    track record of previous projects.
                    </span>
                    <span>
                    We created Outlier to be part of the challenge, based on our will and desire to have an impact
                    on future companies. We share the ride with all kind of companies that defy the status-quo.
                    </span>
                </p>
            </div>
            <div className="absolute flex top-0 right-0 translate-x-28 w-[58%]">
                <img src={AboutPng} alt="about-doodle"/>
            </div>
        </div>)
}