import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/connectDB";
import Question, { QuestionType } from "@/models/question";
import User, { UserType } from "@/models/user";

export async function POST(request: Request) {
  try {
    const { username }: { username: string } = await request.json();
    await connectMongoDB();

    const user: UserType | null = await User.findOne({ username: username });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const questionList: QuestionType[] = await Question.find({
      email: user.email,
      answer: { $ne: null },
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
