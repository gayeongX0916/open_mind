export async function getSubjects(limit = 8, offset = 0) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subjects/?limit=${limit}&offset=${offset}`,
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
