"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import logo from "@/assets/logo.svg";
import mainCharacter from "@/assets/main_background.svg";
import ArrowButton from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/common/Input";
import { useCallback, useState } from "react";
import { postSubjects } from "@/services/subjects/postSubjects";

const Home = () => {
  const router = useRouter();
  const [nameInput, setNameInput] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { id } = await postSubjects({ name: nameInput, team: "1-50" });

    const stored = JSON.parse(localStorage.getItem("personalId") || "[]");
    stored.push(id);
    localStorage.setItem("personalId", JSON.stringify(stored));
    router.push(`/post/${id}/answer`);
  };

  const handleGotoList = useCallback(() => {
    router.push("/list");
  }, []);

  return (
    <main className={styles["home-page"]}>
      <div className={styles["button-wrapper"]}>
        <ArrowButton mode="answer" showArrow={true} onClick={handleGotoList}>
          질문하러 가기
        </ArrowButton>
      </div>
      <div className={styles.logo}>
        <Image src={logo} alt="로고" width={456} height={180} />
      </div>
      <form className={styles["input-form"]} onSubmit={(e) => handleSubmit(e)}>
        <InputField
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <ArrowButton mode="question" showArrow={false} onClick={() => {}}>
          질문 받기
        </ArrowButton>
      </form>
      <div className={styles["main-character"]}>
        <Image src={mainCharacter} alt="메인 캐릭터" />
      </div>
    </main>
  );
};

export default Home;
