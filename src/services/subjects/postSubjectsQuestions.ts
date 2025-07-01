type postSubjectsQuestionsProps = {
  data: {
    subjectId: number;
    content: string;
    like: number;
    dislike: number;
    team: string;
    answer: {
      content: string;
      isRejected: Boolean;
    };
  };
  team: string;
  subject_id: string;
};

export default async function postSubjectsQuestions({
  data,
  team,
  subject_id,
}: postSubjectsQuestionsProps) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subjects/${subject_id}/questions/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          team,
          subject_id,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("질문 생성에 실패했습니다.");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
}
