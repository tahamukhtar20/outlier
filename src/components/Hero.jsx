import {Arrow, Gears, Gradient, GradientRoundedButton, Stamp, UnderLine} from "./SharedComponents.jsx";
import HeroPng from "../assets/images/Hero.png";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export default function Hero() {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
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
            className="flex xl:flex-row flex-col justify-between items-center h-full w-full gap-8"
            initial={{opacity: 1, y: 100}}
            animate={controls}
            ref={ref}
        >
            <div className="w-fit flex flex-col relative h-full gap-16">
                <div
                    className="flex sm:flex-row flex-col gap-10"
                >
                    <div className="flex lg:max-w-md max-w-xs">
                        <h1
                            className="xl:text-[6.5rem] lg:text-7xl md:text-6xl text-5xl leading-none max-w-md uppercase flex flex-row flex-wrap gap-8 h-fit"
                        >

                            We
                            <span
                                className="flex justify-center items-center xl:max-h-[8rem] lg:max-h-[6rem] md:max-h-[3.75] max-h-[3rem]"
                            >
                                <Gears/>
                            </span>{" "}
                            Create{" "}
                            <Gradient>
                                <span className="font-black italic p-2">Future</span>
                            </Gradient>
                        </h1>
                    </div>
                    <div
                        className="flex flex-col text-xl gap-3 leading-loose 2xl:ml-8"
                    >
                        <h1 className="italic uppercase lg:text-2xl md:text-xl text-lg"
                        >
                            Software & Technology
                        </h1>
                        <p className="max-w-[28rem] flex font-light lg:text-md text-sm"> Disruptive Developers for
                            Disruptive Start-Ups. We make your next Big Move, our Business.
                        </p>
                        <GradientRoundedButton
                            className="flex flex-row gap-4 items-center justify-center w-fit lg:p-5 lg:px-8 p-3 px-4">
                            <span className="font-normal  lg:text-md text-sm">Let's Go!</span>
                            <span className="flex">
                                <Arrow/>
                            </span>
                        </GradientRoundedButton>
                    </div>
                </div>
                <div
                    className="flex -translate-y-1/3 max-w-6xl"
                >
                    <img src={HeroPng} alt="hero-doodle"/>
                </div>
            </div>
            <div
                className="flex xl:flex-col sm:flex-row flex-col xl:-mt-0 sm:-mt-24 -mt-12 gap-8 self-start items-start h-full w-fit">
                {sideLabelData.map((data, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-2 leading-loose"
                    >
                        <h1 className=" lg:text-2xl md:text-xl text-lg font-bold uppercase">{data.title}</h1>
                        <div className="w-20 flex">
                            <UnderLine/>
                        </div>
                        <p className="lg:text-xl md:text-lg text-md italic">{data.label}</p>
                        <p className="sm:max-w-[15.5rem] max-w-full flex font-light lg:text-md text-sm">{data.description}</p>
                    </div>
                ))}
                <div className="flex justify-center w-48"
                >
                    <Stamp/>
                </div>
            </div>
        </motion.div>
    )
}
