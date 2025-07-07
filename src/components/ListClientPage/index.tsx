"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getSubjects } from "@/services/subjects/getSubjects";
import { Subjects } from "@/types/Subjects";
import { ArrowButton } from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import UserCard from "@/components/common/UserCard";
import Pagination from "@/components/common/Pagination";
import ListModal from "@/components/Modal/ListModal";
import styles from "./index.module.scss";
import Image from "next/image";
import smallLogo from "@/assets/small_logo.svg";

interface ListClientPageProps {
  initialSubjects: Subjects[];
  limit: number;
}

export default function ListClientPage({
  initialSubjects,
  limit,
}: ListClientPageProps) {
  const [sortedList, setSortedList] = useState<Subjects[]>(initialSubjects);
  const [sortedOption, setSortedOption] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(1);
  const [storedId, setStoredId] = useState<number[]>([]);
  const [personalList, setPersonalList] = useState<Subjects[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [limitSize, setLimitSize] = useState(limit);

  const router = useRouter();
  const wrapperRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current) return;
      const wrapperWidth = wrapperRef.current.offsetWidth;
      const gap = 20;
      const cardMinWidth = 186;
      const cardCount = Math.floor((wrapperWidth + gap) / (cardMinWidth + gap));
      const adjustedCardCount = Math.max(3, Math.min(cardCount, 4));
      setLimitSize(adjustedCardCount * 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("personalId") || "[]");
    setStoredId(stored);
  }, []);

  useEffect(() => {
    const personal = sortedList.filter((item) => storedId.includes(item.id));
    setPersonalList(personal);
  }, [sortedList, storedId]);

  useEffect(() => {
    const fetchAllSubjects = async () => {
      let offset = 0;
      let allData: Subjects[] = [];

      while (true) {
        const { results } = await getSubjects(limitSize, offset);
        allData = [...allData, ...results];
        if (results.length < limitSize) break;
        offset += limitSize;
      }

      const sorted = sortedSubjects(allData, sortedOption);
      setSortedList(sorted);
      setCurrentPage(1);
    };

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

  const handlePageChange = (id: number) => {
    if (storedId.includes(id)) {
      router.push(`/post/${id}/answer`);
    } else {
      router.push(`/post/${id}`);
    }
  };

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  return (
    <main className={styles["list-page"]}>
      {showModal && (
        <ListModal personalList={personalList} onModalChange={setShowModal} />
      )}
      <header className={styles["top-wrapper"]}>
        <button
          className={styles["logo-button"]}
          onClick={() => router.push("/")}
        >
          <Image src={smallLogo} alt="로고" width={146} height={57} />
        </button>
        <ArrowButton mode="answer" showArrow={true} onClick={handleOpenModal}>
          답변하러 가기
        </ArrowButton>
      </header>
      <div className={styles["dropdown-wrapper"]}>
        <h1 className={styles.title}>누구에게 질문할까요?</h1>
        <div className={styles.dropdown}>
          <Dropdown
            sortedOption={sortedOption}
            setSortedOption={setSortedOption}
          />
        </div>
      </div>
      <ul ref={wrapperRef} className={styles["user-card-wrapper"]}>
        {paginatedList.map(({ id, imageSource, name, questionCount }) => (
          <li key={id}>
            <button
              className={styles["user-card-button"]}
              onClick={() => handlePageChange(id)}
            >
              <UserCard
                img={imageSource}
                nickname={name}
                question={questionCount}
              />
            </button>
          </li>
        ))}
        {Array(limitSize - paginatedList.length)
          .fill(null)
          .map((_, i) => (
            <li
              key={`empty-${i}`}
              className={styles["user-card-placeholder"]}
            ></li>
          ))}
      </ul>
      <nav className={styles.pagination}>
        <Pagination
          pageSize={limitSize}
          currentPage={currentPage}
          onPageChage={setCurrentPage}
        />
      </nav>
    </main>
  );
}
