"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import logo from "@/assets/logo.svg";
import { ShareButton } from "../common/Button";
import backgroundImg from "@/assets/post_background.svg";
import { Toast } from "../common/Toast";
import { useState } from "react";

type HeaderProps = {
  img: string;
  nickname: string;
};

export default function Header({ img, nickname }: HeaderProps) {
  const [toastMessage, setToastMessage] = useState("");

  const handleOnClickLink = () => {
    const currentURL = window.location.href;
    try {
      navigator.clipboard.writeText(currentURL);
      setToastMessage("URL이 복사되었습니다.");
    } catch (error) {
      console.error(error);
      setToastMessage("URL 복사에 실패했습니다.");
    }
  };

  const handleOnClickKakao = () => {};
  const handleOnClickFacebook = () => {};

  return (
    <header className={styles["header"]}>
      {toastMessage && <Toast>{toastMessage}</Toast>}
      <Image
        src={backgroundImg}
        alt="상단 이미지"
        className={styles["header-img"]}
      />
      <Image
        src={logo}
        alt="로고"
        width={170}
        height={67}
        className={styles["header-logo"]}
      />
      <Image src={img} alt="프로필" width={136} height={136} />
      <span className={styles.nickname}>{nickname}</span>
      <div className={styles["button-wrapper"]}>
        <ShareButton mode="link" onClick={handleOnClickLink} />
        <ShareButton mode="kakao" onClick={handleOnClickKakao} />
        <ShareButton mode="facebook" onClick={handleOnClickFacebook} />
      </div>
    </header>
  );
}
