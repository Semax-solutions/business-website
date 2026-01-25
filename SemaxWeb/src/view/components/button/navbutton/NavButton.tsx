import { Link } from "react-router-dom";
import classes from './NavButton.module.css'

interface NavButtonProps {
    path: string,
    children: string,
    color?: string
}

const NavButton = ({ path, children, color }: NavButtonProps) => {
    return (
        <Link to={path.toLocaleLowerCase()}>
            <p className={classes.text} style={{color: color}}>{children}</p>
        </Link>
    )
}

export default NavButton;