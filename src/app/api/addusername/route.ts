import { authConfig } from "@/lib/auth";
import connectMongoDB from "@/lib/connectDB";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authConfig);
    const { username } = await request.json();

    const existingUsername = await User.findOne({
      username: username,
      email: { $ne: session?.user?.email },
    });

    if (existingUsername) {
      return NextResponse.json(
        { message: "Username already taken." },
        { status: 409 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session?.user?.email },
      {
        username: username,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Username claimed!", updatedUser: updatedUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in username claiming:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
