import {Arrow, Gears, Gradient, GradientRoundedButton, Stamp, UnderLine} from "./SharedComponents.jsx";
import HeroPng from "../assets/images/Hero.png";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export default function Hero() {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const sideLabelData = [
        {
            title: "0 to 100",
            label: "Complete Solutions",
            description: "From idea to prototype and product, we help you get there."
        },
        {
            title: "White Label",
            label: "No Risks",
            description: "We work under strict NDA rules, always being part of your strategy."
        },
        {
            title: "Top Talent",
            label: "Experience at your service",
            description: "A team of technology specialists that will allow faster and bolder moves."
        }
    ]

    const animateIn = async () => {
        await controls.start({opacity: 1, y: 0, transition: {duration: 1}});
    };

    useEffect(() => {
        if (inView) {
            animateIn();
        }
        console.log("inView")
    }, [inView]);


    return (
        <motion.div
            className="flex flex-row justify-between items-center h-full w-full gap-8"
            initial={{opacity: 1, y: 100}}
            animate={controls}
            ref={ref}
        >
            <div className="w-fit flex flex-col relative h-full gap-16">
                <motion.div
                    className="flex flex-row gap-10"
                    initial={{opacity: 0, x: -50}}
                    animate={{opacity: 1, x: 0}}
                >
                    <div className="flex w-1/2">
                        <motion.h1
                            className="text-[8rem] leading-none max-w-md uppercase flex flex-row flex-wrap gap-8"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                        >
                            We
                            <span className="flex justify-center items-center">
                <Gears/>
              </span>{" "}
                            Create{" "}
                            <Gradient>
                                <span className="font-black italic p-2">Future</span>
                            </Gradient>
                        </motion.h1>
                    </div>
                    <motion.div
                        className="flex flex-col text-xl gap-4 leading-loose ml-8"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                    >
                        <motion.h1 className="italic uppercase text-2xl" initial={{opacity: 0}} animate={{opacity: 1}}>
                            Software & Technology
                        </motion.h1>
                        <motion.p className="max-w-[28rem] flex font-light" initial={{opacity: 0}}
                                  animate={{opacity: 1}}>
                            Disruptive Developers for Disruptive Start-Ups. We make your next Big Move, our Business.
                        </motion.p>
                        <GradientRoundedButton
                            className="flex flex-row gap-4 items-center justify-center w-fit p-5 px-8">
                            <span className="font-normal">Let's Go!</span>
                            <span className="flex">
                <Arrow/>
              </span>
                        </GradientRoundedButton>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="flex -translate-y-1/3 max-w-6xl"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    <img src={HeroPng} alt="hero-doodle"/>
                </motion.div>
            </div>
            <div className="flex flex-col gap-8 self-start items-start h-full w-fit">
                {sideLabelData.map((data, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col gap-2 leading-loose"
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: index * 0.2}}
                    >
                        <h1 className="text-3xl font-bold uppercase">{data.title}</h1>
                        <div className="w-20 flex">
                            <UnderLine/>
                        </div>
                        <p className="text-xl italic">{data.label}</p>
                        <p className="max-w-[15.5rem] flex font-light">{data.description}</p>
                    </motion.div>
                ))}
                <motion.div className="flex justify-center w-48" initial={{opacity: 0}} animate={{opacity: 1}}>
                    <Stamp/>
                </motion.div>
            </div>
        </motion.div>
    )
}

const SideLabel = ({
                       title, label, description
                   }) => (
    <div className="flex flex-col gap-2 leading-loose">
        <h1 className="text-3xl font-bold uppercase">{title}</h1>
        <div className="w-20 flex">
            <UnderLine/>
        </div>
        <p className="text-xl italic">{label}</p>
        <p className="max-w-[15.5rem] flex font-light">{description}</p>
    </div>
)

