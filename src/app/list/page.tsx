"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import smallLogo from "@/assets/small_logo.svg";
import { ArrowButton } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/common/Dropdown";
import { UserCard } from "@/components/common/UserCard";
import { Pagination } from "@/components/common/Pagination";
import { useEffect, useState } from "react";
import { getSubjects } from "@/services/getSubjects";

const ListPage = () => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const limitSize = 8;

  const fetchData = async (page: number) => {
    const offset = (page - 1) * limitSize;
    const { results } = await getSubjects(limitSize, offset);
    setList(results);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <main className={styles["list-page"]}>
      <header className={styles["top-wrapper"]}>
        <button
          className={styles["logo-button"]}
          onClick={() => router.push("/")}
        >
          <Image
            src={smallLogo}
            alt="로고"
            width={146}
            height={57}
            className={styles.logo}
          />
        </button>
        <ArrowButton
          mode="answer"
          showArrow={true}
          onClick={() => router.push("/")}
        >
          답변하러 가기
        </ArrowButton>
      </header>
      <h1 className={styles.title}>누구에게 질문할까요?</h1>
      <div className={styles.dropdown}>
        <Dropdown />
      </div>
      <ul className={styles["user-card-wrapper"]}>
        {list.map(({ id, imageSource, name, questionCount }) => (
          <li key={id}>
            <button
              className={styles["user-card-button"]}
              onClick={() => router.push(`/post/${id}`)}
            >
              <UserCard
                img={imageSource}
                nickname={name}
                question={questionCount}
              />
            </button>
          </li>
        ))}
      </ul>
      <nav className={styles["pagination"]}>
        <Pagination
          pageSize={8}
          currentPage={currentPage}
          onPageChage={setCurrentPage}
        />
      </nav>
    </main>
  );
};

export default ListPage;
