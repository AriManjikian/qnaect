"use client";
import { LoginIsRequiredClient } from "@/lib/auth";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Workspace() {
  const [username, setUsername] = useState<string | undefined>("");

  useEffect(() => {
    return () => {};
  }, []);

  LoginIsRequiredClient();

  return (
    <div>
      <h1>Workspace</h1>
      <button onClick={() => signOut()} className="btn btn-primary">
        Sign Out
      </button>
      <input type="text" value={username} />
    </div>
  );
}
