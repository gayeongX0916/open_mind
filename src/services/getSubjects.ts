export async function getSubjects() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subjects/`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error("피드를 가져오는데 실패했습니다.");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
