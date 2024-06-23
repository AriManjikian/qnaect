"use client";
import { LoginIsRequiredClient } from "@/lib/auth";
import { signOut } from "next-auth/react";
import React from "react";

export default function Workspace() {
  LoginIsRequiredClient();

  return (
    <div>
      <h1>Workspace</h1>
      <button onClick={() => signOut()} className="btn btn-primary">
        Sign Out
      </button>
    </div>
  );
}
