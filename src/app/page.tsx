"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import logo from "@/assets/logo.svg";
import mainCharacter from "@/assets/main_background.svg";
import { ArrowButton } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/common/Input";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  return (
    <main className={styles.main}>
      <div className={styles["button-wrapper"]}>
        <ArrowButton
          mode="answer"
          showArrow={true}
          onClick={() => router.push("/list")}
        >
          질문하러 가기
        </ArrowButton>
      </div>
      <div className={styles.logo}>
        <Image src={logo} alt="로고" width={456} height={180} />
      </div>
      <form className={styles["input-form"]}>
        <InputField value={value} onChange={(e) => setValue(e.target.value)} />
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
