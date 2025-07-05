"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import { InputTextarea } from "../Input";
import { useEffect, useState } from "react";
import ArrowButton from "../Button";
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
  setIsEditing: (edit: boolean) => void;
};

export function FeedAnswer({
  subjectId,
  answers,
  questionId,
  isEditing,
  setIsEditing,
}: FeedAnswerProps) {
  const storedId = JSON.parse(localStorage.getItem("personalId") || "[]");
  const [isCompleted, setIsCompleted] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [nickname, setNickname] = useState("");
  const [value, setValue] = useState(answers?.content || "");
  const [answerData, setAnswerData] = useState<Answers | null>(answers);

  useEffect(() => {
    setAnswerData(answers);
  }, [answers]);

  useEffect(() => {
    if (answerData) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
      setValue("");
    }
  }, [answerData]);

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
      const updatedContent = await putAnswers(payload);

      if (updatedContent) {
        setAnswerData((prev) =>
          prev
            ? {
                ...prev,
                content: updatedContent,
                isRejected: false,
              }
            : null
        );
      }
      setIsEditing(false);
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
      const newAnswer = await postQuestionAnswers(payload);
      if (newAnswer) {
        setAnswerData(newAnswer);
        setIsCompleted(true);
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
    }

    setIsCompleted(true);
  };

  const renderTextarea = () => {
    return (
      <div className={styles["textarea-form"]}>
        <InputTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="답변을 입력해주세요"
        />
        <ArrowButton
          mode="question"
          showArrow={false}
          disabled={!value}
          onClick={isEditing ? handleEditAnswer : postAnswerForm}
        >
          {isEditing ? "수정 완료" : "답변 완료"}
        </ArrowButton>
      </div>
    );
  };

  const renderAnswerContent = () => {
    if (!answerData) return null;

    return answerData.isRejected ? (
      <span className={styles["feed-answer__rejected-answer"]}>답변 거절</span>
    ) : (
      <span className={styles["feed-answer__complete-answer"]}>
        {answerData.content}
      </span>
    );
  };

  const relativeDate = useRelativeDate(answerData?.createdAt ?? "");
  const isOwner = storedId.includes(subjectId);

  if (!isOwner && answerData === null) return <></>;

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
            {isCompleted && answerData && (
              <span className={styles["feed-answer__createdAt"]}>
                {relativeDate}
              </span>
            )}
          </div>
          {isOwner ? (
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
