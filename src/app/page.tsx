"use client";
import LandingHero from "@/components/LandingHero";
import LandingNavbar from "@/components/LandingNavbar";
import { ThemeTile } from "@/components/ThemeTile";
import { themesArray } from "@/lib/themes";
import { useState } from "react";
import { FaPalette } from "react-icons/fa6";
export default function Home() {
  const [themes, setThemes] = useState<string[]>(themesArray);
  const [currentTheme, setCurrentTheme] = useState<string>("forest");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const openModal = () => {
    setIsThemeModalOpen(true);
  };

  const closeModal = () => {
    setIsThemeModalOpen(false);
  };
  return (
    <>
      <div
        data-theme={currentTheme}
        className={`${isThemeModalOpen ? "saturate-50 opacity-50" : ""}`}
      >
        <LandingNavbar />
        <LandingHero />
      </div>
      <button
        className="btn btn-primary rounded-lg fixed bottom-4 max-lg:right-4 lg:bottom-16 lg:left-16 select-none"
        onClick={openModal}
      >
        <FaPalette />
      </button>
      {isThemeModalOpen && (
        <div className="modal-overlay">
          <dialog
            open
            className="modal modal-bottom sm:modal-middle max-w-full z-20"
          >
            <div className="modal-box flex gap-4 flex-col z-40 ">
              <button className="btn btn-error w-24" onClick={closeModal}>
                Close
              </button>
              <div className="rounded-box grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
}
