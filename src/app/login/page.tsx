import {
  GithubSignInButton,
  GoogleSignInButton,
} from "@/components/authButtons/authButtons";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Login = async () => {
  const session = await getServerSession(authConfig);
  if (session) return redirect("/workspace");

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center mt-10 p-10 shadow-md gap-4">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
        <GoogleSignInButton />
        <GithubSignInButton />
        <Link href="/" className="btn btn-ghost rounded-lg">
          Back To Home Page
        </Link>
      </div>
    </div>
  );
};

export default Login;
