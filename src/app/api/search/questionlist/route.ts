import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/connectDB";
import User from "@/models/user";
import Question from "@/models/question";

export async function POST(request: any) {
  try {
    const { username } = await request.json();
    await connectMongoDB();
    const questionList = await Question.find({ username: username });

    return NextResponse.json(questionList, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occured", error },
      { status: 500 }
    );
  }
}
