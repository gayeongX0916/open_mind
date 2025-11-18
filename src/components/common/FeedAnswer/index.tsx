"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import { InputTextarea } from "../Input";
import { useCallback, useEffect, useState } from "react";
import { ArrowButton } from "../Button";
import getSubjectsDetails from "@/services/subjects/getSubjectsDetail";
import { Answers } from "@/types/Subjects";
import { useRelativeDate } from "@/hooks/useRelativeDate";
import putAnswers from "@/services/answers/putAnswers";
import React from "react";
import postQuestionAnswers from "@/services/questions/postQuestionAnswers";
import { toast } from "react-toastify";

type FeedAnswerProps = {
  questionId: number;
  subjectId: number;
  answers: Answers | null;
  isEditing: boolean;
  setIsEditing: (edit: boolean) => void;
};

function FeedAnswer({
  questionId,
  subjectId,
  answers,
  isEditing,
  setIsEditing,
}: FeedAnswerProps) {
  const [isOwner, setIsOwner] = useState(false);
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

  useEffect(() => {
    const storedId = JSON.parse(localStorage.getItem("personalId") || "[]");
    setIsOwner(storedId.includes(subjectId));
  }, [subjectId]);

  const handleEditAnswer = useCallback(async () => {
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
      toast.success("답변이 수정되었습니다.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "답변 수정 중 오류가 발생했습니다."
      );
    }
  }, [value, answers, setIsEditing]);

  const postAnswerForm = useCallback(async () => {
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
      }
      toast.success("답변이 등록되었습니다.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "답변 등록 중 오류가 발생했습니다."
      );
    }
  }, [value, questionId]);

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

export default React.memo(FeedAnswer);
