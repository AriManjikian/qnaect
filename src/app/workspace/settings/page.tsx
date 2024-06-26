"use client";
import { LoginIsRequiredClient } from "@/lib/auth";
import { signOut } from "next-auth/react";
import React, { useState } from "react";

const Page = () => {
  LoginIsRequiredClient();

  return (
    <section className="flex flex-col lg:flex-row p-4 gap-10 justify-center items-center min-h-dvh">
      <div>
        <button onClick={() => signOut()} className="btn btn-primary">
          Sign Out
        </button>
      </div>
    </section>
  );
};

export default Page;
