import styles from "./index.module.scss";

export default function FeedCardSkeleton() {
  return (
    <div className={styles["feed-card"]}>
      <div className={styles.badge}></div>
      <div className={styles.question}></div>
      <div className={styles.answer}></div>
    </div>
  );
}
