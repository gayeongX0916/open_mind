import { ReactNode } from "react";
import styles from "./index.module.scss";

type BadgeProps = {
  mode?: "default" | "complete";
  children: ReactNode;
};

export function Badge({ mode = "default", children }: BadgeProps) {
  return (
    <div
      className={`${styles.badge} ${
        mode === "complete" ? styles.complete : ""
      }`}
    >
      {children}
    </div>
  );
}
