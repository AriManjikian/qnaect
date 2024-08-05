import { QuestionType } from "@/models/question";

export type LoadingStates = {
  questions: boolean;
  pause: boolean;
  groups: boolean;
};

export type GroupType = {
  group: string;
  questions: QuestionType[];
};

export type Stats = {
  count: number;
  percentage: number;
  isIncrease: boolean;
};
