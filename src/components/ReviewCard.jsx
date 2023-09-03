import {Star} from "./SharedComponents.jsx";

export default function ReviewCard({name, stars, review, image}) {
    return (
        <div className="w-1/2 h-80 flex flex-col rounded-3xl bg-[rgba(255,255,255,0.1)] p-8 gap-8 justify-center">
            <div className="flex flex-row gap-6">
                <div className="rounded-full aspect-square h-28" style={{
                    backgroundImage: `url(${image})`,
                }}></div>
                <div className="flex justify-center flex-col gap-3">
                    <p className="uppercase font-normal text-4xl">{name}</p>
                    <div className="flex flex-row gap-1">
                        {[...Array(stars)].map((star, index) => {
                            return (
                                <Star/>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="">
                <p>{review}</p>
            </div>
        </div>
    )
}