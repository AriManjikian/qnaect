"use client";
import { LoginIsRequiredClient } from "@/lib/auth";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Workspace() {
  LoginIsRequiredClient();

  const [username, setUsername] = useState<string | undefined>("");

  useEffect(() => {
    const addUsername = async (fetchedUsername: string) => {
      try {
        const response = await fetch("/api/addusername", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: fetchedUsername }),
        });
        const data = await response.json();
        console.log("Username added:", data);
      } catch (error) {
        console.error("Error adding username:", error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const fetchedUsername = urlParams.get("username");
    if (fetchedUsername) {
      setUsername(fetchedUsername);
      addUsername(fetchedUsername);
    }
  }, []);

  return (
    <>
      <h1>{username}</h1>
      <h1>workspace</h1>
    </>
  );
}
