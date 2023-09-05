export default function Slab({svg, title, description}) {
    return (
        <div
            className="w-full min-h-60 flex flex-row justify-center items-center bg-[rgba(255,255,255,0.1)] rounded-3xl gap-4 p-3 py-5"
        >
            <div className="w-1/5 flex justify-center items-center">
                <div className="flex justify-center items-center aspect-square w-full">
                    {svg}
                </div>
            </div>
            <div className="w-4/5 flex flex-col lg:gap-8 gap-4">
                <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold capitalize">{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}