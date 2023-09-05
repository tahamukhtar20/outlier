import {Gradient, GradientRoundedButton, Playbutton} from "./SharedComponents.jsx";
import ThunderDoodle from "../assets/images/ThunderDoodle.png";
import ProjectSCImage from "../assets/images/ProjectSCImage.png";
import ProjectSC01Graphics from "../assets/images/ProjectSC01Graphics.png";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export default function ProjectSC() {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const animateIn = async () => {
        await controls.start({opacity: 1, y: 0, transition: {duration: 1}});
    };

    useEffect(() => {
        if (inView) {
            animateIn();
        }
    }, [inView]);

    return (
        <motion.div
            className="font-black py-8 flex lg:flex-row flex-col relative lg:gap-1 gap-14 mt-20"
            initial={{opacity: 0, y: 100}}
            animate={controls}
            ref={ref}
        >
            <div className="lg:w-2/5 w-full flex flex-col gap-10 justify-center">
                <h1 className="lg:text-8xl md:text-6xl text-5xl">
                    Project <Gradient>SC 01</Gradient>
                </h1>
                <p className="max-w-3xl font-normal lg:text-2xl text-xl">
                    A sample of our abilities for you to watch, but feel free to contact us for more in-depth
                    information or special implementations.
                </p>
            </div>
            <div
                className="lg:w-3/5 w-full h-full border-2 aspect-[4/3] rounded-3xl lg:p-8 md:p-4 p-2 lg:translate-x-28 lg:rounded-r-none lg:pr-0 lg:border-r-0 ">
                <div
                    className="w-full h-full flex rounded-3xl border-2 lg:p-8 md:p-4 p-2 lg:rounded-r-none lg:pr-0 lg:border-r-0">
                    <div
                        className="w-full h-full rounded-3xl relative flex justify-center items-center lg:pr-0 aspect-[4/3]"
                        style={{
                            backgroundImage: `url(${ProjectSCImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <img
                            src={ThunderDoodle}
                            className="absolute top-0 left-0 lg:h-64 md:h-40 h-32 flex -translate-y-1/2 -translate-x-1/2"
                            alt="ThunderDoodle"
                        />
                        <div className="h-32 bg-[rgba(0,0,0,0.5)] z-0 aspect-square flex justify-center items-center">
                            <Playbutton/>
                        </div>
                    </div>
                </div>
            </div>
            <img
                src={ProjectSC01Graphics}
                alt="ProjectSC01Graphics"
                className="lg:-translate-x-28 sm:-translate-x-8 -translate-x-4 absolute w-1/2 z-[-99]"
            />
        </motion.div>
    );
}
