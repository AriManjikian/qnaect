"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMail } from "react-icons/lu";
import { MdOutlineContactPage, MdSettings } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: any }) {
  const currentPath = usePathname();

  return (
    <section data-theme="dark" className="h-dvh">
      <WorkspaceNav currentPath={currentPath} />
      <div className="drawer md:drawer-open h-full w-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content pt-16 md:pl-56 md:pt-0">
          {/* Page content here */}
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="flex flex-col menu bg-base-200 text-base-content fixed min-h-dvh w-56 p-0">
            {/* Sidebar content here */}
            <SidebarContent currentPath={currentPath} />
            {/* <SidebarCard /> */}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

const WorkspaceNav = ({ currentPath }: { currentPath: string }) => {
  return (
    <div className="navbar fixed md:hidden bg-base-200 z-50">
      <ul className="menu menu-horizontal mx-auto gap-4 flex-nowrap overflow-x-auto">
        <li>
          <Link
            href="/workspace/page"
            className={`btn w-full rounded-lg flex flex-col ${
              currentPath === "/workspace/page" ? "btn-primary" : "btn-ghost"
            }`}
          >
            <MdOutlineContactPage className="text-md md:text-xl" />
            <p className="text-xs">Page</p>
          </Link>
        </li>
        <li>
          <Link
            href="/workspace"
            className={`btn w-full rounded-lg flex flex-col ${
              currentPath === "/workspace" ? "btn-primary" : "btn-ghost"
            }`}
          >
            <RiQuestionAnswerLine className="text-md md:text-xl" />
            <p className="text-xs">Workspace</p>
          </Link>
        </li>
        <li>
          <Link
            href="/workspace/settings"
            className={`btn w-full rounded-lg flex flex-col ${
              currentPath === "/workspace/settings"
                ? "btn-primary"
                : "btn-ghost"
            }`}
          >
            <MdSettings className="text-md md:text-xl" />
            <p className="text-xs">Settings</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const SidebarContent = ({ currentPath }: { currentPath: string }) => {
  return (
    <>
      <a href="" className="btn btn-ghost w-fit text-xl">
        qnaect
      </a>
      <div className="divider m-0"></div>
      <span className="menu rounded-box mt-10">
        <ul className="w-full flex flex-col px-2 mx-auto">
          <li>
            <Link
              href={"/workspace/page"}
              className={`btn w-full rounded-lg flex justify-start ${
                currentPath === "/workspace/page" ? "btn-primary" : "btn-ghost"
              }`}
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
              className={`btn w-full rounded-lg flex justify-start ${
                currentPath === "/workspace" ? "btn-primary" : "btn-ghost"
              }`}
            >
              <RiQuestionAnswerLine className="text-lg md:text-xl" />
              Workspace
            </Link>
          </li>
          <li>
            <Link
              href={"/workspace/settings"}
              className={`btn w-full rounded-lg flex justify-start ${
                currentPath === "/workspace/settings"
                  ? "btn-primary"
                  : "btn-ghost"
              }`}
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
