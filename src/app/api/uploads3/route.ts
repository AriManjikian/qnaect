import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/lib/auth"; // Adjust the path to your next-auth options

export async function POST(request: Request) {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { fileName, fileType } = await request.json();
    const timestamp = new Date().toISOString();
    const userEmail = session.user.email;
    const uniqueFileName = `${userEmail}_${timestamp}_${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uniqueFileName,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return NextResponse.json({ signedUrl, uniqueFileName }, { status: 200 });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { message: "Error generating signed URL", error },
      { status: 500 }
    );
  }
}
