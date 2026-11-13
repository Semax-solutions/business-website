import styles from './partner_card.module.css';

interface PartnerProps {
    logoUrl: string;
    name: string;
    description: string;
    link?: string;
}

const PartnerCard = ({ logoUrl, name, description, link }: PartnerProps) => {
    const content = (
        <>
            <div className={styles.logoContainer}>
                <img src={logoUrl} alt={name + ' logo'} className={styles.logo} />
            </div>
            <h3 className={styles.partnerName}>{name}</h3>
            <p className={styles.partnerDescription}>{description}</p>
        </>
    );

    return link ? (
        <a className={styles.card} href={link} target="_blank" rel="noreferrer">{content}</a>
    ) : (
        <div className={styles.card}>{content}</div>
    );
}

export default PartnerCard;
