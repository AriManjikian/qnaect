"use client";
import LandingHero from "@/components/LandingHero";
import LandingNavbar from "@/components/LandingNavbar";
import { ThemeTile } from "@/components/ThemeTile";
import { themesArray } from "@/lib/themes";
import { useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
export default function Home() {
  const [themes, setThemes] = useState<string[]>(themesArray);
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const toggleModal = () => {
    setIsThemeModalOpen(!isThemeModalOpen);
  };

  const closeModal = () => {
    setIsThemeModalOpen(false);
  };
  return (
    <>
      <section
        data-theme={currentTheme}
        className={`${isThemeModalOpen ? "saturate-50 opacity-50" : ""}`}
      >
        <div>
          <LandingNavbar />
          <LandingHero />
        </div>
        <div className="h-dvh">
          <button className="btn btn-primary">button</button>
        </div>
      </section>
      <button
        className="btn btn-primary rounded-lg fixed bottom-4 left-4 select-none z-50"
        onClick={toggleModal}
      >
        <IoColorPaletteOutline size={25} />
      </button>
      {isThemeModalOpen && (
        <div className="modal-overlay">
          <dialog
            open
            className="modal modal-bottom sm:modal-middle max-w-full z-20"
          >
            <div className="modal-box flex gap-4 flex-col z-40 bg-base-300 pt-20 sm:pt-6">
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
}
