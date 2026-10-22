import type { ComponentType, ReactNode, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChevronDownIcon } from '../../../../assets/Icons';
import classes from './ButtonLink.module.css';

interface ButtonLinkProps {
    /** In-app paths ("/#contact") use the router; anything else (mailto:, https:) is a plain anchor. */
    href: string;
    children: ReactNode;
    variant?: 'primary' | 'ghost';
    size?: 'md' | 'sm';
    icon?: ComponentType<SVGProps<SVGSVGElement>> | null;
    onClick?: () => void;
}

const ButtonLink = ({ href, children, variant = 'primary', size = 'md', icon: Icon = ArrowRightIcon, onClick }: ButtonLinkProps) => {
    const className = `${classes.button} ${classes[variant]} ${size === 'sm' ? classes.small : ''}`;
    // hover nudge in the direction the icon points; other icons (mail) stay put
    const nudge = Icon === ArrowRightIcon ? classes.nudgeRight : Icon === ChevronDownIcon ? classes.nudgeDown : '';
    const content = (
        <>
            <span>{children}</span>
            {Icon && <Icon className={`${classes.icon} ${nudge}`} aria-hidden="true" />}
        </>
    );

    if (href.startsWith('/')) {
        return <Link to={href} className={className} onClick={onClick}>{content}</Link>;
    }
    return <a href={href} className={className} onClick={onClick}>{content}</a>;
};

export default ButtonLink;
