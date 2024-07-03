import connectMongoDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs-core";
import Question from "@/models/question";

export async function POST(request: any) {
  try {
    await connectMongoDB();
    const { username, question } = await request.json();
    // Load model
    const model = await use.load();

    // Generate embedding
    const embedData = await model.embed(question);
    const embedding: number[] = embedData.arraySync()[0];

    await Question.create({
      username,
      question,
      embedding,
    });

    return NextResponse.json({ message: "Question created" }, { status: 200 });
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
