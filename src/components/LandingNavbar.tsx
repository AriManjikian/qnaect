"use client";
import { themesArray } from "@/lib/themes";
import Link from "next/link";
import React, { useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";

const LandingNavbar = () => {
  const [themes, setThemes] = useState<string[]>(themesArray);

  return (
    <>
      <div className="navbar z-50 fixed navbar-blur bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <RiMenu2Fill />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="#features" className="font-bold">
                  Features
                </a>
              </li>
              <li>
                <a href="#demo" className="font-bold">
                  Demo
                </a>
              </li>
              <li>
                <a href="#faq" className="font-bold">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#pricing" className="font-bold">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <a href="" className="btn btn-ghost text-xl">
            qnaect
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="#features" className="font-bold">
                Features
              </a>
            </li>
            <li>
              <a href="#demo" className="font-bold">
                Demo
              </a>
            </li>
            <li>
              <a href="#faq" className="font-bold">
                FAQ
              </a>
            </li>
            <li>
              <a href="#pricing" className="font-bold">
                Pricing
              </a>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 navbar-end">
          <Link href={"/login"} className="btn btn-primary rounded-lg">
            Log In
            <IoLogInOutline className="text-xl md:text-2xl" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingNavbar;
