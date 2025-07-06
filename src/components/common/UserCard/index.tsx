import Image from "next/image";
import messageGrayIcon from "@/assets/message_gray_icon.svg";
import styles from "./index.module.scss";
import React from "react";

type UserCardProps = {
  img: string;
  nickname: string;
  question: number;
};

function UserCard({ img, nickname, question }: UserCardProps) {
  return (
    <div className={styles["user-card"]}>
      <div className={styles["user-card__profile"]}>
        <Image
          alt="사용자 이미지"
          src={img}
          width={60}
          height={60}
          className={styles["user-card__avatar"]}
        />
        <span className={styles["user-card__nickname"]}>{nickname}</span>
      </div>
      <div className={styles["user-card__bottom-wrapper"]}>
        <div className={styles["user-card__question-wrapper"]}>
          <Image alt="받은 질문" src={messageGrayIcon} width={18} height={18} />
          <span className={styles["user-card__question"]}>받은 질문</span>
        </div>
        <span className={styles["user-card__question-count"]}>
          {question}개
        </span>
      </div>
    </div>
  );
}

export default React.memo(UserCard);
