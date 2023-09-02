import {Gradient} from "./SharedComponents.jsx";
import ProjectSideGraphics from "../assets/images/ProjectSideGraphics.png";
import ProjectBgGrid from "../assets/images/ProjectBgGrid.png";

export default function Metrics() {
    const metrics = [
        {label: 'Total Projects', value: "90+", color: "from-[#29CCFD] to-[#B228FF]"},
        {label: 'Total Projects', value: "50+", color: "from-[#29CCFD] to-[#B228FF]"},
        {label: 'Total Projects', value: "99%", color: "from-[#29CCFD] to-[#B228FF]"},
        {label: "Surpassed Goals", value: "20%", color: "from-[#29CCFD] to-[#B228FF]"},
        {label: "Customers Funded", value: "73%", color: "from-[#29CCFD] to-[#B228FF]"},
    ]
    return (
        <div className="w-full flex flex-row justify-between relative pt-28">
            {metrics.map((metric, index) => (
                <Metric key={index} label={metric.label} value={metric.value} color={metric.color}/>
            ))}
            <img src={ProjectSideGraphics} alt={"Project Side Graphics"}
                 className="absolute right-0 translate-x-28 -translate-y-[30%]"/>
            <img src={ProjectBgGrid} alt={"Project Background Grid"} className="absolute -translate-y-[20%]"/>
        </div>
    );
}


const Metric = ({label, value, color}) => {
    return (
        <div className="aspect-square w-28 flex flex-col gap-4">
            <p className="text-6xl"><Gradient color={color}>{value}</Gradient></p>
            <p className="text-lg font-normal whitespace-nowrap">{label}</p>
        </div>
    );
}