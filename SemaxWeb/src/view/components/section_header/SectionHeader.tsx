import { motion } from 'motion/react';
import { reveal } from '../../animations/reveal';
import classes from './SectionHeader.module.css';

interface SectionHeaderProps {
    eyebrow: string;
    title: string;
    /** id for the h2, so the section can reference it with aria-labelledby */
    titleId: string;
    intro?: string;
    align?: 'center' | 'start';
    className?: string;
}

const SectionHeader = ({ eyebrow, title, titleId, intro, align = 'center', className = '' }: SectionHeaderProps) => {
    return (
        <motion.div className={`${classes.header} ${align === 'center' ? classes.center : ''} ${className}`} {...reveal()}>
            <p className={classes.eyebrow}>{eyebrow}</p>
            <h2 id={titleId} className={classes.title}>{title}</h2>
            {intro && <p className={classes.intro}>{intro}</p>}
        </motion.div>
    );
};

export default SectionHeader;
