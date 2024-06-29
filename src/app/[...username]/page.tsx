"use client";
import NewTabLink from "@/components/NewTabLink";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { socialMediaPlatforms } from "@/lib/platforms";
import { UserType } from "@/models/user";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuLink } from "react-icons/lu";
import ReactMarkdown from "react-markdown";

export default function Profile({ params }: { params: { username: string } }) {
  const [profileData, setProfileData] = useState<UserType | null>(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("/api/search/profiledata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: params.username,
          }),
        });
        const responseData = await response.json();

        setProfileData(responseData);
      };

      fetchData();
    } catch (error) {}
  }, []);

  return (
    <div className="p-6 min-h-dvh" data-theme={profileData?.theme}>
      {!profileData ? (
        <ProfileSkeleton />
      ) : (
        <>
          <span className="flex gap-4 items-start">
            <div className="avatar rounded-full">
              <div className="w-12 sm:w-12 rounded-full">
                {profileData.image && (
                  <Image
                    src={profileData.image}
                    alt=""
                    width={96}
                    height={96}
                  />
                )}
              </div>
            </div>
            <span className="flex flex-col max-w-28">
              <h1 className="text-md font-extrabold text-clip overflow-hidden w-full ">
                {profileData.name}
              </h1>
              <h2 className="text-sm text-clip overflow-hidden">
                {profileData.occupation}
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
            {profileData.bio}
          </ReactMarkdown>
          {Object.keys(profileData.links).length > 0 && (
            <>
              <div className="divider m-0"></div>
              <span data-tip="Scrolls on mobile" className="lg:tooltip w-full">
                <span className="flex overflow-x-auto no-scrollbar carousel z-30 ">
                  {Object.entries(profileData.links).map(
                    ([key, link]: [string, any]) => (
                      <a
                        key={key}
                        href={link.url}
                        className="btn btn-ghost carousel-item text-xl"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {socialMediaPlatforms[link.platform]}
                      </a>
                    )
                  )}
                </span>
              </span>
            </>
          )}

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
        </>
      )}
    </div>
  );
}
