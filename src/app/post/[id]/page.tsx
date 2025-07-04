"use client";

import styles from "./page.module.scss";
import Header from "@/components/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubjectsQuestions } from "@/types/Subjects";
import { FloatingButton } from "@/components/common/Button";
import getSubjectsQuestions from "@/services/subjects/getSubjectsQuestions";
import QuestionList from "@/components/QuestionList";
import QuestionModal from "@/components/Modal/QuestionModal";

const FeedDetailPage = () => {
  const { id } = useParams();
  const [questionCount, setQuestionCount] = useState(0);
  const [questionList, setQuestionList] = useState<SubjectsQuestions[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchQuestionList = async (id: number) => {
      const data = await getSubjectsQuestions(id);
      setQuestionList(data.results);
      setQuestionCount(data.count);
    };

    fetchQuestionList(Number(id));
  }, [id]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className={styles["feed-detail-page"]}>
      {showModal && (
        <QuestionModal subjectId={Number(id)} onModalChange={setShowModal} />
      )}
      <Header subjectId={Number(id)} />
      <QuestionList questionCount={questionCount} questionList={questionList} />
      <div className={styles["floating-button"]}>
        <FloatingButton onClick={handleOpenModal}>질문 작성하기</FloatingButton>
      </div>
    </div>
  );
};

export default FeedDetailPage;
