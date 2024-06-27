"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { LuLink, LuUser } from "react-icons/lu";
import Image from "next/image";
import { IoColorPaletteOutline } from "react-icons/io5";
import { themesArray } from "@/lib/themes";
import { ThemeTile } from "@/components/ThemeTile";
import ReactMarkdown from "react-markdown";
import { useSession } from "next-auth/react";
import { LoginIsRequiredClient } from "@/lib/auth";
import { FiCamera } from "react-icons/fi";
import {
  FaBriefcase,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaTelegram,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import NewTabLink from "@/components/NewTabLink";
import { FaXTwitter } from "react-icons/fa6";
import { Platform } from "aws-sdk/clients/cognitosync";
const Page = () => {
  LoginIsRequiredClient();

  type PlatformType = {
    platform: string;
    icon: JSX.Element;
  };

  type UserLinkType = {
    platform: PlatformType;
    url: string;
  };

  const { data: session } = useSession();

  const [name, setName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [bioMarkdown, setBioMarkdown] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | null>(
    null
  );
  const [userLinks, setUserLinks] = useState<{
    [key: string]: UserLinkType;
  }>({
    GitHub: {
      platform: { platform: "GitHub", icon: <FaGithub /> },
      url: "https://github.com/arimanjikian",
    },
  });
  const [URLInput, setURLInput] = useState<string>("");

  const [themes, setThemes] = useState<string[]>(themesArray);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [hoverImageInput, setHoverImageInput] = useState(false);

  const socialMediaPlatforms = [
    { platform: "GitHub", icon: <FaGithub /> },
    { platform: "Twitter", icon: <FaXTwitter /> },
    { platform: "YouTube", icon: <FaYoutube /> },
    { platform: "Instagram", icon: <FaInstagram /> },
    { platform: "LinkedIn", icon: <FaLinkedin /> },
    { platform: "Dribbble", icon: <FaDribbble /> },
    { platform: "Twitch", icon: <FaTwitch /> },
    { platform: "Telegram", icon: <FaTelegram /> },
    { platform: "Medium", icon: <FaMedium /> },
  ];

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

  const uploadToS3 = async (file: File) => {
    try {
      // Get the signed URL from your API
      const response = await fetch("/api/uploads3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get signed URL");
      }

      const { signedUrl } = await response.json();

      // Upload to S3 using the signed URL
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      console.log("File uploaded successfully");

      // Use the signed URL to set the profile image
      // Remove the query string from the URL
      const imageUrl = signedUrl.split("?")[0];
      setProfileImage(imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const addPlatformLink = (platform: PlatformType, url: string) => {
    let urlPattern = /^(https?:\/\/)/;
    if (!urlPattern.test(url)) {
      url = "https://" + url;
    }
    setUserLinks((prevLinks) => ({
      ...prevLinks,
      [platform.platform]: { platform, url },
    }));
    setURLInput(""); // Clear the input after adding
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row pt-5 p-4 lg:gap-10 justify-center items-center min-h-dvh">
        <div className="p-5 max-w-4/5">
          {/* Page Form */}
          <ul className="flex flex-col gap-5">
            <li className="flex items-end gap-4">
              {/* Profile Picture */}
              <div
                className="relative avatar rounded-full"
                onMouseEnter={() => setHoverImageInput(true)}
                onMouseLeave={() => setHoverImageInput(false)}
              >
                <div className="w-14 sm:w-16 rounded-full overflow-hidden">
                  {profileImage && (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={96}
                      height={96}
                    />
                  )}
                  {hoverImageInput && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full">
                      <FiCamera size={20} className="text-white" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
              <span className="w-full">
                <p className="mb-2 text-sm font-medium text-white">Name</p>
                <label className="input input-nofocus input-bordered flex items-center gap-2">
                  <LuUser />
                  <input
                    placeholder="Your Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
              </span>
              <li>
                <button
                  className="btn btn-primary rounded-lg"
                  onClick={toggleModal}
                >
                  <IoColorPaletteOutline size={25} />
                </button>
              </li>
            </li>
            <li>
              <p className="mb-2 text-sm font-medium text-white">Occupation</p>
              <label className="input input-nofocus input-bordered flex items-center gap-2">
                <FaBriefcase />
                <input
                  placeholder="Your Occupation"
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
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
                placeholder={`New Line (2 spaces + Enter)\n# Heading 1\n## Heading 2\n### Heading 3\n**Bold Text**\n*Italic Text*\n[Link Text](https://example.com)`}
                onChange={(e) => setBioMarkdown(e.target.value)}
              />
            </li>

            <li className="flex flex-wrap justify-center max-w-4/5">
              {socialMediaPlatforms.map(({ platform, icon }) => (
                <button
                  key={platform}
                  className="btn btn-ghost text-xl"
                  onClick={() => {
                    setSelectedPlatform({ platform, icon });
                    setURLInput("");
                  }}
                >
                  {icon}
                </button>
              ))}
            </li>
            <li className="w-full">
              {selectedPlatform && (
                <div className="join w-full">
                  <label className="join-item input input-nofocus input-bordered flex items-center gap-2 w-full">
                    {selectedPlatform.icon}
                    <input
                      className="w-full"
                      placeholder={`Enter your ${selectedPlatform.platform} url. (https://yourLink.com)`}
                      type="text"
                      value={URLInput}
                      onChange={(e) => setURLInput(e.target.value)}
                      required
                    />
                  </label>
                  <button
                    className="btn btn-primary join-item"
                    onClick={(e) => {
                      addPlatformLink(selectedPlatform, URLInput);
                    }}
                  >
                    Add
                  </button>
                </div>
              )}
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
            className="rounded-[2rem] no-scrollbar overflow-y-scroll w-[272px] h-[572px] p-4 pt-10"
            data-theme={selectedTheme}
          >
            <span className="flex gap-4 items-center">
              <div className="avatar rounded-full">
                <div className="w-12 sm:w-12 rounded-full">
                  {profileImage && (
                    <Image src={profileImage} alt="" width={96} height={96} />
                  )}
                </div>
              </div>
              <span className="flex flex-col max-w-28">
                <h1 className="text-md font-extrabold text-clip overflow-hidden w-full ">
                  {name}
                </h1>
                <h2 className="text-sm text-clip overflow-hidden">
                  {occupation}
                </h2>
              </span>
              <button className="btn btn-primary btn-sm ml-auto rounded-lg">
                <LuLink />
              </button>
            </span>
            <ReactMarkdown
              className="pt-5 whitespace-normal markdown text-sm overflow-wrap-break-word"
              components={{
                a: ({ node, ...props }) => (
                  <NewTabLink href={props.href}>{props.children}</NewTabLink>
                ),
              }}
            >
              {bioMarkdown}
            </ReactMarkdown>
            <div className="divider m-0"></div>
            <span data-tip="Scrolls on mobile" className="lg:tooltip w-full">
              <span className="flex overflow-x-auto no-scrollbar carousel z-30 ">
                {Object.entries(userLinks).map(([key, link]) => (
                  <a
                    key={key}
                    href={link.url}
                    className="btn btn-ghost carousel-item text-md md:text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.platform.icon}
                  </a>
                ))}
              </span>
            </span>

            <div className="divider m-0"></div>

            <div className="relative">
              <textarea
                className="textarea textarea-bordered rounded-lg input-nofocus w-full mt-4 bg-base-300 placeholder:text-base-content min-h-24"
                placeholder="Ask me a question!"
                rows={5}
              ></textarea>
              <button className="btn btn-primary rounded-lg btn-sm absolute bottom-4 right-2">
                Send
              </button>
            </div>
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
