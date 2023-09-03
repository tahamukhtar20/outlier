export default function Slab({svg, title, description}) {
    return (
        <div className="w-full h-60 flex flex-row justify-center items-center bg-[rgba(255,255,255,0.1)] rounded-3xl">
            <div className="w-1/5 flex justify-center items-center">
                <div className="flex justify-center items-center aspect-square">
                    {svg}
                </div>
            </div>
            <div className="w-4/5 flex flex-col gap-8">
                <h1 className="text-3xl font-semibold capitalize">{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}