import Image from "next/image";
import styles from "./index.module.scss";
import messageIcon from "@/assets/message_brown_icon.svg";
import emptyBoxIcon from "@/assets/empty_box.svg";
import { FeedCard } from "../common/FeedCard";
import { SubjectsQuestions } from "@/types/Subjects";

type QuestionListProps = {
  questionCount: number;
  questionList: SubjectsQuestions[];
};

export default function QuestionList({
  questionCount,
  questionList,
}: QuestionListProps) {
  return (
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
          <Image alt="빈 질문함" src={emptyBoxIcon} width={150} height={154} />
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
  );
}
