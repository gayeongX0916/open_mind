import styles from "./index.module.scss";
import messageIcon from "@/assets/message_icon.svg";
import closeIcon from "@/assets/close_icon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import postSubjectsQuestions from "@/services/subjects/postSubjectsQuestions";
import getSubjectsDetails from "@/services/subjects/getSubjectsDetail";
import { InputTextarea } from "@/components/common/Input";
import { ArrowButton } from "@/components/common/Button";

type QuestionModalProps = {
  subjectId: number;
  onModalChange: (close: boolean) => void;
};

export default function QuestionModal({ subjectId, onModalChange }: QuestionModalProps) {
  const [questionInput, setQuestionInput] = useState("");
  const [imgSource, setImgSource] = useState("");

  const handleonClickQuestion = async () => {
    const payload = {
      data: {
        subjectId,
        content: questionInput,
        like: 0,
        dislike: 0,
        team: "1-50",
        answer: {
          content: "",
          isRejected: false,
        },
      },
      team: "1-50",
      subject_id: String(subjectId),
    };

    try {
      await postSubjectsQuestions(payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSubjectsImg = async (id: number) => {
      const { imageSource } = await getSubjectsDetails(id);
      setImgSource(imageSource);
    };
    fetchSubjectsImg(Number(subjectId));
  }, [subjectId]);

  const handleCloseModal = () => {
    onModalChange(false);
  };

  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.overlay}>
        <header className={styles.header}>
          <div className={styles["header-left-wrapper"]}>
            <Image src={messageIcon} alt="메세지" width={28} height={28} />
            <span className={styles["header-question"]}>질문을 작성하세요</span>
          </div>
          <button className={styles["close-button"]} onClick={handleCloseModal}>
            <Image
              src={closeIcon}
              alt="닫기"
              width={28}
              height={28}
              className={styles["close-icon"]}
            />
          </button>
        </header>
        <div className={styles["title-wrapper"]}>
          <span className={styles.to}>To.</span>
          {imgSource && (
            <Image
              src={imgSource}
              alt="프로필"
              width={28}
              height={28}
              className={styles["title-img"]}
            />
          )}
          <span className={styles.nickname}>닉네임</span>
        </div>
        <form className={styles["modal-form"]}>
          <InputTextarea
            value={questionInput}
            placeholder="질문을 입력해주세요"
            onChange={(e) => setQuestionInput(e.target.value)}
          ></InputTextarea>
          <ArrowButton
            mode="question"
            onClick={handleonClickQuestion}
            showArrow={false}
            disabled={questionInput ? false : true}
          >
            질문 보내기
          </ArrowButton>
        </form>
      </div>
    </>
  );
}
