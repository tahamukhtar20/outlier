import {Gradient, GradientRoundedButton, Playbutton} from "./SharedComponents.jsx";
import ThunderDoodle from "../assets/images/ThunderDoodle.png";
import ProjectSCImage from "../assets/images/ProjectSCImage.png";
import ProjectSC01Graphics from "../assets/images/ProjectSC01Graphics.png";

export default function ProjectSC() {
    return (
        <div className="font-black py-8 flex flex-row relative">
            <div className="w-2/5 flex flex-col gap-10 justify-center ">
                <h1 className="text-8xl">Project <Gradient>SC 01</Gradient></h1>
                <p className="max-w-3xl font-normal text-2xl">A sample of our abilities for you to watch, but feel free
                    to contact
                    us
                    for
                    more in-depth information
                    or special implementations.</p>
            </div>
            <div className="w-3/5 border-2 h-[50rem] rounded-3xl p-8 translate-x-28 rounded-r-none pr-0 border-r-0">
                <div className="w-full h-full rounded-3xl border-2 p-8 rounded-r-none pr-0 border-r-0">

                    <div
                        className="w-full h-full rounded-3xl relative flex justify-center items-center pr-0"
                        style={
                            {
                                backgroundImage: `url(${ProjectSCImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }

                        }>
                        <img src={ThunderDoodle}
                             className="absolute top-0 left-0 h-64 flex -translate-y-1/2 -translate-x-1/2"
                             alt="ThunderDoodle"/>
                        <div className="h-32 bg-[rgba(0,0,0,0.5)] z-0 aspect-square flex justify-center items-center">
                            <Playbutton/>
                        </div>
                    </div>
                </div>
            </div>
            <img src={ProjectSC01Graphics} alt="ProjectSC01Graphics"
                 className="-translate-x-28 absolute"/>
        </div>
    )
}