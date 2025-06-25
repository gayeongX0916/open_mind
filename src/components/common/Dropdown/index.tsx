"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import arrowDownGray from "@/assets/arrow_down_gray.svg";
import arrowUp from "@/assets/arrow_up.svg";
import editIcon from "@/assets/edit_icon.svg";
import closeIcon from "@/assets/close_icon.svg";
import editBlueIcon from "@/assets/edit_blue_icon.svg";
import closeBlueIcon from "@/assets/close_blue_icon.svg";
import { useEffect, useRef, useState } from "react";

export function SortDropdown() {
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
    <div ref={sortDropdownRef} className={styles["sort-dropdown__wrapper"]}>
      <button
        className={`${styles["sort-dropdown"]} ${
          isOpen ? styles["sort-dropdown__isOpen"] : ""
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
        <div className={styles["sort-dropdown__container"]}>
          {["이름순", "최신순"].map((option) => (
            <button
              key={option}
              className={styles["sort-dropdown__menu-button"]}
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

export function ActionDropdown() {
  const actionDropdownList = [
    { img: editIcon, label: "수정하기", clickedImg: editBlueIcon },
    { img: closeIcon, label: "삭제하기", clickedImg: closeBlueIcon },
  ];
  const [selected, setSelected] = useState("");

  return (
    <div className={styles["action-dropdown"]}>
      {actionDropdownList.map((option) => {
        const isSelected = selected === option.label;
        return (
          <button
            key={option.label}
            className={`${styles["action-dropdown__menu-button"]} ${
              isSelected ? styles["selected"] : ""
            }`}
            onClick={() => setSelected(option.label)}
          >
            <Image
              src={isSelected ? option.clickedImg : option.img}
              alt={option.label}
              width={14}
              height={14}
              className={styles["default-img"]}
            />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
