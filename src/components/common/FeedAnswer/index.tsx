"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import { InputTextarea } from "../Input";
import { useState } from "react";

type FeedAnswerProps = {
  img: string;
};

export function FeedAnswer({ img }: FeedAnswerProps) {
  const [value, setValue] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompletedAnswer = () => {
    setIsCompleted(true);
  };

  return (
    <div className={styles["feed-answer"]}>
      <Image
        src={img}
        alt="프로필"
        width={48}
        height={48}
        className={styles["feed-answer__profile"]}
      />
      <div className={styles["feed-answer__right-wrapper"]}>
        <span className={styles["feed-answer__nickname"]}>닉네임</span>
        {isCompleted ? (
          <span className={styles["feed-answer__complete-answer"]}>
            {value}
          </span>
        ) : (
          <InputTextarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="답변을 입력해주세요"
          />
        )}
        {!isCompleted && (
          <button
            className={`${styles["feed-answer__button"]} ${
              value ? styles.complete : ""
            }`}
            onClick={handleCompletedAnswer}
          >
            답변 완료
          </button>
        )}
      </div>
    </div>
  );
}
