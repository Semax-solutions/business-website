import { Link } from "react-router-dom";
import classes from './NavButton.module.css'

interface NavButtonProps {
    path: string,
    children: string
}

const NavButton = ({ path, children }: NavButtonProps) => {
    return (
        <div className={classes.button}>
            <Link to={path}>
                <p className={classes.text}>{children}</p>
            </Link>
        </div>
    )
}

export default NavButton;