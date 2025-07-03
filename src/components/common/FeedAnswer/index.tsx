"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import { InputTextarea } from "../Input";
import { useEffect, useState } from "react";
import { ArrowButton } from "../Button";
import getSubjectsDetails from "@/services/subjects/getSubjectsDetail";
import { Answers } from "@/types/Subjects";
import { useRelativeDate } from "@/hooks/useRelativeDate";
import postQuestionAnswers from "@/services/questions/postQuestionAnswers";
import putAnswers from "@/services/answers/putAnswers";

type FeedAnswerProps = {
  subjectId: number;
  questionId: number;
  answers: Answers | null;
  isEditing: boolean;
};

export function FeedAnswer({
  subjectId,
  answers,
  questionId,
  isEditing,
}: FeedAnswerProps) {
  const storedId = JSON.parse(localStorage.getItem("personalId") || "[]");
  const [isCompleted, setIsCompleted] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [nickname, setNickname] = useState("");
  const [value, setValue] = useState(answers?.content || "");

  useEffect(() => {
    if (answers) {
      setIsCompleted(true);
    }
  }, [answers]);

  useEffect(() => {
    const fetchDetailSubjects = async (id: number) => {
      const { imageSource, name } = await getSubjectsDetails(id);
      setImageURL(imageSource);
      setNickname(name);
    };

    fetchDetailSubjects(Number(subjectId));
  }, [subjectId]);

  const handleEditAnswer = async () => {
    const payload = {
      data: {
        content: value,
        isRejected: false,
      },
      team: "1-50",
      id: String(answers!.id),
    };
    try {
      await putAnswers(payload);
    } catch (error) {
      console.error(error);
    }
  };

  const postAnswerForm = async () => {
    const payload = {
      data: {
        questionId,
        content: value,
        isRejected: false,
        team: "1-50",
      },
      team: "1-50",
      question_id: String(questionId),
    };

    try {
      await postQuestionAnswers(payload);
    } catch (error) {
      console.error(error);
    }

    setIsCompleted(true);
  };
  //   return (
  //     <div className={styles["feed-answer__content"]}>
  //       {imageURL && (
  //         <Image
  //           src={imageURL}
  //           alt="프로필"
  //           width={48}
  //           height={48}
  //           className={styles["feed-answer__profile"]}
  //         />
  //       )}
  //       <div className={styles["feed-answer__right-wrapper"]}>
  //         <div className={styles["feed-answer__top-wrapper"]}>
  //           <span className={styles["feed-answer__nickname"]}>{nickname}</span>
  //           {isCompleted && answers && (
  //             <span className={styles["feed-answer__createdAt"]}>
  //               {relativeDate}
  //             </span>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const renderTextarea = () => {
    return (
      <form className={styles["textarea-form"]}>
        <InputTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="답변을 입력해주세요"
        />
        {isEditing ? (
          <ArrowButton
            mode="question"
            showArrow={false}
            onClick={handleEditAnswer}
            disabled={value ? false : true}
          >
            수정 완료
          </ArrowButton>
        ) : (
          <ArrowButton
            mode="question"
            showArrow={false}
            onClick={postAnswerForm}
            disabled={value ? false : true}
          >
            답변 완료
          </ArrowButton>
        )}
      </form>
    );
  };

  const renderAnswerContent = () => {
    if (!answers) return null;

    return answers.isRejected ? (
      <span className={styles["feed-answer__rejected-answer"]}>답변 거절</span>
    ) : (
      <span className={styles["feed-answer__complete-answer"]}>
        {answers.content}
      </span>
    );
  };

  const relativeDate = useRelativeDate(answers?.createdAt ?? "");

  if (storedId !== subjectId && answers === null) return <></>;

  return (
    <div className={styles["feed-answer"]}>
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
            <span className={styles["feed-answer__nickname"]}>{nickname}</span>
            {isCompleted && answers && (
              <span className={styles["feed-answer__createdAt"]}>
                {relativeDate}
              </span>
            )}
          </div>
          {storedId === subjectId ? (
            <>
              {!isCompleted || isEditing
                ? renderTextarea()
                : renderAnswerContent()}
            </>
          ) : (
            renderAnswerContent()
          )}
        </div>
      </div>
    </div>
  );
}
