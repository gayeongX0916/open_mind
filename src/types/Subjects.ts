export type Subjects = {
  id: number;
  name: string;
  questionCount: number;
  imageSource: string;
  createdAt: string;
};

export type Answers = {
  id: number;
  questionId: number;
  content: string;
  isRejected: boolean;
  createdAt: string;
};

export type SubjectsQuestions = {
  id: number; //questionId
  subjectId: number; // 대상 ID
  content: string;
  like: number;
  dislike: number;
  createdAt: string;
  answer: Answers;
};
