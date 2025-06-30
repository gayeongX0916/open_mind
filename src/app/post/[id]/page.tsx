"use client";

import styles from "./page.module.scss";
import Header from "@/components/Header";
import messageIcon from "@/assets/message_brown_icon.svg";
import emptyBoxIcon from "@/assets/empty_box.svg";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubjectsQuestions } from "@/types/Subjects";
import Image from "next/image";
import { FloatingButton } from "@/components/common/Button";
import { FeedCard } from "@/components/common/FeedCard";
import getSubjectsQuestions from "@/services/subjects/getSubjectsQuestions";

const FeedDetailPage = () => {
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
    <div className={styles["feed-detail-page"]}>
      <Header subjectId={Number(id)} />
      <div className={styles.question}>
        {questionCount === 0 ? (
          <div className={styles["question-empty"]}>
            <div className={styles["top-wrapper"]}>
              <Image
                alt="메세지 아이콘"
                src={messageIcon}
                width={24}
                height={24}
              />
              <span className={styles["question-count"]}>
                아직 질문이 없습니다.
              </span>
            </div>
            <Image
              alt="빈 질문함"
              src={emptyBoxIcon}
              width={150}
              height={154}
            />
          </div>
        ) : (
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
        )}
      </div>
      <div className={styles["floating-button"]}>
        <FloatingButton onClick={() => console.log("질문 작성하기")}>
          질문 작성하기
        </FloatingButton>
      </div>
    </div>
  );
};

export default FeedDetailPage;
