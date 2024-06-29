import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/connectDB";
import User from "@/models/user";

export async function POST(request: any) {
  try {
    const { username } = await request.json();
    await connectMongoDB();
    const user = await User.findOne({ username: username });
    if (!user) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occured", error },
      { status: 500 }
    );
  }
}
