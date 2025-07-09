"use client";

import Badge from "../Badge";
import styles from "./index.module.scss";
import FeedQuestion from "../FeedQuestion";
import Reaction from "../Reaction";
import FeedAnswer from "../FeedAnswer";
import { useCallback, useEffect, useRef, useState } from "react";
import KebabMenu from "../KebabMenu";
import { Answers, SubjectsQuestions } from "@/types/Subjects";
import deleteAnswers from "@/services/answers/deleteAnswers";
import patchAnswers from "@/services/answers/patchAnswers";
import MoreButton from "@/components/MoreButton";

type FeedCardProps = {
  item: SubjectsQuestions;
};

export function FeedCard({ item }: FeedCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [answer, setAnswer] = useState<Answers | null>(item.answer);
  const actionDropdownRef = useRef<HTMLDivElement>(null);
  const [isOwner, setIsOwner] = useState(false);

  const handleClickOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      actionDropdownRef.current &&
      !actionDropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const storedId = JSON.parse(localStorage.getItem("personalId") || "[]");
    setIsOwner(storedId.includes(item.subjectId));
  }, [item.subjectId]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleIsEditing = useCallback(() => {
    setIsEditing(true);
    setIsOpen(false);
  }, []);

  const handleDeleteAnswer = useCallback(async () => {
    if (!item.answer) return;
    try {
      await deleteAnswers(String(item.answer.id));
      setAnswer(null);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  }, [item.answer]);

  const handleRejectAnswer = useCallback(async () => {
    if (!item.answer) return;
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
  }, [item.answer]);

  return (
    <div className={styles["feed-card"]}>
      <div className={styles["feed-card__badge-wrapper"]}>
        {answer !== null ? (
          <Badge mode="complete">답변 완료</Badge>
        ) : (
          <Badge>미답변</Badge>
        )}
        {isOwner && (
          <MoreButton
            isOpen={isOpen}
            onToggle={handleClickOpen}
            dropdownRef={actionDropdownRef}
          >
            <KebabMenu
              onEdit={handleIsEditing}
              onDelete={handleDeleteAnswer}
              onReject={handleRejectAnswer}
            />
          </MoreButton>
        )}
      </div>

      <FeedQuestion question={item.content} createdAt={item.createdAt} />

      <FeedAnswer
        questionId={item.id}
        subjectId={item.subjectId}
        answers={answer}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      <div className={styles["feed-card__bottom-line"]}></div>
      <div className={styles["feed-card__reaction-wrapper"]}>
        <Reaction mode="like" questionId={item.id} initialCount={item.like} />
        <Reaction
          mode="dislike"
          questionId={item.id}
          initialCount={item.dislike}
        />
      </div>
    </div>
  );
}
