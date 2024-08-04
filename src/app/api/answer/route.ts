import connectMongoDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

import Question from "@/models/question";

export async function POST(request: any) {
  try {
    await connectMongoDB();
    const { questionId, answer } = await request.json();

    await Question.findOneAndUpdate(
      {
        _id: questionId,
      },
      {
        answer: answer,
        answeredAt: new Date(),
      }
    );

    return NextResponse.json({ message: "Question answered" }, { status: 200 });
  } catch (error) {
    console.error("Error in user answer:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
