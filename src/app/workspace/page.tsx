"use client";
import { LoginIsRequiredClient } from "@/lib/auth";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Workspace() {
  const [username, setUsername] = useState<string | undefined>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fetchedUsername = urlParams.get("username");
    if (fetchedUsername) setUsername(fetchedUsername);
  }, [username]);

  LoginIsRequiredClient();

  return (
    <div>
      <h1>Workspace</h1>
      <button onClick={() => signOut()} className="btn btn-primary">
        Sign Out
      </button>
      <h1>{username}</h1>
    </div>
  );
}
