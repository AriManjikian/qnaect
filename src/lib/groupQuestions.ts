import { kmeans } from "ml-kmeans";
import { KMeansResult } from "ml-kmeans/lib/KMeansResult";
import { QuestionType } from "@/models/question";

type GroupType = {
  group: string;
  questions: QuestionType[];
};
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

export const generateGroups = async (questionList: QuestionType[]) => {
  // Extract embeddings from questions
  const embeddingsArr: number[][] = questionList.map((q) => q.embedding);
  console.log("Calculating optimal cluster count...");
  // Determine optimal number of clusters
  const maxClusters: number = Math.min(10, embeddingsArr.length);
  const wcssValues: number[] = [];
  for (let k = 1; k <= maxClusters; k++) {
    const wcss: number = calculateWCSS(embeddingsArr, k);
    wcssValues.push(wcss);
  }
  const optimalClusters: number = calculateElbowPoint(wcssValues);
  console.log("Cluster count is", optimalClusters);

  // Perform K-means clustering
  const kmeansResult: KMeansResult = kmeans(embeddingsArr, optimalClusters, {
    initialization: "kmeans++",
  });

  const groups: GroupType[] = Array.from(
    { length: optimalClusters },
    (_, i) => ({
      group: `group ${i + 1}`,
      questions: [],
    })
  );

  questionList.forEach((question, index) => {
    const cluster: number = kmeansResult.clusters[index];
    groups[cluster].questions.push(question);
  });

  return groups;
};
