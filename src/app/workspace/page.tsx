"use client";
import { LoginIsRequiredClient } from "@/lib/auth";
import { QuestionType } from "@/models/question";
import { useUser } from "@/providers/CurrentUserProvider";
import { div } from "@tensorflow/tfjs";

import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Workspace() {
  LoginIsRequiredClient();

  const { currentUser } = useUser();

  const [username, setUsername] = useState<string | undefined>("");
  const [questionList, setQuestionList] = useState<QuestionType[]>([]);

  const getQuestionList = async () => {
    try {
      const response = await fetch("/api/search/questionlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: currentUser?.username,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch question list");
      }

      const responseData = await response.json();
      setQuestionList(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
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

      if (currentUser) {
        getQuestionList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentUser]);

  return (
    <>
      <div className="flex flex-wrap gap-4 p-4">
        {questionList.map((question: QuestionType) => {
          return (
            <div key={question._id} className="bg-base-200 p-6 rounded-lg">
              <p>{question.question}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
