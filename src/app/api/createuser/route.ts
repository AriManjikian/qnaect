import connectMongoDB from "@/lib/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { generateFromEmail } from "unique-username-generator";

export async function POST(request: any) {
  try {
    await connectMongoDB();
    const { name, email } = await request.json();
    const returningUser = await User.findOne({ email });

    if (returningUser) {
      console.log("Returning user found:", returningUser);
      return NextResponse.json({ message: "Returning User" }, { status: 200 });
    }

    await User.create({ email });

    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
