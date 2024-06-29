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
    //   if (!user) {
    //   }

    //   return NextResponse.json(user, { status: 200 });
  } catch (error) {
    //   console.log(error);
    //   return NextResponse.json(
    //     { message: "An error occured", error },
    //     { status: 500 }
    //   );
  }
  return NextResponse.json(null, { status: 404 });
}
