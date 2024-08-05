import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/connectDB";
import Question, { QuestionType } from "@/models/question";

export async function POST(request: Request) {
  try {
    const { email }: { email: string } = await request.json();
    await connectMongoDB();
    const questionList: QuestionType[] = await Question.find({
      email: email,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ questionList }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
