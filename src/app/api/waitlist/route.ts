import connectMongoDB from "@/lib/connectDB";
import Waitlist from "@/models/waitlist";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    console.log("waitlist addition");
    await connectMongoDB();
    const { name, email } = await request.json();
    const returningUser = await Waitlist.findOne({ email });

    if (returningUser) {
      console.log("User already joined:", returningUser);
      return NextResponse.json(
        { message: "User already in list" },
        { status: 200 }
      );
    }

    await Waitlist.create({ email, name });

    return NextResponse.json(
      { message: "User added to waitlist" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in waitlist addition:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
