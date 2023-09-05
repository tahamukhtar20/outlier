import {Gradient, HalfArrow, Stamp} from "./SharedComponents.jsx";
import Slab from "./Slab.jsx";
import ReviewCard from "./ReviewCard.jsx";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export default function OurApproach() {
    const slabs = [
        {
            svg: <Stamp/>,
            title: "lorem ipsum",
            description:
                "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        },
        {
            svg: <Stamp/>,
            title: "lorem ipsum",
            description:
                "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        },
        {
            svg: <Stamp/>,
            title: "lorem ipsum",
            description:
                "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        },
    ];
    const reviews = [
        {
            name: "lorem ipsum",
            stars: 5,
            review:
                "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            image: "https://picsum.photos/200/300",
        },
        {
            name: "lorem ipsum",
            stars: 5,
            review:
                "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            image: "https://picsum.photos/200/300",
        },
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
            className="py-8 flex flex-col justify-center items-center w-full h-full gap-8 relative"
            initial={{opacity: 0, y: 100}}
            animate={controls}
            ref={ref}
        >
            <h1 className="font-black lg:text-8xl md:text-6xl text-5xl lg:text-center text-start w-full uppercase">
                Our <Gradient direction="left">Approach</Gradient>
            </h1>
            <p className="font-normal lg:text-2xl text-xl lg:text-center text-start max-w-[90rem]">
                We take our clients' privacy very seriously, so we don't share any details on past projects. But we can
                talk in-depth about the solutions we worked on, and we will be open to show our skills for reassurance.
            </p>
            <div className="flex flex-col justify-center items-center lg:gap-12 md:gap-8 gap-4 w-full">
                {slabs.map((slab, index) => {
                    return <Slab key={index} {...slab} />;
                })}
            </div>
            {/*<div className="pt-28 flex w-full flex-row items-center gap-8 relative">*/}
            {/*    <button*/}
            {/*        className="p-4 text-2xl font-semibold rounded-full aspect-square border-2 flex absolute right-0 translate-x-20 rotate-180">*/}
            {/*        <HalfArrow/>*/}
            {/*    </button>*/}
            {/*    {reviews.map((review, index) => {*/}
            {/*        return <ReviewCard key={index} {...review} />;*/}
            {/*    })}*/}
            {/*    <button*/}
            {/*        className="p-4 text-2xl font-semibold rounded-full aspect-square border-2 flex absolute left-0 -translate-x-20">*/}
            {/*        <HalfArrow/>*/}
            {/*    </button>*/}
            {/*</div>*/}
        </motion.div>
    );
}
