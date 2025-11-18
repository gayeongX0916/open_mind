import { toast } from "react-toastify";

export async function postSubjects(data: { name: string; team: string }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subjects/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error("피드 생성에 실패했습니다.");
    }

    toast.success("피드가 성공적으로 생성되었습니다!");
    return await res.json();
  } catch (error) {
    toast.error(error instanceof Error
    ? error.message
    : "피드 생성 중 오류가 발생했습니다.");
  }
}

