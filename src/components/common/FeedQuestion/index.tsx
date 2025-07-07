import { useRelativeDate } from "@/hooks/useRelativeDate";
import styles from "./index.module.scss";
import React from "react";

type FeedQuestionProps = {
  question: string;
  createdAt: string;
};

function FeedQuestion({ question, createdAt }: FeedQuestionProps) {
  return (
    <div className={styles["feed-question"]}>
      <div className={styles["feed-question__top-wrapper"]}>
        <span>질문 · </span>
        <span>{useRelativeDate(createdAt)}</span>
      </div>
      <span className={styles["feed-question__question"]}>{question}</span>
    </div>
  );
}

export default React.memo(FeedQuestion);
