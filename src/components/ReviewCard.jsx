import {Star} from "./SharedComponents.jsx";

export default function ReviewCard({name, stars, review, image}) {
    return (
        <div
            className="w-full min-h-80 h-fit flex flex-col rounded-3xl bg-[rgba(255,255,255,0.1)] lg:p-8 p-4 gap-8 justify-center gradient-background transition-all duration-200 ease-in">
            <div className="flex flex-row gap-6">
                <div className="rounded-full aspect-square h-28" style={{
                    backgroundImage: `url(${image})`,
                }}></div>
                <div className="flex justify-center flex-col gap-3">
                    <p className="uppercase font-normal lg:text-4xl md:text-2xl text-xl">{name}</p>
                    <div className="flex flex-row gap-1">
                        {[...Array(stars)].map((star, index) => {
                            return (
                                <Star key={index}/>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="lg:text-lg text-md">
                <p>{review}</p>
            </div>
        </div>
    )
}