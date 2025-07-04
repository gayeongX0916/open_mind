import { ArrowButton } from "@/components/common/Button";
import styles from "./index.module.scss";
import Image from "next/image";
import rejectionIcon from "@/assets/rejection_icon.svg";

type DeleteModalProps = {
  subjectId: string;
  onModalChange: (close: boolean) => void;
};

export default function DeleteModal({
  subjectId,
  onModalChange,
}: DeleteModalProps) {
  const handleCloseModal = () => {
    onModalChange(false);
  };

  const handleDeleteModal = () => {};

  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.overlay}>
        <header className={styles.header}>
          <Image src={rejectionIcon} alt="거절" width={28} height={28} />
          <span className={styles["header-title"]}>정말 삭제하시겠어요?</span>
        </header>
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
