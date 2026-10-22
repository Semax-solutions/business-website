import LogoMark from '../../../assets/logo-mark.svg?react';
import classes from './Logo.module.css';

interface LogoProps {
    className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
    return (
        <span className={`${classes.logo} ${className}`}>
            <LogoMark className={classes.mark} aria-hidden="true" />
            <span className={classes.wordmark}>
                <span className={classes.name}>SEMAX</span>
                <span className={classes.suffix}>Solutions</span>
            </span>
        </span>
    );
};

export default Logo;
