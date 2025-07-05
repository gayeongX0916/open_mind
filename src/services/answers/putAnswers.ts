type putAnswersProps = {
  data: {
    content: string;
    isRejected: boolean;
  };
  team: string;
  id: string;
};

export default async function putAnswers({ data, team, id }: putAnswersProps) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/answers/${id}/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          team,
          id,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("답변 수정에 실패했습니다.");
    }
    const { content } = await res.json();
    return content;
  } catch (error) {
    console.error(error);
  }
}
