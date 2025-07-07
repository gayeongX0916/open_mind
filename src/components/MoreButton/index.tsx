"use client";

import Image from "next/image";
import moreIcon from "@/assets/more_icon.svg";
import styles from "@/components/common/FeedCard/index.module.scss";
import { RefObject } from "react";
import React from "react";

type MoreButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: RefObject<HTMLDivElement | null>;
  children?: React.ReactNode;
};

function MoreButton({
  isOpen,
  onToggle,
  dropdownRef,
  children,
}: MoreButtonProps) {
  return (
    <div className={styles["feed-card__more-wrapper"]}>
      <button className={styles["feed-card__more-button"]} onClick={onToggle}>
        <Image
          src={moreIcon}
          alt="더보기"
          width={26}
          height={26}
          className={styles["feed-card__more-img"]}
        />
      </button>
      {isOpen && (
        <div className={styles["feed-card__dropdown"]} ref={dropdownRef}>
          {children}
        </div>
      )}
    </div>
  );
}

export default React.memo(MoreButton);
