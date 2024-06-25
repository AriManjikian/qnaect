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

  const toggleModal = () => {
    setIsThemeModalOpen(!isThemeModalOpen);
  };

  const closeModal = () => {
    setIsThemeModalOpen(false);
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row pt-5 p-4 lg:gap-10 justify-center items-center lg:items-start min-h-dvh">
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
                placeholder={`# Heading 1\n## Heading 2\n### Heading 3\n\n**Bold Text**\n*Italic Text*\n\n[Link Text](https://example.com)`}
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
        <div className="relative border-zinc-950 dark:border-zinc-950 bg-zinc-950 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
          <div className="w-[148px] h-[18px] bg-zinc-950 top-0 rounded-b-[1rem] left-1/2 transform -translate-x-1/2 absolute"></div>
          <div className="h-[46px] w-[3px] bg-zinc-950 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-zinc-950 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-zinc-950 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
          <div
            className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] p-4 pt-6"
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
      </section>

      {/* Theme Modal */}
      {isThemeModalOpen && (
        <div className="modal-overlay">
          <dialog
            open
            className="modal modal-bottom sm:modal-middle max-w-full z-50"
          >
            <div className="modal-box flex gap-4 flex-col z-40 bg-base-300">
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
