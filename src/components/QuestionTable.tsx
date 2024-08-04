"use client";
import React, { useState } from "react";
import { QuestionType } from "@/models/question";
import { IoIosMore } from "react-icons/io";
import { BsEyeSlash } from "react-icons/bs";

type QuestionTableProps = {
  questions: QuestionType[];
};

type ModalProps = {
  show: boolean;
  currentQuestion: QuestionType | null;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, currentQuestion }) => {
  const [answer, setAnswer] = useState("");

  if (!show || !currentQuestion) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-base-200 p-4 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
        <textarea
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button className="btn btn-error" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              // Here you would typically handle the answer submission
              console.log(`Submitting answer: ${answer}`);
              setAnswer("");
              onClose();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const QuestionTable: React.FC<QuestionTableProps> = ({ questions }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(
    null
  );

  const handleAnswerClick = (question: QuestionType) => {
    setCurrentQuestion(question);
    setShowModal(true);
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
                    {["neutral", "neutral", "neutral"].map((tag, i) => (
                      <div key={i} className="badge badge-neutral">
                        {tag}
                      </div>
                    ))}
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
                        <button className="btn btn-ghost">
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
        onClose={() => {
          setShowModal(false);
          setCurrentQuestion(null);
        }}
      />
    </>
  );
};

export default QuestionTable;
