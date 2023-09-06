import {GradientRoundedButton} from "./SharedComponents.jsx";

export default function Card({
                                 title,
                                 logo,
                                 description,
                                 link
                             }) {
    return (
        <GradientRoundedButton
            className={"w-full h-full  before:!rounded-3xl gradient-border-card transition-all hover:scale-110 duration-500 ease-in-out group"}>
            <div
                className="rounded-3xl max-w-[20rem] h-[38rem] min-h-fit lg:p-14 md:p-10 p-8 flex flex-col justify-center items-center gap-4 bg-[rgba(255,255,255,0.1)] z-50 transform transition-transform duration-300 ease-in-out group">
                <div className="lg:p-8 md:p-6 p-4">
                    {logo}
                </div>
                <h1 className="font-semibold lg:text-4xl md:text-3xl text-2xl capitalize">{title}</h1>
                <p className="font-normal lg:text-2xl text-xl text-gray-400 text-center">{description}</p>
                <a href={link} className="underline lg:text-2xl text-xl">Learn More</a>
            </div>
        </GradientRoundedButton>
    )
}
