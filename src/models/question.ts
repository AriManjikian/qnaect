import mongoose, { Schema, mongo } from "mongoose";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";

const QuestionSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      default: undefined,
      required: false,
    },
    answeredAt: {
      type: Date,
    },
    embedding: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);

export interface QuestionType {
  _id: string;

  username: string;

  question: string;

  answer: string | undefined;

  createdAt: Date;

  answeredAt: Date;

  embedding: number[];
}

export default Question;
