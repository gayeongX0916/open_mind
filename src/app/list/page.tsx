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
import { getSubjects } from "@/services/subjects/getSubjects";
import { Subjects } from "@/types/Subjects";

const ListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedList, setSortedList] = useState<Subjects[]>([]);
  const [sortedOption, setSortedOption] = useState("최신순");
  const router = useRouter();
  const limitSize = 8;

  const fetchAllSubjects = async () => {
    let offset = 0;
    let allData: Subjects[] = [];

    while (true) {
      const { results } = await getSubjects(limitSize, offset);
      allData = [...allData, ...results];

      if (results.length < limitSize) {
        break;
      }

      offset += limitSize;
    }

    const sorted = sortedSubjects(allData, sortedOption);
    setSortedList(sorted);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchAllSubjects();
  }, [sortedOption]);

  const sortedSubjects = (data: Subjects[], option: string) => {
    const copy = [...data];
    if (option === "이름순") {
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  };

  const paginatedList = sortedList.slice(
    (currentPage - 1) * limitSize,
    currentPage * limitSize
  );

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
        <Dropdown
          sortedOption={sortedOption}
          setSortedOption={setSortedOption}
        />
      </div>
      <ul className={styles["user-card-wrapper"]}>
        {paginatedList.map(({ id, imageSource, name, questionCount }) => (
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
          pageSize={limitSize}
          currentPage={currentPage}
          onPageChage={setCurrentPage}
        />
      </nav>
    </main>
  );
};

export default ListPage;
