import { ArrowButton } from "@/components/common/Button";
import styles from "./index.module.scss";
import Image from "next/image";
import rejectionIcon from "@/assets/rejection_icon.svg";
import deleteSubjects from "@/services/subjects/deleteSubjects";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DeleteModalProps = {
  subjectId: string;
  onModalChange: (close: boolean) => void;
};

export default function DeleteModal({
  subjectId,
  onModalChange,
}: DeleteModalProps) {
  const router = useRouter();

  const handleCloseModal = () => {
    onModalChange(false);
  };

  const handleDeleteModal = async () => {
    try {
      await deleteSubjects({ team: "1-50", id: subjectId });
      const stored = JSON.parse(localStorage.getItem("personalId") || "[]");
      const upated = stored.filter((id: number) => id !== Number(subjectId));
      localStorage.setItem("personalId", JSON.stringify(upated));
      router.push("/list");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.overlay}>
        <header className={styles.header}>정말 삭제하시겠어요?</header>
        <div className={styles["modal-body"]}>
          <span className={styles["modal-description"]}>
            삭제하기 버튼을 누르면 모든 질문과 피드가 삭제되며,
          </span>
          <span className={styles["modal-description"]}>
            삭제 후에는 복구가 불가능합니다.
          </span>
          <span className={styles["modal-description"]}>
            삭제를 진행하시겠습니까?
          </span>
        </div>
        <div className={styles["button-wrapper"]}>
          <button
            className={styles["cancel-button"]}
            onClick={handleCloseModal}
          >
            취소하기
          </button>
          <button
            className={styles["delete-button"]}
            onClick={handleDeleteModal}
          >
            삭제하기
          </button>
        </div>
      </div>
    </>
  );
}
