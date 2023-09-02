import {ReactComponent as LogoComponent} from "../assets/images/SVG/Logo.svg"
import {ReactComponent as StampComponent} from "../assets/images/SVG/Stamp.svg"
import {ReactComponent as UnderLineComponent} from "../assets/images/SVG/Underline.svg"
import {ReactComponent as GearsComponent} from "../assets/images/SVG/Gears.svg"
import {ReactComponent as ArrowComponent} from "../assets/images/SVG/Arrow.svg";

export const Logo = () => <LogoComponent/>
export const Stamp = () => <StampComponent/>
export const UnderLine = () => <UnderLineComponent/>
export const Gears = () => <GearsComponent/>
export const Arrow = () => <ArrowComponent/>
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