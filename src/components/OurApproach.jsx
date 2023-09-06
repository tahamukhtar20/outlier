import {Briefcase, Gradient, HalfArrow, HalfGear, Shield, Stamp} from "./SharedComponents.jsx";
import Slab from "./Slab.jsx";
import ReviewCard from "./ReviewCard.jsx";
import {AnimatePresence, motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";

export default function OurApproach() {
    const slabs = [
        {
            svg: <Briefcase/>,
            title: "Experience And Aesthetics",
            description:
                "Always working in the balance between User Interface, User Experience and Functionality.",
        },
        {
            svg: <HalfGear/>,
            title: "Latest Technologies",
            description:
                "We always choose the state of the art in terms of tools, so your solutions are future proof.",
        },
        {
            svg: <Shield/>,
            title: "Lean & Transparent Process",
            description:
                "Our methodologies are based on Agile and Lean, giving you control and visibility, but always moving as fast as possible... and beyond.",
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
            image: "https://picsum.photos/200/400",
        },
        {
            name: "lorem ipsum",
            stars: 5,
            review:
                "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            image: "https://picsum.photos/200/800",
        },
        {
            name: "lorem ipsum",
            stars: 5,
            review:
                "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            image: "https://picsum.photos/200/100",
        }, {
            name: "lorem ipsum",
            stars: 5,
            review:
                "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            image: "https://picsum.photos/200/1000",
        },
        {
            name: "lorem ipsum",
            stars: 5,
            review:
                "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            image: "https://picsum.photos/200/900",
        }, {
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
        }, {
            name: "lorem ipsum",
            stars: 5,
            review:
                "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            image: "https://picsum.photos/200/300",
        },
    ];

    const controls = useAnimation();
    const [currentReview, setCurrentReview] = useState(0);
    const [direction, setDirection] = useState(1);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const nextReview = () => {
        if (window.innerWidth >= 1024) {
            if (currentReview === reviews.length - 2) {
                setCurrentReview(0);
            } else if (currentReview === reviews.length - 1) {
                setCurrentReview((currentReview + 2) % reviews.length);
            } else {
                setCurrentReview(currentReview + 1);
            }
        } else if (currentReview === reviews.length - 1) {
            setCurrentReview(0);
        } else {
            setCurrentReview(currentReview + 1);
        }
        setDirection(1);
    };

    const prevReview = () => {
        if (window.innerWidth >= 1024) {
            if (currentReview === 0) {
                setCurrentReview(reviews.length - 2);
            } else if (currentReview === 1) {
                setCurrentReview(reviews.length - 1);
            } else {
                setCurrentReview(currentReview - 1);
            }
        } else if (currentReview === 0) {
            setCurrentReview(reviews.length - 1);
        } else {
            setCurrentReview(currentReview - 1);
        }
        setDirection(-1);
    };

    const reviewsDisplayed = () => {
        if (window.innerWidth >= 1024) {
            return reviews.slice(currentReview, currentReview + 2);
        }
        return reviews.slice(currentReview, currentReview + 1);
    };

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
            <div className="pt-28 flex w-full flex-row items-center lg:gap-8 md:gap-4 gap-2 relative">
                <button
                    type="button"
                    onClick={prevReview}
                    className="lg:p-4 md:p-2 p-1 text-2xl font-semibold rounded-full aspect-square border-2 flex absolute lg:left-0 lg:-translate-x-20 top-0 lg:top-auto lg:right-auto right-0 -translate-x-12 mt-8 gradient-background group bg-cover arrow-buttons"
                >
                    <HalfArrow/>
                </button>
                <div className="flex justify-center items-center gap-8">
                    {reviewsDisplayed().map((review, index) => {
                        return (
                            <AnimatePresence initial={false} custom={currentReview} mode={"wait"}
                                             key={index}
                            >
                                <motion.div
                                    key={currentReview}
                                    initial={{opacity: 0, x: direction === 1 ? 100 : -100}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: direction === 1 ? -100 : 100}}
                                >
                                    <ReviewCard {...review} />
                                </motion.div>
                            </AnimatePresence>

                        );
                    })}
                </div>
                <button
                    type="button"
                    onClick={nextReview}
                    className="lg:p-4 md:p-2 p-1 text-2xl font-semibold rounded-full aspect-square border-2 flex absolute right-0 lg:translate-x-20 rotate-180 top-0 lg:top-auto mt-8 gradient-background group bg-cover arrow-buttons"
                >
                    <HalfArrow/>
                </button>
            </div>
        </motion.div>
    );
}
