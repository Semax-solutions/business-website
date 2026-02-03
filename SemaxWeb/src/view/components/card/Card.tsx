import type { ReactNode } from 'react';
import classes from './Card.module.css'

interface CardProps {
    icon?: ReactNode,
    title: string,
    description: string,
}

const Card = ({ icon, title, description }: CardProps) => {
    return (
        <div className={classes.card}>
            <div className={classes.icon}>
                {icon}
            </div>
            <h4 className={classes.title}>{title}</h4>
            <p className={classes.description}>{description}</p>
        </div>
    )
}

export default Card;