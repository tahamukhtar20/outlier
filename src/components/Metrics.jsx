import {Gradient} from "./SharedComponents.jsx";
import ProjectSideGraphics from "../assets/images/ProjectSideGraphics.png";
import ProjectBgGrid from "../assets/images/ProjectBgGrid.png";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export default function Metrics() {
    const metrics = [
        {label: 'Total Projects', value: "90+", color: "from-[#29CCFD] to-[#B228FF]"},
        {label: 'Total Projects', value: "50+", color: "from-[#29CCFD] to-[#B228FF]"},
        {label: 'Total Projects', value: "99%", color: "from-[#29CCFD] to-[#B228FF]"},
        {label: "Surpassed Goals", value: "20%", color: "from-[#29CCFD] to-[#B228FF]"},
        {label: "Customers Funded", value: "73%", color: "from-[#29CCFD] to-[#B228FF]"},
    ];

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
            className="w-full lg:flex flex-row justify-between relative 2xl:mt-[32vh] xl:mt-[20vh] lg:mt-[12vh] md:mt-[8vh] grid grid-cols-6 gap-4"
            initial={{opacity: 0, y: 100}}
            animate={controls}
            ref={ref}
        >
            {metrics.map((metric, index) => (
                <motion.div
                    key={index}
                    className={`w-full h-full flex justify-center items-center  ${index % 2 === 0 ? 'lg:translate-y-[15%]' : 'lg:-translate-y-[15%]'} ${index <= 2 ? 'col-span-2' : 'col-span-3'}`}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: index * 0.2}}
                >
                    <Metric label={metric.label} value={metric.value} color={metric.color}/>
                </motion.div>
            ))}

            <img src={ProjectSideGraphics} alt={"Project Side Graphics"}
                 className="absolute right-0 lg:-translate-y-[30%] -translate-y-1/2 z-0 lg:translate-x-28 sm:translate-x-8 translate-x-4 w-[50vw]"/>
            <img src={ProjectBgGrid} alt={"Project Background Grid"} className="absolute -translate-y-[20%] z-0"/>
        </motion.div>
    );
}

const Metric = ({label, value, color}) => {
    return (
        <div className="lg:aspect-square lg:w-full w-fit flex flex-col gap-4 justify-center items-center">
            <p className="lg:text-6xl text-4xl"><Gradient color={color}>{value}</Gradient></p>
            <p className="lg:text-lg text-md font-normal whitespace-nowrap">{label}</p>
        </div>
    );
}
