import styles from "./index.module.scss";
import arrowLeft from "@/assets/arrow_left.svg";
import arrowRight from "@/assets/arrow_right.svg";
import { getSubjects } from "@/services/subjects/getSubjects";
import Image from "next/image";
import { useEffect, useState } from "react";

type PaginationProps = {
  pageSize: number;
  currentPage: number;
  onPageChage: (page: number) => void;
};

export function Pagination({
  pageSize,
  currentPage,
  onPageChage,
}: PaginationProps) {
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { count } = await getSubjects();
      setTotalPage(Math.ceil(count / pageSize));
    };
    fetchData();
  }, [pageSize]);

  const maxVisible = 5;
  const currentBlock = Math.floor((currentPage - 1) / maxVisible);
  const startPage = currentBlock * maxVisible + 1;
  const endPage = Math.min(startPage + maxVisible - 1, totalPage);
  const visiblePages = [];

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const gotoPrev = () => {
    if (currentPage > 1) {
      onPageChage(currentPage - 1);
    }
  };

  const gotoNext = () => {
    if (currentPage < totalPage) {
      onPageChage(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles["arrow-button"]}
        onClick={gotoPrev}
        disabled={currentPage === 1}
      >
        <Image src={arrowLeft} alt="이전 페이지" />
      </button>
      <div className={styles["pagination-button-wrapper"]}>
        {visiblePages.map((number) => (
          <button
            key={number}
            className={`${styles["pagination-button"]} ${
              currentPage === number ? styles.active : ""
            }`}
            onClick={() => onPageChage(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        className={styles["arrow-button"]}
        onClick={gotoNext}
        disabled={currentPage === totalPage}
      >
        <Image src={arrowRight} alt="다음 페이지" />
      </button>
    </div>
  );
}
