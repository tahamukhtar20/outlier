export default function Card({
                                 title,
                                 logo,
                                 description,
                                 link
                             }) {
    return (
        <div
            className="rounded-3xl bg-gray-900 max-w-[26rem] p-14 flex flex-col justify-center items-center gap-4 bg-[rgba(255,255,255,0.1)] hover:border-2 transition-all duration-150 hover:scale-105 z-50">
            <div className="p-8">
                {logo}
            </div>
            <h1 className="font-semibold text-4xl capitalize">{title}</h1>
            <p className="font-normal text-2xl text-gray-400 text-center">{description}</p>
            <a href={link} className="underline text-2xl">Learn More</a>
        </div>
    )
}