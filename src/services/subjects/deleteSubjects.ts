export default async function deleteSubjects(data: {
  team: string;
  id: string;
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subjects/${data.id}`,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error("피드 삭제에 실패했습니다.");
    }
  } catch (error) {
    console.error(error);
  }
}
