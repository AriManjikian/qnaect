import { QuestionType } from "@/models/question";
import React, { useState } from "react";
import { BsLink, BsThreeDots, BsTrash } from "react-icons/bs";

type QuestionTileProps = {
  questionData: QuestionType;
};

const QuestionTile: React.FC<QuestionTileProps> = ({ questionData }) => {
  const [answerInput, setAnswerInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col bg-zinc-950 p-2 rounded-lg">
      <span className="flex justify-between">
        <div>
          <h1>{questionData.question}</h1>
        </div>
        <div className="dropdown dropdown-down dropdown-end">
          <div tabIndex={0} role="button" className="btn">
            <BsThreeDots />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-zinc-800 rounded-box w-40"
          >
            <li>
              <button>
                <BsTrash />
                Delete
              </button>
            </li>
            <li>
              <a>
                <BsLink />
                Copy Link
              </a>
            </li>
          </ul>
        </div>
      </span>
      <span className="flex flex-row items-center gap-4 pt-2 justify-between">
        <label
          htmlFor="answer_modal"
          className="btn"
          onClick={() => setIsModalOpen(true)}
        >
          Answer
        </label>

        <input
          type="checkbox"
          className="modal-toggle"
          checked={isModalOpen}
          onChange={() => setIsModalOpen(!isModalOpen)}
        />
        <div className="modal modal-top sm:modal-middle" role="dialog">
          <div className="modal-box p-10">
            <h3 className="font-bold text-lg">{questionData.question}</h3>

            <div className="mt-4 space-y-4">
              <textarea
                onChange={(e) => setAnswerInput(e.target.value)}
                value={answerInput}
                className="input input-bordered focus:outline-none w-full flex-grow p-2 min-h-12"
                id="question"
                placeholder="Enter your answer here..."
              />
            </div>
            <div className="modal-action justify-between">
              <button
                type="submit"
                className="btn btn-success w-full sm:w-auto"
              >
                Submit
              </button>
              <label
                className="btn btn-error"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default QuestionTile;
