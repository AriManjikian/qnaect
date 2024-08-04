"use client";

import React, { useEffect, useState } from "react";
import { LoginIsRequiredClient } from "@/lib/auth";
import { QuestionType } from "@/models/question";
import { UserType } from "@/models/user";
import { useUser } from "@/providers/CurrentUserProvider";
import {
  BiCollection,
  BiLeftArrow,
  BiPause,
  BiPlay,
  BiRightArrow,
} from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import { fetchData } from "@/lib/fetchData";
import { TiRefresh } from "react-icons/ti";
import { generateGroups } from "@/lib/groupQuestions";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { BsEyeSlash } from "react-icons/bs";
import { LoadingStates } from "@/lib/types";
import { LoadingButton } from "@/components/LoadingButton";
import { CiViewTable } from "react-icons/ci";
import QuestionTable from "@/components/QuestionTable";

// Types
type GroupType = {
  group: string;
  questions: QuestionType[];
};

export default function Workspace() {
  LoginIsRequiredClient();

  const { currentUser } = useUser();

  const [username, setUsername] = useState<string | undefined>("");
  const [questionList, setQuestionList] = useState<QuestionType[]>([]);
  const [kmeansGroups, setKmeansGroups] = useState<GroupType[]>([]);
  const [profileData, setProfileData] = useState<UserType | null>(null);
  const [questionsGrouped, setQuestionsGrouped] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"Questions" | "Statistics">(
    "Questions"
  );

  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    questions: false,
    pause: false,
    groups: false,
  });

  const setLoading = (key: keyof LoadingStates, value: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }));
  };

  const getQuestionList = async () => {
    try {
      setLoading("questions", true);
      const { responseData, ok } = await fetchData(
        "/api/search/questionlist",
        "POST",
        {
          email: currentUser?.email,
        }
      );
      setQuestionList(responseData.questionList);
    } catch (error) {
      console.error("Error fetching question list:", error);
    } finally {
      setLoading("questions", false);
    }
  };

  const handlePause = async () => {
    try {
      setLoading("pause", true);
      const { responseData, ok } = await fetchData("/api/pause", "POST", {
        paused: !profileData?.paused,
      });
      setProfileData(responseData.updatedUser);
    } catch (error) {
      console.error("Error toggling pause:", error);
    } finally {
      setLoading("pause", false);
    }
  };

  const handleGroupQuestions = async () => {
    try {
      setLoading("groups", true);
      const groups = await generateGroups(questionList);
      setKmeansGroups(groups);
      console.log(groups);
      setLoading("groups", false);
    } catch (error) {
      console.error("Error grouping questions:", error);
    } finally {
      setLoading("groups", false);
    }
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(questionList.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const currentItems = questionList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, questionList.length);

  useEffect(() => {
    const addUsername = async (fetchedUsername: string) => {
      try {
        await fetchData("/api/addusername", "POST", {
          username: fetchedUsername,
        });
        console.log("Username added successfully");
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

    setProfileData(currentUser);
  }, [currentUser]);

  return (
    <section className="flex flex-col w-full h-full p-6">
      {/* Tab selection for mobile */}
      <span className="flex gap-2 md:hidden">
        {["Questions", "Statistics"].map((tab) => (
          <div
            key={tab}
            className={`badge my-4 p-4 ${
              selectedTab === tab ? "badge-primary" : "badge-neutral"
            }`}
            onClick={() => setSelectedTab(tab as "Questions" | "Statistics")}
          >
            {tab}
          </div>
        ))}
      </span>

      {/* Statistics section */}
      <span
        className={`grid gap-4 min-w-full w-full h-fit sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${
          selectedTab !== "Statistics" ? "hidden sm:grid" : ""
        }`}
      >
        <div className="stats shadow-md">
          <div className="stat">
            <div className="stat-title">Total Page Views</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
        <div className="stats shadow-md">
          <div className="stat">
            <div className="stat-title">Total Page Views</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
        <div className="stats shadow-md">
          <div className="stat">
            <div className="stat-title">Total Page Views</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
        <div className="stats shadow-md">
          <div className="stat">
            <div className="stat-title">Total Page Views</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
      </span>

      {/* Questions section */}
      <section
        className={`relative shadow-md w-full h-full rounded-lg p-6 ${
          selectedTab !== "Questions" ? "hidden sm:block" : ""
        }`}
      >
        <span className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Recent Questions</h1>
          <div className="gap-2 hidden md:flex">
            <LoadingButton
              onClick={handlePause}
              loadingKey="pause"
              loadingStates={loadingStates}
            >
              {profileData?.paused ? (
                <p className="text-success flex items-center">
                  Accept Questions <BiPlay className="text-xl" />
                </p>
              ) : (
                <p className="text-error flex items-center">
                  Pause Questions <BiPause className="text-xl text-error" />
                </p>
              )}
            </LoadingButton>
            <LoadingButton
              onClick={() => {
                setQuestionsGrouped(!questionsGrouped);
                handleGroupQuestions();
              }}
              loadingKey="groups"
              loadingStates={loadingStates}
            >
              {questionsGrouped ? (
                <p className="flex gap-2 items-center">
                  All Questions <CiViewTable className="text-xl" />
                </p>
              ) : (
                <p className="flex gap-2 items-center">
                  Group Similar <BiCollection className="text-xl" />
                </p>
              )}
            </LoadingButton>
          </div>
          {/* Mobile dropdown menu */}
          <details className="dropdown dropdown-end md:hidden">
            <summary className="btn btn-ghost">
              <IoIosMore />
            </summary>
            <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <LoadingButton
                  onClick={handlePause}
                  loadingKey="pause"
                  loadingStates={loadingStates}
                >
                  {profileData?.paused ? (
                    <p className="text-success flex items-center">
                      Accept Questions <BiPlay className="text-xl" />
                    </p>
                  ) : (
                    <p className="text-error flex items-center">
                      Pause Questions <BiPause className="text-xl text-error" />
                    </p>
                  )}
                </LoadingButton>
              </li>
              <li>
                <LoadingButton
                  onClick={() => {
                    setQuestionsGrouped(!questionsGrouped);
                    handleGroupQuestions();
                  }}
                  loadingKey="groups"
                  loadingStates={loadingStates}
                >
                  {questionsGrouped ? (
                    <p className="flex gap-2 items-center">
                      All Questions <CiViewTable className="text-xl" />
                    </p>
                  ) : (
                    <p className="flex gap-2 items-center">
                      Group Similar <BiCollection className="text-xl" />
                    </p>
                  )}
                </LoadingButton>
              </li>
            </ul>
          </details>
        </span>
        <div className="divider w-full"></div>
        {questionsGrouped ? (
          <button className="btn btn-neutral" onClick={handleGroupQuestions}>
            New Groups
            <MdOutlineLibraryAdd className="text-2xl" />
          </button>
        ) : (
          <button className="btn btn-neutral" onClick={getQuestionList}>
            Refresh
            <TiRefresh className="text-2xl" />
          </button>
        )}

        {loadingStates.questions ? (
          <div className="flex flex-col h-full w-full items-center justify-center">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        ) : questionList.length === 0 ? (
          <div className="flex flex-col h-full w-full items-center justify-center text-center">
            <h1 className="text-2xl font-bold">No Questions Yet!</h1>
            <p className="text-xl font-medium">
              Share your personal page with your audience
            </p>
          </div>
        ) : questionsGrouped ? (
          <div className="flex flex-col gap-2 overflow-x-auto pt-4 mb-14">
            {kmeansGroups.map((group, index) => (
              <div key={index} className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  Group {index + 1}
                </div>
                <div className="collapse-content">
                  <QuestionTable questions={group.questions} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <QuestionTable questions={currentItems} />
        )}

        {!questionsGrouped && (
          <div className="flex items-center absolute bottom-0 gap-2 p-4 text-sm font-bold">
            <span>
              Showing {startItem}-{endItem} of {questionList.length} questions
            </span>
            <button
              className="btn btn-ghost"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <BiLeftArrow />
            </button>
            <button
              className="btn btn-ghost"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <BiRightArrow />
            </button>
          </div>
        )}
      </section>
    </section>
  );
}
