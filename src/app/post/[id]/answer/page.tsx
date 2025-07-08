"use client";

import Header from "@/components/Header";
import styles from "./page.module.scss";
import { useParams } from "next/navigation";
import { FloatingButton } from "@/components/common/Button";
import { useCallback, useEffect, useState } from "react";
import { SubjectsQuestions } from "@/types/Subjects";
import getSubjectsQuestions from "@/services/subjects/getSubjectsQuestions";
import QuestionList from "@/components/QuestionList";
import DeleteModal from "@/components/Modal/DeleteModal";
import FeedCardSkeleton from "@/components/Skeleton/FeedCardSkeleton";

export default function postAnswerPage() {
  const { id } = useParams();
  const [questionCount, setQuestionCount] = useState(0);
  const [questionList, setQuestionList] = useState<SubjectsQuestions[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchQuestionList = async (id: number) => {
      setIsLoading(true);
      const data = await getSubjectsQuestions(id);
      setQuestionList(data.results);
      setQuestionCount(data.count);
      setIsLoading(false);
    };

    fetchQuestionList(Number(id));
  }, [id]);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  return (
    <div className={styles["post-answer-page"]}>
      {isLoading ? (
        <FeedCardSkeleton />
      ) : (
        <>
          {showModal && (
            <DeleteModal subjectId={String(id)} onModalChange={setShowModal} />
          )}
          <Header subjectId={Number(id)} />
          <div className={styles.question}>
            <div className={styles["delete-floating-button"]}>
              <FloatingButton mode="delete" onClick={handleOpenModal}>
                삭제하기
              </FloatingButton>
            </div>
            <QuestionList
              questionCount={questionCount}
              questionList={questionList}
            />
          </div>
        </>
      )}
    </div>
  );
}
