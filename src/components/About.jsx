import AboutPng from "../assets/images/About.png";
import {Gradient, GradientRoundedButton, Arrow} from "./SharedComponents.jsx";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export default function About() {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
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
            id={"about"}
            className="flex flex-row relative h-fit"
            initial={{opacity: 0, y: 100}}
            animate={controls}
            ref={ref}
        >
            <div className="flex flex-col lg:gap-14 gap-2">
                <motion.h1
                    className="lg:text-8xl md:text-6xl text-5xl"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    About beyond{" "}
                    <Gradient direction="left">
                        <span className="font-black">Humans</span>
                    </Gradient>
                </motion.h1>
                <motion.p
                    className="lg:max-w-3xl lg:text-2xl text-xl p-4 pl-0 leading-snug flex flex-col gap-4 z-50"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    <span>Having experience as previous Start-up founders, we found that for most of today&apos;s projects, an IT Team was mandatory. This leaves a lot of great ideas between a rock and a hard place, were they need to choose to wait and possibly lost the opportunity or to expend a huge amount of resources building an internal team.</span>
                    <span>The solution was clear for us, but not easy to step up, as we choose to maintain a high-level of secrecy on our customers requirements and solutions. Keeping us in a position were we can&apos;t show a track record of previous projects.</span>
                    <span>We created Outlier to be part of the challenge, based on our will and desire to have an impact on future companies. We share the ride with all kind of companies that defy the status-quo.</span>
                </motion.p>
            </div>
            <div
                className="absolute blur-3xl xl:blur-0 top-[10%] 2xl:top-0 right-0 lg:translate-x-28 sm:translate-x-8 translate-x-4 w-[58%] flex">
                <motion.img
                    src={AboutPng}
                    alt="about-doodle"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                />
            </div>
        </motion.div>
    );
}
