"use client";
import { LoginIsRequiredClient } from "@/lib/auth";
import { fetchData } from "@/lib/fetchData";
import { useUser } from "@/providers/CurrentUserProvider";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  LoginIsRequiredClient();

  const { currentUser } = useUser();
  const [username, setUsername] = useState<string>("");

  const handleAddUsername = async () => {
    try {
      const { responseData, ok } = await fetchData("/api/addusername", "POST", {
        username: username,
      });

      if (!ok) {
        toast.error("Username already taken, choose another one.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      } else {
        toast.success(
          `Successfully updated username. View page at qnaect.com/${username}`,
          {
            position: "bottom-right",
            autoClose: 5000,
          }
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser?.username);
    }
  }, [currentUser]);

  return (
    <section className="flex gap-4 flex-col p-4 md:p-20 min-h-dvh w-dvw md:max-w-2xl">
      <div className="bg-base-200 p-5 rounded-lg flex flex-col gap-4 w-full">
        {currentUser?.username ? (
          <h1 className="text-lg font-bold">Edit your domain</h1>
        ) : (
          <h1 className="text-lg font-bold">Claim your domain </h1>
        )}
        <div className="flex flex-col md:flex-row lg:border-2 lg:rounded-r-xl lg:rounded-l-lg lg:border-transparent lg:focus-within:border-primary">
          <label className="input input-nofocus input-group border-0 flex items-center gap-2 md:rounded-r-none w-full">
            qnaect.com/
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </label>{" "}
          <button
            onClick={handleAddUsername}
            className="btn btn-primary md:rounded-l-none"
          >
            {currentUser?.username ? "Submit" : ""}
          </button>
        </div>
      </div>
      <button onClick={() => signOut()} className="btn btn-primary w-fit">
        Sign Out
      </button>
    </section>
  );
};

export default Page;
