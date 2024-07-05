"use client";
import Link from "next/link";
import { LuMail } from "react-icons/lu";
import { MdOutlineContactPage, MdSettings } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: any }) {
  return (
    <section data-theme="" className="h-dvh">
      <WorkspaceNav />
      <div className="drawer md:drawer-open h-full w-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content pt-16 md:pl-80 lg:pt-0">
          {/* Page content here */}
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="flex flex-col menu bg-base-300 text-base-content fixed min-h-dvh w-80 p-0">
            {/* Sidebar content here */}
            <SidebarContent />
            {/* <SidebarCard /> */}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

const WorkspaceNav = () => {
  return (
    <div className="navbar fixed md:hidden bg-base-300 z-50">
      <ul className="flex justify-center w-dvw gap-2">
        <li>
          <Link
            href={"/workspace/page"}
            className={`btn btn-primary w-full rounded-lg flex`}
          >
            <MdOutlineContactPage className="text-md md:text-xl" />
            <p>Page</p>
          </Link>
        </li>
        <li>
          <Link
            href={"/workspace"}
            className={`btn btn-primary w-full rounded-lg flex`}
          >
            <RiQuestionAnswerLine className="text-md md:text-xl" />
            <p>Workspace</p>
          </Link>
        </li>
        <li>
          <Link
            href={"/workspace/settings"}
            className={`btn btn-primary w-full rounded-lg flex`}
          >
            <MdSettings className="text-md md:text-xl" />
            <p>Settings</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const SidebarContent = () => {
  return (
    <>
      <a href="" className="btn btn-ghost w-fit text-xl">
        qnaect
      </a>
      <div className="divider divider-primary m-0"></div>
      <span className="menu rounded-box mt-10">
        <ul className="w-full flex flex-col gap-2 mx-auto">
          <li>
            <Link
              href={"/workspace/page"}
              className={`btn btn-primary w-56 mx-auto rounded-lg flex  justify-start`}
            >
              <span>
                <MdOutlineContactPage className="text-lg md:text-xl" />
              </span>
              <p>Page</p>
            </Link>
          </li>
          <li>
            <Link
              href={"/workspace"}
              className={`btn btn-primary w-56 mx-auto rounded-lg flex justify-start `}
            >
              <RiQuestionAnswerLine className="text-lg md:text-xl" />
              Workspace
            </Link>
          </li>
          <li>
            <Link
              href={"/workspace/settings"}
              className={`btn btn-primary w-56 mx-auto rounded-lg flex justify-start `}
            >
              <MdSettings className="text-lg md:text-xl" />
              Settings
            </Link>
          </li>
        </ul>
      </span>
    </>
  );
};

const SidebarCard = () => {
  return (
    <span className="hidden md:block p-2 mt-auto">
      <div className="card image-full">
        <figure>
          <div className="bg-gradient-to-r from-primary to-accent h-full w-full"></div>
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-white text-lg mb-2">
            Subscribe to our Newsletter
          </h2>
          <label className="input input-nofocus input-bordered flex items-center gap-2">
            <LuMail />
            <input placeholder="example@gmail.com" type="text" required />
          </label>
          <button type="submit" className="btn btn-primary w-full mt-2">
            Subscribe
          </button>
        </div>
      </div>
    </span>
  );
};
