import styles from './partner_card.module.css';

export default function PartnerCard() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Partner Logo Container */}
        <div className={styles.logoContainer}>
          {/* Placeholder logo - replace with actual partner logo */}
          <div className={styles.logoPlaceholder}>
            PARTNER
          </div>
        </div>

        {/* Partner Name */}
        <h3 className={styles.partnerName}>
          Partner Name
        </h3>

        {/* Partner Description */}
        <p className={styles.partnerDescription}>
          Technology Partner
        </p>
      </div>
    </div>
  );
}