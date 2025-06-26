"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import arrowRightWhite from "@/assets/arrow_right2_white.svg";
import arrowRightBrown from "@/assets/arrow_right2_brown.svg";
import linkIcon from "@/assets/link_white_icon.svg";
import kakaoIcon from "@/assets/kakaotalk_icon.svg";
import facebookIcon from "@/assets/facebook_white_icon.svg";
import { ReactNode } from "react";

type ArrowButtonProps = {
  mode: "question" | "answer";
  children: ReactNode;
  onClick: () => void;
  showArrow: boolean;
};

type FloatingButtonProps = {
  mode?: "delete" | "question";
  children: ReactNode;
  onClick: () => void;
};

type ShareButtonProps = {
  mode: "link" | "kakao" | "facebook";
  onClick: () => void;
};

export function ArrowButton({
  mode,
  children,
  onClick,
  showArrow,
}: ArrowButtonProps) {
  return (
    <>
      <button
        className={`
          ${styles["arrow-button"]}
          ${
            mode === "question"
              ? styles["question-button"]
              : styles["answer-button"]
          }
        `}
        onClick={onClick}
      >
        {children}
        {showArrow && (
          <Image
            src={mode === "question" ? arrowRightWhite : arrowRightBrown}
            alt="화살표"
            width={18}
            height={18}
          />
        )}
      </button>
    </>
  );
}

export function FloatingButton({mode='question', children, onClick }: FloatingButtonProps) {
  return (
    <>
      <button className={`${styles["floating-button"]} ${mode==="delete" ? styles["delete-button"] : ""}`} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

export function ShareButton({ mode, onClick }: ShareButtonProps) {
  const shareButtonConfig = {
    link: {
      icon: linkIcon,
      className: styles["link-button"],
      label: "링크 복사",
    },
    kakao: {
      icon: kakaoIcon,
      className: styles["kakao-button"],
      label: "카카오",
    },
    facebook: {
      icon: facebookIcon,
      className: styles["facebook-button"],
      label: "페이스북",
    },
  };
  const { icon, className, label } = shareButtonConfig[mode];

  return (
    <>
      <button
        className={`${styles["share-button"]} ${className}`}
        onClick={onClick}
      >
        <Image src={icon} alt={label} width={18} height={18} />
      </button>
    </>
  );
}
