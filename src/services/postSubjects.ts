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

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
