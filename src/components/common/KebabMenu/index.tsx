"use client";

import editIcon from "@/assets/edit_icon.svg";
import closeIcon from "@/assets/close_icon.svg";
import editBlueIcon from "@/assets/edit_blue_icon.svg";
import closeBlueIcon from "@/assets/close_blue_icon.svg";
import styles from "./index.module.scss";
import { useState } from "react";
import React from "react";

type ActionKey = "edit" | "delete" | "reject";

type KebabMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  onReject: () => void;
};

function KebabMenu({ onEdit, onDelete, onReject }: KebabMenuProps) {
  const action: { key: ActionKey; label: string; onClick: () => void }[] = [
    { key: "edit", label: "수정하기", onClick: onEdit },
    { key: "delete", label: "삭제하기", onClick: onDelete },
    { key: "reject", label: "거절하기", onClick: onReject },
  ];

  return (
    <div className={styles["kebab-menu"]}>
      {action.map(({ key, label, onClick }) => {
        return (
          <button
            key={key}
            className={styles["kebab-menu__button"]}
            onClick={onClick}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default React.memo(KebabMenu);
