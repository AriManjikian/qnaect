import connectMongoDB from "@/lib/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { generateFromEmail } from "unique-username-generator";

// Function to generate a unique username from email
async function generateRandomUsername(email: string) {
  let attemptCount = 0;
  const MAX_ATTEMPTS = 10;
  await connectMongoDB();

  while (attemptCount < MAX_ATTEMPTS) {
    const username = generateFromEmail(email, 6);
    try {
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        return username;
      }
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      throw new Error("Error accessing database to check username uniqueness");
    }
    attemptCount++;
  }
  throw new Error(
    "Failed to generate a unique username after multiple attempts"
  );
}

export async function POST(request: any) {
  try {
    await connectMongoDB();
    const { name, email, image } = await request.json();
    console.log(name, email, image);
    const returningUser = await User.findOne({ email });
    if (returningUser) {
      console.log("Returning user found:", returningUser);
      return NextResponse.json({ message: "Returning User" }, { status: 200 });
    }

    const username = await generateRandomUsername(email);
    await User.create({ name, email, image, username });

    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
