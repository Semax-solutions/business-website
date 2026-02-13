import type { ReactNode } from 'react';
import classes from './Card.module.css'
import { motion, type Variants } from 'framer-motion'
interface CardProps {
    icon?: ReactNode,
    title: string,
    description: string,
}

const Card = ({ icon, title, description }: CardProps) => {
    return (
        <motion.div 
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.6 }}
        >
          <div className={classes.card}>
              <div className={classes.icon}>
                  {icon}
              </div>
              <h4 className={classes.title}>{title}</h4>
              <p className={classes.description}>{description}</p>
          </div>
        </motion.div>
    )
}

const cardVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 100
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

export default Card;