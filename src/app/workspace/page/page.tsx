"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LuLink, LuUser } from "react-icons/lu";
import Image from "next/image";
import { IoColorPaletteOutline } from "react-icons/io5";
import { themesArray } from "@/lib/themes";
import { ThemeTile } from "@/components/ThemeTile";
import ReactMarkdown from "react-markdown";
import { useSession } from "next-auth/react";
import { LoginIsRequiredClient } from "@/lib/auth";
const Page = () => {
  LoginIsRequiredClient();

  const { data: session } = useSession();

  const [themes, setThemes] = useState<string[]>(themesArray);

  const [profileImage, setProfileImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [bioMarkdown, setBioMarkdown] = useState<string>("");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  useEffect(() => {
    const currentUser = session?.user;
    setProfileImage(currentUser?.image || "");
    setName(currentUser?.name || "");
  }, []);

  const toggleModal = () => {
    setIsThemeModalOpen(!isThemeModalOpen);
  };

  const closeModal = () => {
    setIsThemeModalOpen(false);
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row pt-5 p-4 lg:gap-10 justify-center items-center min-h-dvh">
        <div className="p-5">
          {/* Profile Picture */}
          <div className="avatar rounded-full">
            <div className="w-14 sm:w-16 rounded-full">
              {profileImage && (
                <Image src={profileImage} alt="" width={96} height={96} />
              )}
            </div>
          </div>

          {/* Page Form */}
          <ul className="flex flex-col gap-5">
            <li>
              <p className="mb-2 text-sm font-medium text-white">Name</p>
              <label className="input input-nofocus input-bordered flex items-center gap-2">
                <LuUser />
                <input
                  className=""
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
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
            data-theme={selectedTheme}
          >
            <span>
              <div className="avatar rounded-full">
                <div className="w-12 sm:w-12 rounded-full">
                  {profileImage && (
                    <Image
                      src={
                        "https://qnaect-aws-s3-arimanjikian.s3.us-east-2.amazonaws.com/profile.jpg"
                      }
                      alt=""
                      width={96}
                      height={96}
                    />
                  )}
                </div>
              </div>
              <h1 className="font-extrabold">{name}</h1>
            </span>
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
            <div className="modal-box flex gap-4 flex-col z-40 bg-base-300 pt-20 sm:pt-6">
              <button className="btn btn-error w-24" onClick={closeModal}>
                Close
              </button>
              <div className="rounded-box grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {themes.map((theme) => {
                  return (
                    <ThemeTile
                      theme={theme}
                      currentTheme={selectedTheme}
                      setCurrentTheme={setSelectedTheme}
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

// components/UploadForm.tsx

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUrl(data.fileUrl);
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Upload a file</span>
        </label>
        <input
          type="file"
          className="file-input file-input-bordered"
          onChange={handleFileChange}
        />
      </div>
      {preview && (
        <div className="mt-4">
          {file?.type.startsWith("image/") ? (
            <img
              src={preview}
              alt="File preview"
              className="max-w-xs max-h-xs"
            />
          ) : (
            <p>File selected: {file?.name}</p>
          )}
        </div>
      )}
      <button
        type="submit"
        className={`btn ${uploading ? "loading" : ""}`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {url && (
        <div className="mt-4">
          <p>
            File uploaded successfully:{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </p>
        </div>
      )}
    </form>
  );
};
