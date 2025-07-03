"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import thumbsUp from "@/assets/thumbs_up_blue.svg";
import thumbsDown from "@/assets/thumbs_down.svg";
import thumbsUpGray from "@/assets/thumbs_up_gray.svg";
import thumbsDownGray from "@/assets/thumbs_down_gray.svg";
import { useState } from "react";
import postReaction from "@/services/questions/postReaction";

type ReationProps = {
  mode: "like" | "dislike";
  likeCount?: number;
  dislikeCount?: number;
  questionId?: number;
};

export function Reaction({
  mode,
  likeCount: initialLikeCount = 0,
  dislikeCount: initialisLikeCount = 0,
  questionId,
}: ReationProps) {
  const reactionList = {
    like: {
      img: thumbsUpGray,
      label: "좋아요",
      clickedImg: thumbsUp,
    },
    dislike: {
      img: thumbsDownGray,
      label: "싫어요",
      clickedImg: thumbsDown,
    },
  };
  const { img, label, clickedImg } = reactionList[mode];
  const [clicked, setClicked] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialisLikeCount);

  const handleClick = async () => {
    if (clicked) {
      setClicked(false);
      if (mode === "like") {
        setLikeCount((prev) => prev - 1);
      } else {
        setDislikeCount((prev) => prev - 1);
      }
      return;
    }

    setClicked(true);

    if (!hasPosted && questionId) {
      try {
        const data = await postReaction({ id: String(questionId), type: mode });
        if (data) {
          setLikeCount(data.like);
          setDislikeCount(data.dislike);
          setHasPosted(true);
        }
      } catch (error) {
        console.error(error);
        setClicked(false);
      }
    } else {
      if (mode === "like") {
        setLikeCount((prev) => prev + 1);
      } else {
        setDislikeCount((prev) => prev + 1);
      }
    }
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
              clicked && mode === "like" ? styles["active-label-good"] : ""
            }
            ${clicked && mode === "dislike" ? styles["active-label-bad"] : ""}`}
          >
            {label}
          </span>
          {mode === "like" ? (
            <span
              className={`${styles["reaction__label-count"]} ${
                clicked ? styles["active-label-good-count"] : ""
              }`}
            >
              {likeCount}
            </span>
          ) : (
            ""
          )}
          {mode === "dislike" ? (
            <span
              className={`${styles["reaction__label-count"]} ${
                clicked ? styles["active-label-bad-count"] : ""
              }`}
            >
              {dislikeCount}
            </span>
          ) : (
            ""
          )}
        </div>
      </button>
    </>
  );
}
