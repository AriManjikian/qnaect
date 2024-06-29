import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectMongoDB from "@/lib/connectDB";
import User from "@/models/user";
import { authConfig } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    await connectMongoDB();
    // const user = await User.findOne({ email: session?.user?.email });
    //   if (!user) {
    //   }

    console.log(session?.user);

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 200 });
    //   console.log(error);
    //   return NextResponse.json(
    //     { message: "An error occured", error },
    //     { status: 500 }
    //   );
  }
}
