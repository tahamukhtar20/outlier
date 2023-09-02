import {Arrow, Gears, Gradient, GradientRoundedButton, Stamp, UnderLine} from "./SharedComponents.jsx";
import HeroPng from "../assets/images/Hero.png";

export default function Hero() {
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


    return (
        <div className="flex flex-row justify-center items-center h-full w-full">
            <div className="w-4/5 flex flex-col relative h-full gap-10">
                <div className="flex flex-row">
                    <div className="flex w-1/2">
                        <h1 className="text-9xl max-w-md uppercase flex flex-row flex-wrap gap-8">We<span
                            className="flex justify-center items-center"><Gears/></span> Create <Gradient><span
                            className="font-black italic p-2">Future</span></Gradient>
                        </h1>
                    </div>
                    <div className="flex flex-col text-xl gap-4 leading-loose">
                        <h1 className="italic uppercase text-2xl">Software & Technology</h1>
                        <p className="max-w-[28rem] flex font-light">Disruptive Developers for Disruptive Start-Ups. We
                            make your next Big Move, our Business.</p>
                        <GradientRoundedButton
                            className="flex flex-row gap-4 items-center justify-center w-fit p-5 px-8">
                            <span className="font-normal">Let's Go!</span>
                            <span className="flex"><Arrow/></span>
                        </GradientRoundedButton>
                    </div>
                </div>
                <div className="flex -translate-y-1/3 max-w-7xl">
                    <img src={HeroPng} alt="hero-doodle"/>

                </div>
            </div>
            <div className="flex flex-col gap-8 self-start justify-end items-start h-full w-fit">
                {sideLabelData.map((data, index) => (
                    <SideLabel key={index} {...data}/>
                ))}
                <div className="flex justify-center w-full">
                    <Stamp/>
                </div>
            </div>
        </div>
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

