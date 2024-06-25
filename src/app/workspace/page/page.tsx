"use client";
import React, { useEffect, useState } from "react";
import { LuLink, LuUser } from "react-icons/lu";
import profile from "@/public/profile.jpg";
import Image from "next/image";
import { IoColorPaletteOutline } from "react-icons/io5";
import { themesArray } from "@/lib/themes";
import { ThemeTile } from "@/components/ThemeTile";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
const Page = () => {
  const [themes, setThemes] = useState<string[]>(themesArray);
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const [bioMarkdown, setBioMarkdown] = useState<string>("");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bio"); // Default active tab

  const toggleModal = () => {
    setIsThemeModalOpen(!isThemeModalOpen);
  };

  const closeModal = () => {
    setIsThemeModalOpen(false);
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row pt-5 p-4 lg:gap-40 justify-center items-center lg:items-start min-h-dvh">
        <div className="p-5">
          {/* Profile Picture */}
          <div className="avatar rounded-full">
            <div className="w-14 sm:w-16 rounded-full">
              <Image src={profile} alt="" width={96} height={96} />
            </div>
          </div>

          {/* Page Form */}
          <ul className="flex flex-col gap-5">
            <li>
              <p className="mb-2 text-sm font-medium text-white">Name</p>
              <label className="input input-nofocus input-bordered flex items-center gap-2">
                <LuUser />
                <input type="text" required />
              </label>
            </li>
            <li>
              <p className="mb-2 text-sm font-medium text-white">
                Bio (Use Markdown)
              </p>
              <textarea
                className="textarea textarea-bordered input-nofocus w-full min-h-64"
                rows={8}
                value={bioMarkdown}
                placeholder={`# Heading 1\n## Heading 2\n### Heading 3\n\n**Bold Text**\n*Italic Text*\n\n[Link Text](http://example.com)`}
                onChange={(e) => setBioMarkdown(e.target.value)}
              />
            </li>
            <li className="flex flex-col gap-2">
              <p className="mb-2 text-sm font-medium text-white">URLs</p>
              <label className="input input-nofocus input-bordered flex items-center gap-2">
                <LuLink />
                <input type="text" />
              </label>
            </li>
            <li>
              <button
                className="btn btn-primary rounded-lg"
                onClick={toggleModal}
              >
                <IoColorPaletteOutline size={25} />
              </button>
            </li>
          </ul>
        </div>

        {/* Phone Mockup */}
        <div className="mockup-phone m-0">
          <div className="camera"></div>
          <div className="display">
            <div
              className="artboard p-10 phone-1 markdown >"
              data-theme={currentTheme}
            >
              <div className="avatar rounded-full">
                <div className="w-12 sm:w-12 rounded-full">
                  <Image src={profile} alt="" width={96} height={96} />
                </div>
              </div>
              <ReactMarkdown>{bioMarkdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Modal */}
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
};

export default Page;
