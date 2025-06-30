import styles from "./index.module.scss";
import messageIcon from "@/assets/message_icon.svg";
import closeIcon from "@/assets/close_icon.svg";
import Image from "next/image";
import { InputTextarea } from "../Input";
import { ArrowButton } from "../Button";

export default function Modal() {
  return (
    <dialog>
      <header>
        <div>
          <Image src={messageIcon} alt="메세지" width={28} height={28} />
          <span>질문을 작성하세요</span>
        </div>
        <button>
          <Image src={closeIcon} alt="닫기" width={28} height={28} />
        </button>
      </header>
      <div>
        <span>To.</span>
        <Image />
        <span>닉네임</span>
      </div>
      <form>
        <InputTextarea>질문을 입력해주세요</InputTextarea>
        <ArrowButton
          mode="question"
          onClick={() => console.log("")}
          showArrow={false}
        >
          질문 보내기
        </ArrowButton>
      </form>
    </dialog>
  );
}
