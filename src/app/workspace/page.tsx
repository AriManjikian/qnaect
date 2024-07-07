"use client";
import { LoginIsRequiredClient } from "@/lib/auth";
import { QuestionType } from "@/models/question";
import { useUser } from "@/providers/CurrentUserProvider";
import { kmeans } from "ml-kmeans";
import { CgEditUnmask } from "react-icons/cg";
import { KMeansResult } from "ml-kmeans/lib/KMeansResult";

import React, { useEffect, useState } from "react";

// Calculate the WCSS for different numbers of clusters
const calculateWCSS = (data: number[][], k: number): number => {
  const kmeansResult: KMeansResult = kmeans(data, k, {
    initialization: "kmeans++",
  });
  let wcss: number = 0;
  for (let i = 0; i < k; i++) {
    const clusterPoints: number[][] = data.filter(
      (_, idx) => kmeansResult.clusters[idx] === i
    );
    const centroid: number[] = kmeansResult.centroids[i];
    const distances: number[] = clusterPoints.map((point) =>
      Math.sqrt(
        point.reduce((sum, val, j) => sum + Math.pow(val - centroid[j], 2), 0)
      )
    );
    wcss += distances.reduce((sum, val) => sum + val, 0);
  }
  return wcss;
};

// Determine the elbow point
const calculateElbowPoint = (wcssValues: number[]): number => {
  const diffs: number[] = [];
  for (let i = 1; i < wcssValues.length; i++) {
    diffs.push(wcssValues[i - 1] - wcssValues[i]);
  }
  let maxDiff: number = 0;
  let elbowPoint: number = 1;
  for (let i = 1; i < diffs.length; i++) {
    const diffChange: number = diffs[i - 1] - diffs[i];
    if (diffChange > maxDiff) {
      maxDiff = diffChange;
      elbowPoint = i + 1;
    }
  }
  return elbowPoint;
};

// Group questions by cluster
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
  const [groupCount, setGroupCount] = useState<number>(10);

  const [rangeValue, setRangeValue] = useState(2);

  const handleRangeChange = (event: any) => {
    let value = event.target.value;
    if (value > questionList.length) {
      value = questionList.length;
    }

    setRangeValue(value);
  };

  const generateGroups = async () => {
    try {
      // Extract embeddings from questions
      const embeddingsArr: number[][] = questionList.map((q) => q.embedding);
      console.log(groupCount);
      if (groupCount === 0 || groupCount > embeddingsArr.length) {
        console.log("Calculating optimal cluster count...");
        // Determine optimal number of clusters
        const maxClusters: number = Math.min(10, embeddingsArr.length);
        const wcssValues: number[] = [];
        for (let k = 1; k <= maxClusters; k++) {
          const wcss: number = calculateWCSS(embeddingsArr, k);
          wcssValues.push(wcss);
        }
        const optimalClusters: number = await calculateElbowPoint(wcssValues);
        console.log(optimalClusters);
        await setGroupCount(optimalClusters);
      }

      console.log("Cluster count is", groupCount);

      // Perform K-means clustering
      const kmeansResult: KMeansResult = kmeans(embeddingsArr, groupCount, {
        initialization: "kmeans++",
      });

      const groups: GroupType[] = Array.from(
        { length: groupCount },
        (_, i) => ({
          group: `group ${i + 1}`,
          questions: [],
        })
      );

      questionList.forEach((question, index) => {
        const cluster: number = kmeansResult.clusters[index];
        groups[cluster].questions.push(question);
      });

      setKmeansGroups(groups);
      console.log(groups);
    } catch (error) {}
  };

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
      setQuestionList(responseData.questionList);
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
      <section className="flex w-full h-full">
        <div className="w-full h-full"></div>
        <div className="bg-base-200 w-96 h-full hidden md:block p-4 pt-20">
          <div className="flex flex-col gap-2">
            <p className="text-md font-bold flex items-center gap-2">
              <CgEditUnmask className="text-xl" />
              Advanced Customization
            </p>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Grouping Algorithm</span>
              </div>
              <select className="select select-bordered w-full input-nofocus">
                <option>K-Means</option>
                <option>DBSCAN</option>
                <option>GMM</option>
                <option>HAC</option>
              </select>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Distance Metric</span>
              </div>
              <select className="select select-bordered w-full input-nofocus">
                <option>Euclidian</option>
                <option>Cosine</option>
                <option>Manhattan</option>
                <option>Correlation</option>
              </select>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Group Count</span>
              </div>
              <div className="flex items-center justify-center gap-5">
                <input
                  type="range"
                  min={0}
                  max={questionList?.length}
                  value={rangeValue}
                  onChange={(e) => handleRangeChange(e)}
                  className="range range-xs"
                />
                <input
                  type="text"
                  className="input input-bordered size-12 input-nofocus text-xs p-0 text-center"
                  value={rangeValue}
                  onChange={(e) => handleRangeChange(e)}
                />
              </div>
            </label>
          </div>
        </div>
      </section>
    </>
  );
}
