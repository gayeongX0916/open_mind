import styles from "./index.module.scss";

type FeedQuestionProps = {
  question: string;
  createdAt:string;
};

export function FeedQuestion({ question ,createdAt}: FeedQuestionProps) {
  return (
    <div className={styles["feed-question"]}>
      <div className={styles["feed-question__top-wrapper"]}>
        <span>질문 · </span>
        <span>{createdAt}</span>
      </div>
      <span className={styles["feed-question__question"]}>{question}</span>
    </div>
  );
}
