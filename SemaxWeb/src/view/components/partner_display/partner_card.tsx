import { motion } from 'motion/react';
import { ArrowUpRightIcon } from '../../../assets/Icons';
import { reveal } from '../../animations/reveal';
import styles from './partner_card.module.css';

interface PartnerProps {
    logoUrl: string;
    name: string;
    description: string;
    link: string;
}

const PartnerCard = ({ logoUrl, name, description, link }: PartnerProps) => {
    return (
        <motion.a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.card}
            {...reveal()}
        >
            <div className={styles.logoContainer}>
                {/* decorative: the partner's name is right next to it */}
                <img src={logoUrl} alt='' className={styles.logo} width={474} height={159} loading='lazy' />
            </div>

            <div className={styles.body}>
                <h3 className={styles.partnerName}>{name}</h3>
                <p className={styles.partnerDescription}>{description}</p>
                <span className={styles.visit}>
                    Visit website
                    <ArrowUpRightIcon className={styles.visitIcon} aria-hidden='true' />
                    <span className='visually-hidden'> (opens in a new tab)</span>
                </span>
            </div>
        </motion.a>
    );
}

export default PartnerCard;
