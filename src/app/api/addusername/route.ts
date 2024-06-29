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

    const currentUser = await User.findOne({ email: session?.user?.email });

    if (currentUser.username) {
      return NextResponse.json(
        { message: "You already have a claimed link, change it in settings." },
        { status: 500 }
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
