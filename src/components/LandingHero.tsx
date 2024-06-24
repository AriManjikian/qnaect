"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaArrowRight,
  FaHandshake,
  FaQuestion,
  FaTrophy,
} from "react-icons/fa6";
import FeaturedComponent from "./FeaturedComponent";
import profile from "@/public/profile.jpg";
import { FaQuestionCircle } from "react-icons/fa";
const LandingHero = () => {
  const [username, setUsername] = useState("");

  const handleClaim = () => {
    if (username.trim() !== "") {
      // Redirect to /login with username as query parameter
      window.location.href = `/login?username=${encodeURIComponent(username)}`;
    }
  };
  return (
    <>
      <section id="hero">
        <div className="mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 pb-10 pt-20">
          <div className="max-w-xl flex flex-col gap-10 lg:gap-8 items-center justify-center text-center lg:text-left lg:items-start">
            <div className="indicator">
              <span className="indicator-item">
                <label className="swap swap-flip text-4xl rotate-12">
                  <input type="checkbox" />

                  <div className="swap-on">
                    <FaQuestionCircle />
                  </div>
                  <div className="swap-off">
                    <FaHandshake />
                  </div>
                </label>
              </span>

              <h1 className="select-none font-extrabold text-3xl lg:text-5xl tracking-tight md:-mb-4 flex flex-col items-center lg:items-start">
                <span>
                  Transform{" "}
                  <span className="after-transform relative decoration-dashed decoration-primary underline secondary-text inline hover:decoration-accent">
                    questions
                  </span>{" "}
                </span>
                <span>
                  into{" "}
                  <span className="after-transform relative decoration-dashed decoration-primary underline secondary-text inline hover:decoration-accent">
                    connections
                  </span>
                </span>
                <span>with ease</span>
              </h1>
            </div>
            <p className="text-md opacity-80 max-w-sm select-none">
              Claim your personal Q&A page to effectively engage with your
              audience. We make it easy for you to answer meaningful questions.
            </p>
            <div className="join lg:border-2 lg:rounded-r-xl lg:rounded-l-lg lg:border-transparent lg:focus-within:border-primary">
              <label className="input input-nofocus input-bordered input-group flex items-center gap-2 join-item rounded-l-lg w-56 lg:w-96">
                qnaect.com/
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                />
              </label>
              <button
                onClick={handleClaim}
                className="btn btn-primary join-item rounded-r-lg"
              >
                Claim
                <FaArrowRight />
              </button>
            </div>

            <section className="flex flex-col items-center lg:items-start">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <a href="">
                      <Image
                        alt="Profile"
                        src={profile}
                        width={50}
                        height={50}
                      />
                    </a>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <a href="">
                      <Image
                        alt="Profile"
                        src={profile}
                        width={50}
                        height={50}
                      />
                    </a>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <a href="">
                      <Image
                        alt="Profile"
                        src={profile}
                        width={50}
                        height={50}
                      />
                    </a>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <a href="">
                      <Image
                        alt="Profile"
                        src={profile}
                        width={50}
                        height={50}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <p>- members use qnaect</p>
              <span className="flex gap-2 items-center text-primary">
                <p className="font-bold ">Claim your personal page</p>
                <FaTrophy />
              </span>
            </section>
          </div>
          <div className="md:h-full block relative max-md:-m-4 lg:w-50">
            <div className="mockup-phone hidden lg:block">
              <div className="camera"></div>
              <div className="display">
                <div className="artboard artboard-demo phone-1"></div>
              </div>
            </div>
          </div>
        </div>
        <FeaturedComponent />
      </section>
    </>
  );
};

export default LandingHero;
