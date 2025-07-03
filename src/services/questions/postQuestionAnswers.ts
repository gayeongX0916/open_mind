type postQuestionAnswersProps = {
  data: {
    questionId: number;
    content: string;
    isRejected: boolean;
    team: string;
  };
  team: string;
  question_id: string;
};

export default async function postQuestionAnswers({
  data,
  team,
  question_id,
}: postQuestionAnswersProps) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/questions/${question_id}/answers/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          team,
          question_id,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("답변 생성에 실패했습니다.");
    }
  } catch (error) {
    console.error(error);
  }
}
