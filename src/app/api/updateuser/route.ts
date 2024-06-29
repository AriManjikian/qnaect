import { authConfig } from "@/lib/auth";
import connectMongoDB from "@/lib/connectDB";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authConfig);
    const { name, image, occupation, bio, theme, links } = await request.json();

    const updatedUser = await User.findOneAndUpdate(
      { email: session?.user?.email },
      {
        name: name,
        occupation: occupation,
        bio: bio,
        theme: theme,
        links: links,
        image: image,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "User Created", updatedUser: updatedUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
