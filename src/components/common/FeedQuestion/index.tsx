import styles from "./index.module.scss";

type FeedQuestionProps = {
  question: string;
};

export function FeedQuestion({ question }: FeedQuestionProps) {
  return (
    <div className={styles["feed-question"]}>
      <div className={styles["feed-question__top-wrapper"]}>
        <span>질문 · </span>
        <span>2주 전</span>
      </div>
      <span className={styles["feed-question__question"]}>{question}</span>
    </div>
  );
}
