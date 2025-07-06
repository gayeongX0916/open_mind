import { ReactNode } from "react";
import styles from "./index.module.scss";
import React from "react";

type BadgeProps = {
  mode?: "default" | "complete";
  children: ReactNode;
};

function Badge({ mode = "default", children }: BadgeProps) {
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

export default React.memo(Badge, (prevProps, nextProps) => {
  return (
    prevProps.mode === nextProps.mode &&
    prevProps.children === nextProps.children
  );
});
