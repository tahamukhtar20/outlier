import {Gradient, GradientRoundedButton, HalfArrow, Stamp} from "./SharedComponents.jsx";
import Slab from "./Slab.jsx";
import ReviewCard from "./ReviewCard.jsx";

export default function OurApproach() {
    const slabs = [{
        svg: <Stamp/>,
        title: "lorem ipsum",
        description: "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
    }, {
        svg: <Stamp/>,
        title: "lorem ipsum",
        description: "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
    }, {
        svg: <Stamp/>,
        title: "lorem ipsum",
        description: "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
    }];
    const reviews = [{
        name: "lorem ipsum",
        stars: 5,
        review: "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        image: "https://picsum.photos/200/300",
    }, {
        name: "lorem ipsum",
        stars: 5,
        review: "lorem ipsum dolor sit amet, consectetu adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        image: "https://picsum.photos/200/300",
    }];
    return (
        <div className="py-8 flex flex-col justify-center items-center w-full h-full gap-8 relative">
            <h1 className="font-black text-8xl uppercase">Our <Gradient direction="left">Approach</Gradient></h1>
            <p className="font-normal text-2xl text-center max-w-[90rem]">
                We take our clients privacy, very seriously, so we don´t share any details on past projects. But we can
                talk in-depth about the solutions we worked on, and we will be open to show our skills for reassurance.
            </p>
            <div className="flex flex-col justify-center items-center gap-12 w-full">
                {slabs.map((slab, index) => {
                    return (
                        <Slab key={index} {...slab}/>
                    )
                })}
            </div>
            <div className="pt-28 flex w-full flex-row items-center gap-8 relative">
                <button
                    className="p-4 text-2xl font-semibold rounded-full aspect-square border-2 flex absolute right-0 translate-x-20 rotate-180">
                    <HalfArrow/>
                </button>
                {reviews.map((review, index) => {
                    return (
                        <ReviewCard key={index} {...review}/>
                    )
                })}
                <button
                    className="p-4 text-2xl font-semibold rounded-full aspect-square border-2 flex absolute left-0 -translate-x-20">
                    <HalfArrow/>
                </button>
            </div>

        </div>
    )
}