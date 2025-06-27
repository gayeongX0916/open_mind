import styles from "./index.module.scss";
import arrowLeft from "@/assets/arrow_left.svg";
import arrowRight from "@/assets/arrow_right.svg";
import { getSubjects } from "@/services/getSubjects";
import Image from "next/image";
import { useEffect, useState } from "react";

type PaginationProps = {
  pageSize: number;
};

export function Pagination({ pageSize }: PaginationProps) {
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
      setCurrentPage((prev) => prev - 1);
    }
  };

  const gotoNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
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
            className={styles["pagination-button"]}
            onClick={() => setCurrentPage(number)}
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
