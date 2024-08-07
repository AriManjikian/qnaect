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
import { FaBriefcase } from "react-icons/fa";
import NewTabLink from "@/components/NewTabLink";
import { CiSaveUp2 } from "react-icons/ci";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { useUser } from "@/providers/CurrentUserProvider";
import { socialMediaPlatforms } from "@/lib/platforms";
import { fetchData } from "@/lib/fetchData";

type UserLinkType = {
  platform: string;
  url: string;
};

const Page = () => {
  LoginIsRequiredClient();

  const { data: session } = useSession();
  const { currentUser } = useUser();

  const [name, setName] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [bioMarkdown, setBioMarkdown] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [userLinks, setUserLinks] = useState<{
    [key: string]: UserLinkType;
  }>({});
  const [profileImage, setProfileImage] = useState<string>("");

  const [themes, setThemes] = useState<string[]>(themesArray);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [hoverImageInput, setHoverImageInput] = useState(false);
  const [URLInput, setURLInput] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("ask");

  // Max Lengths
  const maxNameLength = 26;
  const maxOccupationLength = 50;
  const maxBioLength = 400;
  const getMaxLengthClass = (remaining: number) => {
    if (remaining <= 5) return "text-red-500";
    if (remaining <= 10) return "text-orange-500";
    if (remaining <= 15) return "text-yellow-500";
    return "";
  };

  // Theme Modal
  const toggleModal = () => {
    setIsThemeModalOpen(!isThemeModalOpen);
  };
  const closeModal = () => {
    setIsThemeModalOpen(false);
  };

  // Get signed url, upload image to s3
  const uploadToS3 = async (file: File) => {
    try {
      // Get the signed URL from your API
      const { responseData, ok } = await fetchData("/api/uploads3", "POST", {
        fileName: file.name,
        fileType: file.type,
      });

      if (!ok) {
        throw new Error("Failed to get signed URL");
      }

      const { signedUrl } = responseData;

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

      const imageUrl = signedUrl.split("?")[0];
      setProfileImage(imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Change profile image
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Add platform to userLinks array
  const addPlatformLink = (platform: string, url: string) => {
    let urlPattern = /^(https?:\/\/)/;
    if (!urlPattern.test(url)) {
      url = "https://" + url;
    }
    setUserLinks((prevLinks) => ({
      ...prevLinks,
      [platform]: { platform, url },
    }));
    setURLInput("");
  };

  // Save changes to db
  const handleSaveChanges = async () => {
    if (
      name.length > maxNameLength ||
      occupation.length > maxOccupationLength ||
      bioMarkdown.length > maxBioLength
    ) {
      toast.error("Plese don't exceed maximum character length.", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }

    let image = profileImage;
    if (profileImage !== session?.user?.image && selectedFile) {
      const s3ImageURL = await uploadToS3(selectedFile);
      if (s3ImageURL) image = s3ImageURL;
    }

    const toastId = toast.loading("Saving changes...", {
      position: "bottom-right",
    });

    try {
      const { responseData, ok } = await fetchData("/api/updateuser", "POST", {
        name: name,
        occupation: occupation,
        bio: bioMarkdown,
        links: userLinks,
        image: image,
        theme: selectedTheme,
      });
      console.log(ok, responseData);
      if (!ok) {
        throw new Error("Failed to save changes!");
      }

      toast.update(toastId, {
        render: "Changes saved successfully!",
        position: "bottom-right",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error: any) {
      toast.update(toastId, {
        render: "Failed to save changes!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.log(error);
    }
  };

  // Initiize state
  useEffect(() => {
    if (currentUser) {
      setProfileImage(currentUser?.image || "");
      setName(currentUser?.name || "");
      setBioMarkdown(currentUser?.bio || "");
      setOccupation(currentUser?.occupation || "");
      setUserLinks(currentUser?.links || {});
      setSelectedTheme(currentUser?.theme || "");
    }
  }, [currentUser]);

  // Add claimed username
  const [username, setUsername] = useState<string | undefined>("");

  useEffect(() => {
    const addUsername = async (fetchedUsername: string) => {
      try {
        const { responseData, ok } = await fetchData(
          "/api/addusername",
          "POST",
          {
            username: fetchedUsername,
          }
        );

        if (!ok) {
          toast.error(`${responseData.message}`, {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error("Error adding username:", error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const fetchedUsername = urlParams.get("username");
    if (fetchedUsername) {
      urlParams.delete("username");
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.replaceState(null, "", newUrl);
      if (!currentUser?.username) {
        setUsername(fetchedUsername);
        addUsername(fetchedUsername);
      } else {
        toast.info("You already have a claimed link, change it in settings.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    }
  }, [currentUser]);

  return (
    <>
      <section className="flex flex-col lg:flex-row pt-5 p-4 lg:gap-10 justify-center items-center md:items-start md:pt-10 min-h-dvh">
        <div className="p-5 max-w-4/5">
          {/* Page Form */}
          <ul className="flex flex-col gap-5">
            <li className="flex items-end gap-4">
              {/* Profile Picture */}
              {!currentUser ? (
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              ) : (
                <>
                  <div
                    className="relative avatar rounded-full"
                    onMouseEnter={() => setHoverImageInput(true)}
                    onMouseLeave={() => setHoverImageInput(false)}
                  >
                    <div className="size-16 rounded-full overflow-hidden">
                      {profileImage && (
                        <Image
                          src={profileImage}
                          alt="Profile"
                          width={300}
                          height={300}
                        />
                      )}
                      {/* File Selection */}
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
                </>
              )}
              {/* Name Input */}
              <span className="w-full">
                <p className="mb-2 text-sm font-medium text-white">Name</p>
                <label className="input input-nofocus input-bordered flex items-center gap-2">
                  <LuUser />
                  <input
                    className="w-full"
                    placeholder="Your Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <p
                    className={`text-sm text-right ${getMaxLengthClass(
                      maxNameLength - name.length
                    )}`}
                  >
                    {maxNameLength - name.length <= 15
                      ? `(${maxNameLength - name.length})`
                      : ""}
                  </p>
                </label>
              </span>
            </li>
            {/* Occupation Input */}
            <li>
              <p className="mb-2 text-sm font-medium text-white">Occupation</p>
              <label className="input input-nofocus input-bordered flex items-center gap-2">
                <FaBriefcase />
                <input
                  className="w-full"
                  placeholder="Your Occupation"
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  required
                />{" "}
                <p
                  className={`text-sm text-right ${getMaxLengthClass(
                    maxOccupationLength - occupation.length
                  )}`}
                >
                  {maxOccupationLength - occupation.length <= 15
                    ? `(${maxOccupationLength - occupation.length})`
                    : ""}
                </p>
              </label>
            </li>
            {/* Bio Input */}
            <li>
              <p className="mb-2 text-sm font-medium text-white">
                Bio (Use Markdown)
              </p>
              <textarea
                className="textarea textarea-bordered input-nofocus w-full min-h-56"
                rows={8}
                value={bioMarkdown}
                placeholder={`New Line (2 spaces + Enter)\n# Heading 1\n## Heading 2\n### Heading 3\n**Bold Text**\n*Italic Text*\n[Link Text](https://example.com)`}
                onChange={(e) => setBioMarkdown(e.target.value)}
              />
              <p
                className={`text-sm text-right ${getMaxLengthClass(
                  maxBioLength - bioMarkdown.length
                )}`}
              >
                {maxBioLength - bioMarkdown.length <= 15
                  ? `(${maxBioLength - bioMarkdown.length})`
                  : ""}
              </p>
            </li>
            {/* Social Links */}
            <li className="flex flex-wrap justify-center max-w-dvw">
              {Object.entries(socialMediaPlatforms).map(([platform, icon]) => (
                <button
                  key={platform}
                  className="btn btn-ghost text-xl"
                  onClick={() => {
                    if (selectedPlatform === platform) {
                      setSelectedPlatform("");
                    } else {
                      setSelectedPlatform(platform);
                    }
                    setURLInput("");
                  }}
                >
                  {icon}
                </button>
              ))}
            </li>
            {/* Social URL Input */}
            <li className="w-full">
              {selectedPlatform && (
                <div className="join w-full">
                  <label className="join-item input input-nofocus input-bordered flex items-center gap-2 w-full">
                    {socialMediaPlatforms[selectedPlatform]}
                    <input
                      className="w-full"
                      placeholder={`Enter your ${selectedPlatform} url. (https://yourLink.com)`}
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
            <li className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between w-full">
              {/* Theme Button */}
              <div>
                <button
                  className="btn btn-primary rounded-lg"
                  onClick={toggleModal}
                >
                  Change Theme
                  <IoColorPaletteOutline size={25} />
                </button>
              </div>
              {/* Save Changes Button */}
              <div>
                <button
                  className="btn btn-primary rounded-lg"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                  <CiSaveUp2 size={25} />
                </button>
              </div>
            </li>
          </ul>
        </div>
        {/* Phone Mockup */}
        <div className="divider md:hidden"></div>
        <div className="relative border-zinc-950 dark:border-zinc-950 bg-zinc-950 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
          <div className="w-[148px] h-[18px] bg-zinc-950 top-0 rounded-b-[1rem] left-1/2 transform -translate-x-1/2 absolute"></div>
          <div className="h-[46px] w-[3px] bg-zinc-950 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-zinc-950 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-zinc-950 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
          <div
            className="rounded-[2rem] no-scrollbar overflow-y-scroll w-[272px] h-[572px] p-4 pt-10"
            data-theme={selectedTheme}
          >
            {!currentUser ? (
              <ProfileSkeleton />
            ) : (
              <>
                <span className="flex gap-4 items-start">
                  <div className="avatar rounded-full">
                    <div className="w-12 sm:w-12 rounded-full">
                      {profileImage && (
                        <Image
                          src={profileImage}
                          alt=""
                          width={2000}
                          height={2000}
                        />
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
                      <NewTabLink href={props.href}>
                        {props.children}
                      </NewTabLink>
                    ),
                  }}
                >
                  {bioMarkdown}
                </ReactMarkdown>
                {Object.keys(userLinks).length > 0 && (
                  <>
                    <div className="divider m-0"></div>
                    <span
                      data-tip="Scrolls on mobile"
                      className="lg:tooltip w-full"
                    >
                      <span className="flex overflow-x-auto no-scrollbar carousel z-30 ">
                        {Object.entries(userLinks).map(([key, link]) => (
                          <a
                            key={key}
                            href={link.url}
                            className="btn btn-ghost carousel-item text-xl"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {socialMediaPlatforms[link.platform]}
                          </a>
                        ))}
                      </span>
                    </span>
                  </>
                )}

                <div className="divider m-0"></div>
                <div role="tablist" className="tabs tabs-boxed rounded-lg">
                  <button
                    role="tab"
                    className={`tab text-xs ${
                      selectedTab === "ask" ? "tab-active" : ""
                    }`}
                    onClick={() => setSelectedTab("ask")}
                  >
                    Ask Question
                  </button>
                  <button
                    role="tab"
                    className={`tab text-xs ${
                      selectedTab === "answer" ? "tab-active" : ""
                    }`}
                    onClick={() => setSelectedTab("answer")}
                  >
                    View Answers
                  </button>
                </div>
                <div className="relative">
                  <textarea
                    className="textarea textarea-bordered rounded-lg input-nofocus w-full mt-4 bg-base-200 placeholder:text-base-content min-h-24"
                    placeholder="Ask me a question!"
                    rows={5}
                  ></textarea>
                  <button className="btn btn-primary rounded-lg btn-sm absolute bottom-4 right-2">
                    Send
                  </button>
                </div>
              </>
            )}
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
            <div className="modal-box flex gap-4 flex-col z-40 bg-base-200 pt-20 sm:pt-6">
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
