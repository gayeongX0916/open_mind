"use client";

import Image from "next/image";
import { Badge } from "../Badge";
import moreIcon from "@/assets/more_icon.svg";
import styles from "./index.module.scss";
import { FeedQuestion } from "../FeedQuestion";
import { Reaction } from "../Reaction";
import { FeedAnswer } from "../FeedAnswer";
import { useEffect, useRef, useState } from "react";
import { KebabMenu } from "../KebabMenu";
import { Answers, SubjectsQuestions } from "@/types/Subjects";
import putAnswers from "@/services/answers/putAnswers";
import deleteAnswers from "@/services/answers/deleteAnswers";
import patchAnswers from "@/services/answers/patchAnswers";

type FeedCardProps = {
  item: SubjectsQuestions;
};

export function FeedCard({ item }: FeedCardProps) {
  const storedId = JSON.parse(localStorage.getItem("personalId") || "[]");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [answer, setAnswer] = useState<Answers | null>(item.answer);
  const actionDropdownRef = useRef<HTMLDivElement>(null);
  const [likeCount, setLikeCount] = useState(item.like);
  const [dislikeCount, setDislikeCount] = useState(item.dislike);

  const handleClickOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      actionDropdownRef.current &&
      !actionDropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isOwner = storedId.includes(item.subjectId) ? true : false;

  const handleIsEditing = () => {
    setIsEditing(true);
  };

  const handleDeleteAnswer = async () => {
    try {
      await deleteAnswers(String(item.answer.id));
      setAnswer(null);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectAnswer = async () => {
    try {
      const updatedAnswer = await patchAnswers({
        isRejected: true,
        id: String(item.answer.id),
      });
      setAnswer(updatedAnswer);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles["feed-card"]}>
      <div className={styles["feed-card__badge-wrapper"]}>
        {answer !== null ? (
          <Badge mode="complete">답변 완료</Badge>
        ) : (
          <Badge>미답변</Badge>
        )}
        {isOwner && (
          <div className={styles["feed-card__more-wrapper"]}>
            <button
              className={styles["feed-card__more-button"]}
              onClick={handleClickOpen}
            >
              <Image
                src={moreIcon}
                alt="더보기"
                width={26}
                height={26}
                className={styles["feed-card__more-img"]}
              />
            </button>
            {isOpen && (
              <div
                className={styles["feed-card__dropdown"]}
                ref={actionDropdownRef}
              >
                <KebabMenu
                  onEdit={handleIsEditing}
                  onDelete={handleDeleteAnswer}
                  onReject={handleRejectAnswer}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <FeedQuestion question={item.content} createdAt={item.createdAt} />

      <FeedAnswer
        subjectId={item.subjectId}
        answers={answer}
        questionId={item.id}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      <div className={styles["feed-card__bottom-line"]}></div>
      <div className={styles["feed-card__reaction-wrapper"]}>
        <Reaction mode="like" likeCount={likeCount} questionId={item.id} />
        <Reaction
          mode="dislike"
          dislikeCount={dislikeCount}
          questionId={item.id}
        />
      </div>
    </div>
  );
}
