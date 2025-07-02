"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import { InputTextarea } from "../Input";
import { useEffect, useState } from "react";
import { ArrowButton } from "../Button";
import getSubjectsDetails from "@/services/subjects/getSubjectsDetail";
import { Answers } from "@/types/Subjects";
import { useRelativeDate } from "@/hooks/useRelativeDate";

type FeedAnswerProps = {
  subjectId: number;
  answers: Answers | null;
};

export function FeedAnswer({ subjectId, answers }: FeedAnswerProps) {
  const [value, setValue] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [nickname, setNickname] = useState("");

  // useEffect(() => {
  //   const fetchDetailSubjects = async (id: number) => {
  //     const { imageSource, name } = await getSubjectsDetails(id);
  //     setImageURL(imageSource);
  //     setNickname(name);
  //   };

  //   fetchDetailSubjects(Number(subjectId));
  // }, [subjectId]);

  console.log(answers);

  return (
    <div className={styles["feed-answer"]}>
      {answers === null ? (
        <></>
      ) : (
        <div className={styles["feed-answer__content"]}>
          {imageURL && (
            <Image
              src={imageURL}
              alt="프로필"
              width={48}
              height={48}
              className={styles["feed-answer__profile"]}
            />
          )}
          <div className={styles["feed-answer__right-wrapper"]}>
            <div className={styles["feed-answer__top-wrapper"]}>
              <span className={styles["feed-answer__nickname"]}>
                {nickname}
              </span>
              <span className={styles["feed-answer__createdAt"]}>
                {useRelativeDate(answers.createdAt)}
              </span>
            </div>
            {answers.isRejected ? (
              <span className={styles["feed-answer__rejected-answer"]}>
                답변 거절
              </span>
            ) : (
              <span className={styles["feed-answer__complete-answer"]}>
                {answers.content}
              </span>
            )}
          </div>
        </div>
      )}
      {/* {value === "" ? (
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
        {value !== "" &&
          (value ? (
            <ArrowButton
              mode="question"
              showArrow={false}
              onClick={() => console.log("")}
            >
              답변 완료
            </ArrowButton>
          ) : (
            <button className={styles["feed-answer__button"]}>답변 완료</button>
          ))} */}
    </div>
  );
}
