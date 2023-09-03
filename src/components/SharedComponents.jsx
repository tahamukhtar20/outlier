export {ReactComponent as Logo} from "../assets/images/SVG/Logo.svg"
export {ReactComponent as Stamp} from "../assets/images/SVG/Stamp.svg"
export {ReactComponent as UnderLine} from "../assets/images/SVG/Underline.svg"
export {ReactComponent as Gears} from "../assets/images/SVG/Gears.svg"
export {ReactComponent as Arrow} from "../assets/images/SVG/Arrow.svg";
export {ReactComponent as Linkedin} from "../assets/images/SVG/Linkedin.svg";
export {ReactComponent as Twitter} from "../assets/images/SVG/Instagram.svg";
export {ReactComponent as Instagram} from "../assets/images/SVG/Twitter.svg";
export {ReactComponent as ResearchAndDevelopment} from "../assets/images/SVG/ResearchAndDevelopment.svg";
export {ReactComponent as Playbutton} from "../assets/images/SVG/Playbutton.svg";
export {ReactComponent as GearAndBrowser} from "../assets/images/SVG/GearAndBrowser.svg";
export {ReactComponent as HandAndGear} from "../assets/images/SVG/HandAndGear.svg";
export {ReactComponent as CloudComputing} from "../assets/images/SVG/CloudComputing.svg";
export {ReactComponent as Star} from "../assets/images/SVG/Star.svg";
export {ReactComponent as HalfArrow} from "../assets/images/SVG/HalfArrow.svg";

export const Gradient = ({children, direction, color}) => (
    <span
        className={`bg-clip-text text-transparent ${direction === "left" ? "bg-gradient-to-l" : "bg-gradient-to-r"} ${color ? color : "from-[#29CCFD] to-[#B228FF]"}`}>
        {children}
    </span>
)
export const GradientRoundedButton = ({children, className, ...props}) => (
    <button {...props}
            className={`gradient-border ${className}`}>
        {children}
    </button>
)
