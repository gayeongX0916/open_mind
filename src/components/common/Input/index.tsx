"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import personIcon from "@/assets/person_icon.svg";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type InputFieldProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  placeholder?: string;
};

type InputTextareaProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onEnter?: () => void;
  placeholder?: string;
};

export function InputField({
  value,
  onChange,
  onEnter,
  placeholder,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <div
      className={`${styles.inputWrapper} ${isFocused ? styles.isFocused : ""}`}
    >
      <Image src={personIcon} alt="사람" width={20} height={20} />
      <input
        className={styles.inputField}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "이름을 입력하세요"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}

export function InputTextarea({
  value,
  onChange,
  onEnter,
  placeholder,
}: InputTextareaProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <div className={styles.textareaWrapper}>
      <textarea
        className={styles.textareaField}
        placeholder={placeholder || "이름을 입력하세요"}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
