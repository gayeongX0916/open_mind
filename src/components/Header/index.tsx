"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import logo from "@/assets/logo.svg";
import { ShareButton } from "../common/Button";
import backgroundImg from "@/assets/post_background.svg";
import { Toast } from "../common/Toast";
import { useEffect, useState } from "react";
import { Subjects } from "@/types/Subjects";
import getSubjectsDetails from "@/services/subjects/getSubjectsDetail";

type HeaderProps = {
  subjectId: number;
};

export default function Header({ subjectId }: HeaderProps) {
  const [toastMessage, setToastMessage] = useState("");
  const [details, setDetails] = useState<Subjects>({
    id: 0,
    name: "",
    questionCount: 0,
    imageSource: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchDetailSubjects = async (id: number) => {
      const data = await getSubjectsDetails(id);
      setDetails(data);
    };

    fetchDetailSubjects(Number(subjectId));
  }, [subjectId]);

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

  const handleOnClickKakao = () => {
    if (window.Kakao && window.Kakao.Share) {
      window.Kakao.Share.sendCustom({
        templateId: 121919,
        templateArgs: {
          img: details.imageSource,
          nickname: details.name,
        },
      });
    } else {
      console.log("Kakao SDK 로드 실패");
    }
  };

  const handleOnClickFacebook = () => {
    return window.open(
      "http://www.facebook.com/sharer/sharer.php?u=" + location.href
    );
  };

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
      {details.imageSource && (
        <Image
          src={details.imageSource}
          alt="프로필"
          width={136}
          height={136}
          className={styles["profile-img"]}
        />
      )}
      <span className={styles.nickname}>{details.name}</span>
      <div className={styles["button-wrapper"]}>
        <ShareButton mode="link" onClick={handleOnClickLink} />
        <ShareButton mode="kakao" onClick={handleOnClickKakao} />
        <ShareButton mode="facebook" onClick={handleOnClickFacebook} />
      </div>
    </header>
  );
}
