import {CloudComputing, GearAndBrowser, Gradient, HandAndGear, ResearchAndDevelopment} from "./SharedComponents.jsx";
import Card from "./Card.jsx";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export default function Solution() {
    const cards = [
        {
            title: "Research And Development",
            logo: <ResearchAndDevelopment/>,
            description:
                "From the idea, we take care of the process until you get a materialized version of it.",
            link: "",
        },
        {
            title: "Software Development",
            logo: <GearAndBrowser/>,
            description:
                "You need and app? A game? A site?. We've got you covered.",
            link: "",
        },
        {
            title: "IT Management",
            logo: <HandAndGear/>,
            description:
                "We bring the right people together for your project.",
            link: "",
        },
        {
            title: "Cloud Computing",
            logo: <CloudComputing/>,
            description:
                "Anywhere, anytime. We make our solutions available for you, no limits.",
            link: "",
        },
    ];

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
            className="flex flex-col items-center justify-center w-full h-fit gap-8"
            initial={{opacity: 0, y: 100}}
            animate={controls}
            ref={ref}
        >
            <h1 className="lg:text-8xl md:text-6xl text-5xl">
                <Gradient>
                    <span className="font-black">Solution</span>
                </Gradient>{" "}
                & Focus Area
            </h1>
            <ul className="grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center gap-8 w-full pt-10 z-50">
                {cards.map((card, index) => (
                    <li
                        key={index}
                    >
                        <Card {...card} />
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
