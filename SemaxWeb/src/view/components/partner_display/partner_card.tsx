import styles from './partner_card.module.css';

interface PartnerProps {
  logoUrl: string;
  name: string;
  description: string;
  link?: string;
}

export default function PartnerCard({logoUrl, name, description, link}: PartnerProps) {
  


  return (
    <div className={styles.container}>
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
    </div>
  );
}