export default async function getSubjectsQuestions(id: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subjects/${id}/questions/`,
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }
    );

    return res.json();
  } catch (error) {
    console.error(error);
  }
}
