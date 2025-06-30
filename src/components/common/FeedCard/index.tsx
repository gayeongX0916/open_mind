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
import { SubjectsQuestions } from "@/types/Subjects";

type FeedCardProps = {
  item: SubjectsQuestions;
};

export function FeedCard({ item }: FeedCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const actionDropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={styles["feed-card"]}>
      <div className={styles["feed-card__badge-wrapper"]}>
        {item.answer !== null ? (
          <Badge mode="complete">답변 완료</Badge>
        ) : (
          <Badge>미답변</Badge>
        )}
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
                onEdit={() => console.log("")}
                onDelete={() => console.log("")}
                onReject={() => console.log("")}
              />
            </div>
          )}
        </div>
      </div>

      <FeedQuestion question={item.content} createdAt={item.createdAt} />

      <FeedAnswer subjectId={item.subjectId} answers={item.answer}
      />

      <div className={styles["feed-card__bottom-line"]}></div>
      <div className={styles["feed-card__reaction-wrapper"]}>
        <Reaction mode="good" goodCount={item.like} />
        <Reaction mode="bad" badCount={item.dislike}/>
      </div>
    </div>
  );
}
