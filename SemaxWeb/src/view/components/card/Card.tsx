import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { reveal } from '../../animations/reveal';
import classes from './Card.module.css'

interface CardProps {
    /** anchor id, so links (e.g. in the footer) can point at this card */
    id?: string,
    icon?: ReactNode,
    title: string,
    description: string,
    /** position in a numbered list, shown as a small "01" label */
    number?: number,
    /** entrance delay in seconds, used to stagger cards in the same row */
    delay?: number,
}

const Card = ({ id, icon, title, description, number, delay = 0 }: CardProps) => {
    return (
        <motion.article id={id} className={classes.card} {...reveal(delay)}>
            {icon && <div className={classes.icon}>{icon}</div>}
            {number !== undefined && (
                <span className={classes.number} aria-hidden='true'>{String(number).padStart(2, '0')}</span>
            )}
            <h3 className={classes.title}>{title}</h3>
            <p className={classes.description}>{description}</p>
        </motion.article>
    )
}

export default Card;
