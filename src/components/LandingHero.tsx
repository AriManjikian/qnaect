import { useEffect, useRef, useState, MutableRefObject } from "react";
import {
  FaArrowRight,
  FaHandshake,
  FaQuestion,
  FaTrophy,
} from "react-icons/fa";
import Image from "next/image";
import profile from "@/public/profile.jpg";
import { FaQuestionCircle } from "react-icons/fa";
import FeaturedComponent from "./FeaturedComponent";

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

  const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
    const elementsRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement; // Cast to HTMLElement
          const animationClass = element.dataset.animation || "";
          if (entry.isIntersecting) {
            element.classList.add(
              animationClass,
              "animate-once",
              "animate-ease-in-out"
            );
          } else {
            element.classList.remove(
              animationClass,
              "animate-once",
              "animate-ease-in-out"
            );
          }
        });
      }, options);

      elementsRef.current.forEach((element) => {
        if (element) observer.observe(element);
      });

      return () => {
        elementsRef.current.forEach((element) => {
          if (element) observer.unobserve(element);
        });
      };
    }, [options]);

    return elementsRef;
  };

  const observerOptions = { threshold: 0.5 };
  const elementsRef = useIntersectionObserver(observerOptions);

  return (
    <section id="hero">
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 pb-10 pt-20">
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
        <div
          ref={(el) => {
            if (el) elementsRef.current.push(el);
          }}
          data-animation="animate-fade-up"
          className="animate-delay-200 relative border-zinc-950 dark:border-zinc-950 bg-zinc-950 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl"
        >
          <div className="w-[148px] h-[18px] bg-zinc-950 top-0 rounded-b-[1rem] left-1/2 transform -translate-x-1/2 absolute"></div>
          <div className="h-[46px] w-[3px] bg-zinc-950 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-zinc-950 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-zinc-950 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        </div>
      </div>
      <FeaturedComponent />
    </section>
  );
};

export default LandingHero;
