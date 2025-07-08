import styles from "./index.module.scss";

export default function FeedCardSkeleton() {
  return (
    <div className={styles["feed-detail-page"]}>
      <div className={styles.header}>
        <div className={styles.bg} />
        <div className={styles.logo} />
        <div className={styles.profile} />
        <div className={styles.nickname} />
        <div className={styles.shareButtons}>
          <div className={styles.button} />
          <div className={styles.button} />
          <div className={styles.button} />
        </div>
      </div>

      <div className={styles.questionList}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className={styles.questionCard} />
        ))}
      </div>
    </div>
  );
}
