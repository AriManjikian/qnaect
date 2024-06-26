"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import githubLogo from "@/public/github.png";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export function GoogleSignInButton() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fetchedUsername = urlParams.get("username");
    if (fetchedUsername) setUsername(fetchedUsername);
  }, []);
  const handleClick = () => {
    let callbackUrl = "";
    if (username) {
      callbackUrl = `/workspace/page?username=${encodeURIComponent(username)}`;
    } else {
      callbackUrl = "/workspace/page";
    }

    signIn("google", {
      callbackUrl: callbackUrl,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}

export function GithubSignInButton() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fetchedUsername = urlParams.get("username");
    if (fetchedUsername) setUsername(fetchedUsername);
  }, []);
  const handleClick = () => {
    let callbackUrl = "";
    if (username) {
      callbackUrl = `/workspace/page?username=${encodeURIComponent(username)}`;
    } else {
      callbackUrl = "/workspace/page";
    }
    signIn("github", {
      callbackUrl: callbackUrl,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={githubLogo} alt="Github Logo" width={20} height={20} />
      <span className="ml-4">Continue with Github</span>
    </button>
  );
}
