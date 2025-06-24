"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import thumbsUp from "@/assets/thumbs_up_blue.svg";
import thumbsDown from "@/assets/thumbs_down.svg";
import thumbsUpGray from "@/assets/thumbs_up_gray.svg";
import thumbsDownGray from "@/assets/thumbs_down_gray.svg";
import { useState } from "react";

type ReationProps = {
  mode: "good" | "bad";
};

export function Reaction({ mode }: ReationProps) {
  const reactionList = {
    good: {
      img: thumbsUpGray,
      label: "좋아요",
      clickedImg: thumbsUp,
    },
    bad: {
      img: thumbsDownGray,
      label: "싫어요",
      clickedImg: thumbsDown,
    },
  };
  const { img, label, clickedImg } = reactionList[mode];
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <>
      <button className={styles.reaction} onClick={handleClick}>
        <Image
          src={clicked ? clickedImg : img}
          alt={label}
          width={16}
          height={16}
          className={styles["default-img"]}
        />
        <div className={styles["reaction__label-wrapper"]}>
          <span
            className={`${styles["reaction__label"]} ${
              clicked && mode === "good" ? styles["active-label-good"] : ""
            }
            ${clicked && mode === "bad" ? styles["active-label-bad"] : ""}`}
          >
            {label}
          </span>
          {mode === "good" ? (
            <span
              className={`${styles["reaction__label-count"]} ${
                clicked ? styles["active-label-count"] : ""
              }`}
            >
              9
            </span>
          ) : (
            ""
          )}
        </div>
      </button>
    </>
  );
}
