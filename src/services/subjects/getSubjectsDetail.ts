export default async function getSubjectsDetails(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subjects/${id}/`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    
    if(!res.ok) {
      throw new Error("피드 상세 정보를 불러오는데 실패했습니다.");
    }

    return res.json();
}
