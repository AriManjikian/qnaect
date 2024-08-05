import connectMongoDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs-core";
import Question from "@/models/question";
import User from "@/models/user";

// Natural language processing library
import natural from "natural";
const tokenizer = new natural.WordTokenizer();
const stopwords = new Set(natural.stopwords);

// Function to calculate IDF values
async function calculateIDF(
  corpus: string[]
): Promise<{ [key: string]: number }> {
  const documentCount = corpus.length;
  const termDocumentFrequency: { [key: string]: number } = {};

  corpus.forEach((doc) => {
    const tokens = new Set(tokenizer.tokenize(doc.toLowerCase()));
    tokens.forEach((token) => {
      if (!stopwords.has(token)) {
        termDocumentFrequency[token] = (termDocumentFrequency[token] || 0) + 1;
      }
    });
  });

  const idf: { [key: string]: number } = {};
  Object.keys(termDocumentFrequency).forEach((term) => {
    idf[term] = Math.log(documentCount / (1 + termDocumentFrequency[term]));
  });

  return idf;
}

// Function to extract keywords using TF-IDF
function extractKeywords(
  text: string,
  idf: { [key: string]: number }
): string[] {
  const tokens: string[] = tokenizer.tokenize(text.toLowerCase());
  const filteredTokens: string[] = tokens.filter(
    (token: string) => token.length > 3 && !stopwords.has(token)
  );

  const wordFrequencies: { [key: string]: number } = {};
  filteredTokens.forEach((token: string) => {
    wordFrequencies[token] = (wordFrequencies[token] || 0) + 1;
  });

  // Calculate TF-IDF score for each word
  const tfidfScores: [string, number][] = Object.entries(wordFrequencies).map(
    ([word, frequency]: [string, number]) => [
      word,
      frequency * (idf[word] || 0),
    ]
  );

  // Sort by TF-IDF score and take the top 3
  const topKeywords: string[] = tfidfScores
    .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
    .slice(0, 3)
    .map((item: [string, number]) => item[0]);

  return topKeywords;
}

export async function POST(request: any) {
  try {
    await connectMongoDB();
    const { username, question } = await request.json();
    const responder = await User.findOne({ username: username });
    if (responder.paused) {
      return NextResponse.json(
        { message: "Questions Paused" },
        { status: 200 }
      );
    }
    const responderEmail = responder.email;

    // Load model
    const model = await use.load();

    // Generate embedding
    const embedData = await model.embed(question);
    const embedding: number[] = embedData.arraySync()[0];

    // Retrieve existing questions for IDF calculation
    const existingQuestions = await Question.find().select("question");
    const corpus = existingQuestions.map((doc: any) => doc.question);

    // Calculate IDF values
    const idf = await calculateIDF(corpus);

    // Extract keywords using TF-IDF
    const keywords = extractKeywords(question, idf);

    await Question.create({
      email: responderEmail,
      question: question,
      embedding: embedding,
      keywords: keywords,
    });

    return NextResponse.json(
      {
        message: "Question created",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in question creation:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
