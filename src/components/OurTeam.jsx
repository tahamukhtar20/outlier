import {Gradient, GradientRoundedButton} from "./SharedComponents.jsx";
import Project from "../assets/images/Project.png";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export default function OurTeam() {
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
            className="flex flex-row relative z-50"
            initial={{opacity: 0, y: 100}}
            animate={controls}
            ref={ref}
            id={"team"}
        >
            <div className="xl:flex hidden flex-col items-center justify-center w-1/2"/>
            <div className="flex flex-col leading-tight xl:w-1/2 w-full lg:text-8xl md:text-6xl text-5xl">
                <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}}>
                    Our Team,
                </motion.h1>
                <motion.h2 initial={{opacity: 0}} animate={{opacity: 1}}>
                    Your <Gradient><span className="font-extrabold">Projects</span></Gradient>
                </motion.h2>
                <motion.p
                    className="lg:text-2xl text-xl lg:max-w-2xl py-8"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    We work as a White-Label firm, closing the details of our work with you with an NDA, and being part
                    of your project from Pitch to Funding.
                </motion.p>
                <GradientRoundedButton className="w-fit lg:text-xl lg:p-6 lg:px-14 p-4 px-10 text-lg">
                    Read More
                </GradientRoundedButton>
            </div>
            <motion.img
                src={Project}
                alt={"Project Hand"}
                className="absolute blur-3xl xl:blur-0 left-0 lg:-translate-x-28 top-[10%] sm:-translate-x-8 -translate-x-4 flex w-1/2 pt-14"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
            />
        </motion.div>
    );
}
