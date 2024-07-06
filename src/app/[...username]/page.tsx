"use client";
import NewTabLink from "@/components/NewTabLink";
import { socialMediaPlatforms } from "@/lib/platforms";
import { UserType } from "@/models/user";
import { div } from "@tensorflow/tfjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuLink } from "react-icons/lu";
import ReactMarkdown from "react-markdown";

export default function Profile({ params }: { params: { username: string } }) {
  const [profileData, setProfileData] = useState<UserType | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [questionInput, setQuestionInput] = useState<string>("");
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);

  const handleQuestion = async () => {
    try {
      setLoadingQuestion(true);
      const response = await fetch("/api/askquestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: params.username.toString(),
          question: questionInput,
        }),
      });

      setLoadingQuestion(false);
      setQuestionInput("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      setLoadingData(true);
      const fetchData = async () => {
        const response = await fetch("/api/search/profiledata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: params.username,
          }),
        });
        const responseData = await response.json();

        setProfileData(responseData);
        setLoadingData(false);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loadingData) {
    return (
      <section className="flex flex-col md:flex-row">
        <div className="p-6 min-h-dvh w-full md:w-fit max-w-sm md:bg-base-200">
          <div className="md:bg-base-100 md:p-5 md:rounded-lg">
            <div className="flex w-52 flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
              <div className="skeleton h-32 w-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="flex flex-col md:flex-row"
      data-theme={profileData?.theme}
    >
      <div className="p-6 min-h-dvh w-full md:w-fit md:max-w-sm md:bg-base-200">
        {profileData && (
          <>
            <span className="flex gap-4 items-start">
              <div className="avatar rounded-full">
                <div className="size-12 md:size-20 rounded-full">
                  {profileData.image && (
                    <Image
                      src={profileData.image}
                      alt=""
                      width={2000}
                      height={2000}
                    />
                  )}
                </div>
              </div>
              <span className="flex flex-col max-w-28">
                <h1 className="text-md font-extrabold text-clip overflow-hidden w-full ">
                  {profileData.name}
                </h1>
                <h2 className="text-sm text-clip overflow-hidden">
                  {profileData.occupation}
                </h2>
              </span>
              <button className="btn btn-primary btn-sm ml-auto rounded-lg">
                <LuLink />
              </button>
            </span>
            <ReactMarkdown
              className="pt-5 whitespace-normal markdown text-sm overflow-wrap-break-word"
              components={{
                a: ({ node, ...props }) => (
                  <NewTabLink href={props.href}>{props.children}</NewTabLink>
                ),
              }}
            >
              {profileData.bio}
            </ReactMarkdown>
            {Object.keys(profileData.links).length > 0 && (
              <>
                <div className="divider m-0"></div>

                <span className="flex md:flex-wrap overflow-x-auto no-scrollbar carousel z-30 ">
                  {Object.entries(profileData.links).map(
                    ([key, link]: [string, any]) => (
                      <a
                        key={key}
                        href={link.url}
                        className="btn btn-ghost carousel-item text-xl"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {socialMediaPlatforms[link.platform]}
                      </a>
                    )
                  )}
                </span>
              </>
            )}

            <div className="divider m-0"></div>

            <div className="relative">
              <textarea
                className="textarea textarea-bordered rounded-lg input-nofocus w-full mt-4 bg-base-200 placeholder:text-base-content min-h-24"
                placeholder="Ask me a question!"
                rows={5}
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
              ></textarea>
              <button
                className="btn btn-primary rounded-lg btn-sm absolute bottom-4 right-2"
                onClick={handleQuestion}
              >
                {loadingQuestion ? (
                  <div className="loading loading-spinner loading-md"></div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
