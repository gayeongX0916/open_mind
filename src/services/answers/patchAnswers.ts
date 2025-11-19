type patchAnswersProps = {
  id: string;
  isRejected: boolean;
};

export default async function patchAnswers({
  id,
  isRejected,
}: patchAnswersProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/answers/${id}/`,
    {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ isRejected }),
    }
  );

  if (!res.ok) {
    throw new Error("답변 수정에 실패했습니다.");
  }

  const data = await res.json();
  return data;
}
