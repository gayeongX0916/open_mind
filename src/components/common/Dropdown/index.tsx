"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import arrowDownGray from "@/assets/arrow_down_gray.svg";
import arrowUp from "@/assets/arrow_up.svg";
import { useEffect, useRef, useState } from "react";

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("이름순");
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
        {selected}
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
                setSelected(option);
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
