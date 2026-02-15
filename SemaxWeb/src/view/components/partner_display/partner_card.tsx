import { motion, type Variants } from 'motion/react';
import styles from './partner_card.module.css';

interface PartnerProps {
    logoUrl: string;
    name: string;
    description: string;
    link?: string;
}

const PartnerCard = ({logoUrl, name, description, link}: PartnerProps) => {
  


    return (
        <motion.div 
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.4 }}
            className={styles.container}>
            <div className={styles.card} onClick={() => link && window.open(link, '_blank')}>
                <div className={styles.logoContainer}>
                    <img src={logoUrl} alt={name + " logo"} className={styles.logo} />
                </div>

                <h3 className={styles.partnerName}>
                    {name}
                </h3>

                <p className={styles.partnerDescription}>
                    {description}
                </p>
            </div>
        </motion.div>
    );

   
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

export default PartnerCard;