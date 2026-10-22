import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import classes from './NavButton.module.css'

interface NavButtonProps {
    path: string,
    children: ReactNode,
    variant?: 'bar' | 'menu',
    onClick?: () => void,
}

const NavButton = ({ path, children, variant = 'bar', onClick }: NavButtonProps) => {
    return (
        <Link to={path} className={`${classes.link} ${classes[variant]}`} onClick={onClick}>
            {children}
        </Link>
    )
}

export default NavButton;
