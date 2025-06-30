export default async function getSubjectsDetails(id: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subjects/${id}/`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.json();
  } catch (error) {
    console.error(error);
  }
}
