type postReactionProps = {
  id: string;
  type: string;
};

export default async function postReaction({ id, type }: postReactionProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/questions/${id}/reaction/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    }
  );

  if (!res.ok) {
    throw new Error("리액션 생성에 실패했습니다.");
  }

  const data = await res.json();
  return data;
}
