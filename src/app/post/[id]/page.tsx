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
import Modal from "@/components/common/Modal";
import QuestionList from "@/components/QuestionList";

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
        <Modal subjectId={Number(id)} onModalChange={setShowModal} />
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
