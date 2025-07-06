"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import arrowDownGray from "@/assets/arrow_down_gray.svg";
import arrowUp from "@/assets/arrow_up.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";

type DropdownProps = {
  sortedOption: string;
  setSortedOption: (valie: string) => void;
};

function Dropdown({ sortedOption, setSortedOption }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      sortDropdownRef.current &&
      !sortDropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={sortDropdownRef} className={styles.dropdown}>
      <button
        className={`${styles["dropdown__wrapper"]} ${
          isOpen ? styles["dropdown__isOpen"] : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {sortedOption}
        <Image
          src={isOpen ? arrowUp : arrowDownGray}
          alt="드롭다운 아이콘"
          width={14}
          height={14}
        />
      </button>
      {isOpen && (
        <div className={styles["dropdown__container"]}>
          {["이름순", "최신순"].map((option) => (
            <button
              key={option}
              className={styles["dropdown__menu-button"]}
              onClick={() => {
                setSortedOption(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(Dropdown);
