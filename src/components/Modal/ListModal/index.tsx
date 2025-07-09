import Image from "next/image";
import styles from "./index.module.scss";
import closeIcon from "@/assets/close_icon.svg";
import { Subjects } from "@/types/Subjects";
import { useRouter } from "next/navigation";

type ListModalProps = {
  personalList: Subjects[];
  onModalChange: (close: boolean) => void;
};

export default function ListModal({
  personalList,
  onModalChange,
}: ListModalProps) {
  const router = useRouter();

  const handleCloseModal = () => {
    onModalChange(false);
  };

  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.overlay}>
        <div className={styles["close-button"]}>
          <button onClick={handleCloseModal}>
            <Image src={closeIcon} alt="닫기" width={20} height={20} />
          </button>
        </div>
        <div className={styles["list-scroll-wrapper"]}>
          {personalList.map(({ id, name, imageSource, questionCount }) => (
            <button
              key={id}
              className={styles["list-modal-item"]}
              onClick={() => router.push(`/post/${id}/answer`)}
            >
              <Image
                src={imageSource}
                alt="프로필"
                width={60}
                height={60}
                className={styles.profile}
              />
              <div className={styles["right-wrapper"]}>
                <span className={styles.nickname}>{name}</span>
                <span className={styles.questionCount}>
                  {`받은질문 : ${questionCount}개`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
