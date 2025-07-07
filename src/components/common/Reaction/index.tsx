"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import thumbsUp from "@/assets/thumbs_up_blue.svg";
import thumbsDown from "@/assets/thumbs_down.svg";
import thumbsUpGray from "@/assets/thumbs_up_gray.svg";
import thumbsDownGray from "@/assets/thumbs_down_gray.svg";
import { useState } from "react";
import postReaction from "@/services/questions/postReaction";
import React from "react";

type ReactionProps = {
  mode: "like" | "dislike";
  questionId: number;
  initialCount: number;
};

function Reaction({ mode, questionId, initialCount }: ReactionProps) {
  const [count, setCount] = useState(initialCount);
  const [clicked, setClicked] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);

  const reactionList = {
    like: {
      img: thumbsUpGray,
      clickedImg: thumbsUp,
      label: "좋아요",
    },
    dislike: {
      img: thumbsDownGray,
      clickedImg: thumbsDown,
      label: "싫어요",
    },
  };

  const { img, clickedImg, label } = reactionList[mode];

  const handleClick = async () => {
    if (clicked) {
      setClicked(false);
      setCount((prev) => prev - 1);
      return;
    }

    setClicked(true);

    try {
      if (!hasPosted) {
        const res = await postReaction({ id: String(questionId), type: mode });
        setCount(mode === "like" ? res.like : res.dislike);
        setHasPosted(true);
      } else {
        setCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
      setClicked(false);
    }
  };

  return (
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
            clicked && mode === "like" ? styles["active-label-good"] : ""
          } ${clicked && mode === "dislike" ? styles["active-label-bad"] : ""}`}
        >
          {label}
        </span>
        <span
          className={`${styles["reaction__label-count"]} ${
            clicked && mode === "like"
              ? styles["active-label-good-count"]
              : clicked && mode === "dislike"
              ? styles["active-label-bad-count"]
              : ""
          }`}
        >
          {count}
        </span>
      </div>
    </button>
  );
}

export default React.memo(Reaction)