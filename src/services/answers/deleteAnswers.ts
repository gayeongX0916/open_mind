export default async function deleteAnswers(id:string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/answers/${id}/`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("답변 삭제에 실패했습니다.");
    }
  } catch (error) {
    console.error(error);
  }
}
