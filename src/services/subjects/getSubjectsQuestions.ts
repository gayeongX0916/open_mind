export default async function getSubjectsQuestions(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subjects/${id}/questions/`,
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }
    );

    if(!res.ok) {
      throw new Error("피드 질문 목록을 불러오는데 실패했습니다.");
    }

    return res.json();
}
