import { Link } from "react-router-dom";
import classes from './NavButton.module.css'

interface NavButtonProps {
    path: string,
    children: string
}

const NavButton = ({ path, children }: NavButtonProps) => {
    return (
        <Link to={path}>
            <p className={classes.text}>{children}</p>
        </Link>
    )
}

export default NavButton;