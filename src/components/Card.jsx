export default function Card({
                                 title,
                                 logo,
                                 description,
                                 link
                             }) {
    return (
        <div
            className="rounded-3xl w-fit h-fit lg:p-14 md:p-10 p-8 flex flex-col justify-center items-center gap-4 bg-[rgba(255,255,255,0.1)] z-50">
            <div className="lg:p-8 md:p-6 p-4">
                {logo}
            </div>
            <h1 className="font-semibold lg:text-4xl md:text-3xl text-2xl capitalize">{title}</h1>
            <p className="font-normal lg:text-2xl text-xl text-gray-400 text-center">{description}</p>
            <a href={link} className="underline lg:text-2xl text-xl">Learn More</a>
        </div>
    )
}