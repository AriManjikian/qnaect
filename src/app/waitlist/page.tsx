"use client";
import { ThemeTile } from "@/components/ThemeTile";
import { themesArray } from "@/lib/themes";
import React, { useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import { fetchData } from "@/lib/fetchData";

const Waitlist = () => {
  const [themes, setThemes] = useState<string[]>(themesArray);
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const toggleModal = () => {
    setIsThemeModalOpen(!isThemeModalOpen);
  };

  const closeModal = () => {
    setIsThemeModalOpen(false);
  };

  const handleSubmitWaitlist = async () => {
    try {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput) || emailInput.length > 100) {
        toast.error("Please enter a valid email address.", {
          position: "bottom-right",
          autoClose: 5000,
        });
        return;
      }

      // Check if the name is too long
      if (nameInput.length > 50) {
        toast.error("Name is too long. Please use a shorter name.", {
          position: "bottom-right",
          autoClose: 5000,
        });
        return;
      }

      setSubmitLoading(true);

      const { responseData, ok } = await fetchData("/api/waitlist", "POST", {
        email: emailInput,
        name: nameInput,
      });

      if (!ok) {
        toast.error("Sorry, something bad happened.", {
          position: "bottom-right",
          autoClose: 5000,
        });
        return;
      }

      toast.success("WooHoo, you joined us!.", {
        position: "bottom-right",
        autoClose: 5000,
      });
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setEmailInput("");
      setSubmitLoading(false);
    } catch (error) {}
  };
  return (
    <>
      <div
        className="h-dvh w-dvw flex items-center justify-center"
        data-theme={currentTheme}
      >
        <section className="flex flex-col max-w-2xl w-full bg-base-300 p-10 rounded-xl gap-4">
          <h1 className="font-extrabold text-xl mr-auto p-0">qnaect</h1>
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            type="text"
            className="input input-bordered input-nofocus"
            placeholder="your name"
          />
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            type="email"
            className="input input-bordered input-nofocus"
            placeholder="example@gmail.com"
          />
          <button className="btn btn-primary" onClick={handleSubmitWaitlist}>
            {submitLoading ? (
              <div className="loading loading-md"></div>
            ) : (
              "Join!"
            )}
          </button>
        </section>
      </div>
      <div
        className="btn btn-primary rounded-lg fixed bottom-4 left-4 select-none z-50"
        onClick={toggleModal}
      >
        <IoColorPaletteOutline size={25} />
      </div>
      {isThemeModalOpen && (
        <div className="modal-overlay">
          <dialog
            open
            className="modal modal-bottom sm:modal-middle max-w-full z-20"
          >
            <div className="modal-box flex gap-4 flex-col z-40 bg-base-200 pt-20 sm:pt-6">
              <button className="btn btn-error w-24" onClick={closeModal}>
                Close
              </button>
              <div className="rounded-box grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {themes.map((theme) => {
                  return (
                    <ThemeTile
                      theme={theme}
                      currentTheme={currentTheme}
                      setCurrentTheme={setCurrentTheme}
                      key={theme}
                    />
                  );
                })}
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default Waitlist;
