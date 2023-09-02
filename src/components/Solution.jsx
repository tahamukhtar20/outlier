import {Gradient, ResearchAndDevelopment} from "./SharedComponents.jsx";
import Card from "./Card.jsx";

export default function Solution() {
    const cards = [
        {
            title: "lorem ipusm",
            logo: <ResearchAndDevelopment/>,
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: ""
        }, {
            title: "lorem ipusm",
            logo: <ResearchAndDevelopment/>,
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: ""
        }, {
            title: "lorem ipusm",
            logo: <ResearchAndDevelopment/>,
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: ""
        }, {
            title: "lorem ipusm",
            logo: <ResearchAndDevelopment/>,
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: ""
        },
    ]
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen gap-8">
            <h1 className="text-[6.5rem]">
                <Gradient><span className="font-black">Solution</span></Gradient> & Focus Area
            </h1>
            <ul className="grid grid-cols-4 w-full pt-10 z-50">
                {cards.map((card, index) => (
                    <li key={index}>
                        <Card  {...card}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}
