import {Gradient, GradientRoundedButton} from "./SharedComponents.jsx";
import Project from "../assets/images/Project.png";

export default function OurTeam() {
    return (
        <div className="flex flex-row pt-32 relative">
            <div className="flex flex-col items-center justify-center w-1/2"/>
            <div className="flex flex-col leading-tight w-1/2 text-8xl">
                <h1>Our Team,</h1>
                <h2>Your <Gradient><span className="font-extrabold">Projects</span></Gradient></h2>
                <p className="text-2xl max-w-2xl py-8">We work as a White-Label firm, closing the details of our work
                    with
                    you
                    with and
                    NDA, and being part
                    of your project from Pitch to Funding.</p>
                <GradientRoundedButton className="w-fit text-xl p-6 px-14">Read More</GradientRoundedButton>
            </div>
            <img src={Project} alt={"Project Hand"} className="absolute left-0 -translate-x-28 flex w-1/2 pt-14"/>
        </div>
    );
}