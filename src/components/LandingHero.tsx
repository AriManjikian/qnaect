import { useEffect, useRef, useState, MutableRefObject } from "react";
import { FaArrowRight, FaHandshake, FaTrophy } from "react-icons/fa";
import Image from "next/image";
import profile from "@/public/profile.jpg";
import { FaQuestionCircle } from "react-icons/fa";
import FeaturedComponent from "./FeaturedComponent";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { LuLink } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import NewTabLink from "./NewTabLink";
import { socialMediaPlatforms } from "@/lib/platforms";

const LandingHero = () => {
  const [username, setUsername] = useState<string>("");
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);

  const handleClaim = () => {
    if (username.trim() !== "") {
      // Redirect to /login with username as query parameter
      window.location.href = `/login?username=${encodeURIComponent(username)}`;
    }
  };

  const observerOptions = { threshold: 0.5 };
  const elementsRef = useIntersectionObserver(observerOptions);

  return (
    <section id="hero">
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 pb-10 pt-24">
        <div className="max-w-xl flex flex-col gap-10 lg:gap-8 items-center justify-center text-center lg:text-left lg:items-start">
          <div className="indicator">
            <span className="indicator-item">
              <label
                ref={(el) => {
                  if (el) elementsRef.current.push(el);
                }}
                data-animation="animate-fade-up"
                className="swap swap-flip text-4xl rotate-12"
              >
                <input type="checkbox" checked={isFlipped} readOnly />
                <div className="swap-off">
                  <FaQuestionCircle />
                </div>
                <div className="swap-on">
                  <FaHandshake />
                </div>
              </label>
            </span>

            <h1
              ref={(el) => {
                if (el) elementsRef.current.push(el);
              }}
              data-animation="animate-fade-up"
              className="select-none font-extrabold text-3xl lg:text-5xl tracking-tight md:-mb-4 flex flex-col items-center lg:items-start"
            >
              <span>
                Transform{" "}
                <span
                  className="after-transform relative decoration-dashed decoration-primary underline secondary-text inline hover:decoration-accent"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  questions
                </span>{" "}
              </span>
              <span>
                into{" "}
                <span
                  className="after-transform relative decoration-dashed decoration-primary underline secondary-text inline hover:decoration-accent"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  connections
                </span>
              </span>
              <span>with ease</span>
            </h1>
          </div>
          <p
            ref={(el) => {
              if (el) elementsRef.current.push(el);
            }}
            data-animation="animate-fade-up"
            className="animate-delay-100 text-md opacity-80 max-w-sm select-none"
          >
            Claim your personal Q&A page to effectively engage with your
            audience. We make it easy for you to answer meaningful questions.
          </p>
          <div
            ref={(el) => {
              if (el) elementsRef.current.push(el);
            }}
            data-animation="animate-fade-up"
            className="animate-delay-200 join lg:border-2 lg:rounded-r-xl lg:rounded-l-lg lg:border-transparent lg:focus-within:border-primary"
          >
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

          <section
            ref={(el) => {
              if (el) elementsRef.current.push(el);
            }}
            data-animation="animate-fade-up"
            className="animate-delay-300 flex flex-col items-center lg:items-start"
          >
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12">
                  <a href="">
                    <Image alt="Profile" src={profile} width={50} height={50} />
                  </a>
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <a href="">
                    <Image alt="Profile" src={profile} width={50} height={50} />
                  </a>
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <a href="">
                    <Image alt="Profile" src={profile} width={50} height={50} />
                  </a>
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <a href="">
                    <Image alt="Profile" src={profile} width={50} height={50} />
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
        <div className="relative border-zinc-950 dark:border-zinc-950 bg-zinc-950 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
          <div className="w-[148px] h-[18px] bg-zinc-950 top-0 rounded-b-[1rem] left-1/2 transform -translate-x-1/2 absolute"></div>
          <div className="h-[46px] w-[3px] bg-zinc-950 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-zinc-950 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-zinc-950 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
          <div className="rounded-[2rem] no-scrollbar overflow-y-scroll w-[272px] h-[572px] p-4 pt-10 bg-base-100">
            <>
              <span className="flex gap-4 items-start">
                <div className="avatar rounded-full">
                  <div className="w-12 sm:w-12 rounded-full">
                    <Image src={profile} alt="" width={2000} height={2000} />
                  </div>
                </div>
                <span className="flex flex-col max-w-28">
                  <h1 className="text-md font-extrabold text-clip overflow-hidden w-full ">
                    Your Name
                  </h1>
                  <h2 className="text-sm text-clip overflow-hidden">
                    Content Creator
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
                {`Hey, this is qnaect!  
                    Follow us on our journey.
                  `}
              </ReactMarkdown>
              {Object.keys(socialMediaPlatforms).length > 0 && (
                <>
                  <div className="divider m-0"></div>
                  <span
                    data-tip="Scrolls on mobile"
                    className="lg:tooltip w-full"
                  >
                    <span className="flex overflow-x-auto no-scrollbar carousel z-30 ">
                      {Object.entries(socialMediaPlatforms).map(
                        ([key, platform]) => (
                          <a
                            key={key}
                            className="btn btn-ghost carousel-item text-xl"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {socialMediaPlatforms[key]}
                          </a>
                        )
                      )}
                    </span>
                  </span>
                </>
              )}

              <div className="divider m-0"></div>
              <div role="tablist" className="tabs tabs-boxed rounded-lg">
                <button role="tab" className="tab text-xs tab-active">
                  Ask Question
                </button>
                <button role="tab" className="tab text-xs">
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
          </div>
        </div>
      </div>
      <FeaturedComponent />
    </section>
  );
};

export default LandingHero;
