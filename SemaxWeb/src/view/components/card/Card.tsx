import type { ReactNode } from 'react';
import classes from './Card.module.css'

interface CardProps {
    icon?: ReactNode,
    title: string,
    description: string,
    index?: number,
}

const Card = ({ icon, title, description, index }: CardProps) => {
    return (
        <article className={classes.card}>
            <div className={classes.top}>
                <div className={classes.icon}>{icon}</div>
                {index !== undefined && (
                    <span className={classes.index}>{String(index + 1).padStart(2, '0')}</span>
                )}
            </div>
            <h3 className={classes.title}>{title}</h3>
            <p className={classes.description}>{description}</p>
        </article>
    )
}

export default Card;
