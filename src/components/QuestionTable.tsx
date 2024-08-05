"use client";
import React, { useEffect, useState } from "react";
import { QuestionType } from "@/models/question";
import { IoIosMore } from "react-icons/io";
import { BsEyeSlash } from "react-icons/bs";
import { fetchData } from "@/lib/fetchData";
import { toast } from "react-toastify";

type QuestionTableProps = {
  questions: QuestionType[];
  getQuestionList: () => Promise<void>;
};

type ModalProps = {
  show: boolean;
  currentQuestion: QuestionType | null;
  onClose: () => void;
  onSubmit: () => void;
};

const Modal: React.FC<ModalProps> = ({
  show,
  currentQuestion,
  onClose,
  onSubmit,
}) => {
  const [answer, setAnswer] = useState(currentQuestion?.answer || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setAnswer(currentQuestion?.answer || "");
  }, [currentQuestion]);
  if (!show || !currentQuestion) return null;

  const handleAnswerSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { responseData, ok } = await fetchData("/api/answer", "POST", {
        answer: answer,
        questionId: currentQuestion._id,
      });
      if (ok) {
        setAnswer("");
        onSubmit();
        onClose();
      } else {
        console.error("Failed to submit answer:", responseData);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-base-200 p-4 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
        <textarea
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isSubmitting}
        />
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-error"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleAnswerSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

const QuestionTable: React.FC<QuestionTableProps> = ({
  questions,
  getQuestionList,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(
    null
  );

  const handleAnswerClick = (question: QuestionType) => {
    setCurrentQuestion(question);
    setShowModal(true);
  };

  const handleHideQuestion = async (questionId: string) => {
    try {
      const { responseData, ok } = await fetchData("api/hidequestion", "POST", {
        questionId: questionId,
      });

      if (!ok) {
        toast.error("Sorry, something bad happened. Try again later.", {
          position: "bottom-right",
          autoClose: 5000,
        });
        return;
      }
      getQuestionList();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto pt-4">
        <table className="table mb-14">
          <thead>
            <tr>
              <th>Question</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((questionData, key) => (
              <tr key={key}>
                <td>{questionData.question}</td>
                <td>
                  <span className="flex gap-2">
                    {questionData.keywords.map((keyword, i) => {
                      return (
                        <div key={i} className="badge badge-neutral">
                          {keyword}
                        </div>
                      );
                    })}
                  </span>
                </td>
                <td className="flex justify-between">
                  <button
                    className={`btn btn-ghost ${
                      questionData.answer ? "text-success" : ""
                    }`}
                    onClick={() => handleAnswerClick(questionData)}
                  >
                    {questionData.answer ? "Answered" : "Answer"}
                  </button>
                  <details className="dropdown dropdown-end">
                    <summary className="btn btn-ghost">
                      <IoIosMore />
                    </summary>
                    <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
                      <li>
                        <button
                          className="btn btn-ghost"
                          onClick={() => handleHideQuestion(questionData._id)}
                        >
                          Hide Question <BsEyeSlash className="text-xl" />
                        </button>
                      </li>
                    </ul>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        show={showModal}
        currentQuestion={currentQuestion}
        onSubmit={() => {
          getQuestionList();
        }}
        onClose={() => {
          setShowModal(false);
          setCurrentQuestion(null);
        }}
      />
    </>
  );
};

export default QuestionTable;
