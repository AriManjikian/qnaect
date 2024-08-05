"use client";
import NewTabLink from "@/components/NewTabLink";
import QuestionTable from "@/components/QuestionTable";
import { fetchData } from "@/lib/fetchData";
import { socialMediaPlatforms } from "@/lib/platforms";
import { QuestionType } from "@/models/question";
import { UserType } from "@/models/user";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuLink } from "react-icons/lu";
import ReactMarkdown from "react-markdown";

export default function Profile({ params }: { params: { username: string } }) {
  const [profileData, setProfileData] = useState<UserType | null>(null);
  const [questionList, setQuestionList] = useState<QuestionType[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [questionInput, setQuestionInput] = useState<string>("");
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);

  const handleQuestion = async () => {
    try {
      setLoadingQuestion(true);
      const { responseData, ok } = await fetchData("/api/askquestion", "POST", {
        username: params.username.toString(),
        question: questionInput,
      });

      setLoadingQuestion(false);
      setQuestionInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileData = async () => {
    try {
      setLoadingData(true);
      const { responseData: profileData, ok: profileOk } = await fetchData(
        "/api/search/profiledata",
        "POST",
        { username: params.username }
      );

      setProfileData(profileData);
      setLoadingData(false);
    } catch (error) {
      console.error(error);
      setLoadingData(false);
    }
  };

  const getQuestionList = async () => {
    try {
      const { responseData, ok } = await fetchData(
        "api/search/answeredlist",
        "POST",
        {
          username: params.username,
        }
      );

      if (ok) {
        setQuestionList(responseData.questionList);
      }
    } catch (error) {
      console.error(error);
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getProfileData();
    getQuestionList();
  }, [params.username]);

  return (
    <section
      className="flex flex-col md:flex-row"
      data-theme={profileData?.theme}
    >
      <div className="p-6 max-h-screen w-full md:w-fit md:max-w-sm md:bg-base-100">
        {profileData && (
          <>
            <span className="flex gap-4 items-start">
              <div className="avatar rounded-full">
                <div className="size-20 md:size-20 rounded-full">
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

            <div
              role="tablist"
              className="tabs tabs-boxed md:hidden flex flex-row"
            >
              <a role="tab" className="tab w-full">
                Ask Question
              </a>
              <a role="tab" className="tab w-full tab-active">
                View Answers
              </a>
            </div>

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
      <section className="h-screen overflow-y-auto w-full p-4 bg-base-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
          {questionList.map((questionData, key) => (
            <div
              key={key}
              className="bg-base-100 w-full p-4 rounded-lg shadow-md flex flex-col gap-4"
            >
              <p className="text-lg font-semibold">{questionData.question}</p>
              <p className="text-base">{questionData.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
