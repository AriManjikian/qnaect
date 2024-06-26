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
    <>
      <h1>{username}</h1>
      <h1>workspace</h1>
    </>
  );
}
