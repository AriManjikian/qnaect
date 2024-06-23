import Image from "next/image";
import React from "react";
import { FaArrowRight, FaStar } from "react-icons/fa6";
import FeaturedComponent from "./FeaturedComponent";

const LandingHero = () => {
  return (
    <>
      <section id="hero">
        <div className="mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-6">
          <div className="max-w-xl flex flex-col gap-10 lg:gap-8 items-center justify-center text-center lg:text-left lg:items-start">
            <h1 className="select-none font-extrabold text-3xl lg:text-5xl tracking-tight md:-mb-4 flex flex-col items-center lg:items-start">
              <span>
                Transform{" "}
                <span className="after-transform relative decoration-dashed decoration-primary underline secondary-text inline hover:decoration-blue-500">
                  questions
                </span>{" "}
              </span>
              <span>
                into{" "}
                <span className="after-transform relative decoration-dashed decoration-primary underline secondary-text inline hover:decoration-blue-500">
                  connections
                </span>
              </span>
              <span>with ease</span>
            </h1>
            <p className="text-md opacity-80 max-w-sm select-none">
              Claim your personal Q&A page to effectively engage with your
              audience. We make it easy for you to answer meaningful questions.
            </p>

            <div className="join">
              <label className="input input-bordered input-group flex items-center gap-2 join-item rounded-l-lg">
                qnaect.com/
                <input type="text" placeholder="username" />
              </label>
              <button className="btn btn-primary join-item rounded-r-lg">
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
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        width={50}
                        height={50}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <p>202 members use qnaect</p>
              <span>
                <FaStar className="text-yellow-500 inline text-2xl" />
                <FaStar className="text-yellow-500 inline text-2xl" />
                <FaStar className="text-yellow-500 inline text-2xl" />
                <FaStar className="text-yellow-500 inline text-2xl" />
                <FaStar className="text-yellow-500 inline text-2xl" />
              </span>
            </section>
          </div>
          <div className="h-1/2 md:h-full block relative max-md:-m-4 lg:w-50">
            <div className="mockup-phone ">
              <div className="camera"></div>
              <div className="display">
                <div className="artboard artboard-demo phone-2">Hi.</div>
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
