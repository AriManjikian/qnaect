export const config = {
  runtime: "node",
};

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectMongoDB from "@/lib/connectDB";
import User from "@/models/user";
import { authConfig } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    await connectMongoDB();
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json(null, { status: 404 });
    }

    const response = NextResponse.json(user, { status: 200 });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
