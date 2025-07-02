"use client";

import Header from "@/components/Header";
import styles from "./page.module.scss";
import { useParams } from "next/navigation";
import { FloatingButton } from "@/components/common/Button";
import messageIcon from "@/assets/message_brown_icon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubjectsQuestions } from "@/types/Subjects";
import { FeedCard } from "@/components/common/FeedCard";
import getSubjectsQuestions from "@/services/subjects/getSubjectsQuestions";

export default function postAnswerPage() {
  const { id } = useParams();
  const [questionCount, setQuestionCount] = useState(0);
  const [questionList, setQuestionList] = useState<SubjectsQuestions[]>([]);

  useEffect(() => {
    const fetchQuestionList = async (id: number) => {
      const data = await getSubjectsQuestions(id);
      setQuestionList(data.results);
      setQuestionCount(data.count);
    };

    fetchQuestionList(Number(id));
  }, [id]);

  return (
    <div className={styles["post-answer-page"]}>
      <Header subjectId={Number(id)} />
      <div className={styles.question}>
        <div className={styles["delete-floating-button"]}>
          <FloatingButton mode="delete" onClick={() => console.log("")}>
            삭제하기
          </FloatingButton>
        </div>
        <div className={styles["question-container"]}>
          <div className={styles["top-wrapper"]}>
            <Image
              alt="메세지 아이콘"
              src={messageIcon}
              width={24}
              height={24}
            />
            <span className={styles["question-count"]}>
              {questionCount}개의 질문이 있습니다.
            </span>
          </div>
          {questionList.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
