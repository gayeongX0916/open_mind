import styles from "./../../ListClientPage/index.module.scss";

type ListSkeletonProps = {
  count: number;
};

export default function ListSkeleton({ count }: ListSkeletonProps) {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <li key={`skeleton-${i}`}>
            <div className={styles["user-card-skeleton"]}></div>
          </li>
        ))}
    </>
  );
}
