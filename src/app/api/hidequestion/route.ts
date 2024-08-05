import connectMongoDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

import Question from "@/models/question";

export async function POST(request: any) {
  try {
    await connectMongoDB();
    const { questionId } = await request.json();

    await Question.findOneAndDelete({
      _id: questionId,
    });

    return NextResponse.json({ message: "Question deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error in question deletion:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
