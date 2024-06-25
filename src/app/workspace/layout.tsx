"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineContactPage, MdSettings } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";

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
            <SidebarCard />
          </ul>
        </div>
      </div>
    </section>
  );
}

const WorkspaceNav = () => {
  const path = usePathname();

  return (
    <div className="navbar fixed md:hidden bg-base-300 z-50">
      <ul className="flex justify-center w-dvw gap-2">
        <li>
          <Link
            href={"/workspace/page"}
            className={`btn btn-primary w-full rounded-lg flex ${
              path === "/workspace/page" ? "btn-outline bg-transparent" : ""
            }`}
          >
            <MdOutlineContactPage className="text-md md:text-xl" />
            <p>Page</p>
          </Link>
        </li>
        <li>
          <Link
            href={"/workspace"}
            className={`btn btn-primary w-full rounded-lg flex ${
              path === "/workspace" ? "btn-outline bg-transparent" : ""
            }`}
          >
            <RiQuestionAnswerLine className="text-md md:text-xl" />
            <p>Workspace</p>
          </Link>
        </li>
        <li>
          <Link
            href={"/workspace/settings"}
            className={`btn btn-primary w-full rounded-lg flex ${
              path === "/workspace/settings" ? "btn-outline bg-transparent" : ""
            }`}
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
  const path = usePathname();

  return (
    <>
      <a href="" className="btn btn-ghost w-fit text-xl">
        qnaect
      </a>
      <div className="divider divider-primary m-0"></div>
      <span className="menu rounded-box w-56 mt-10">
        <ul className="w-full flex flex-col gap-2">
          <li>
            <Link
              href={"/workspace/page"}
              className={`btn btn-primary w-full rounded-lg flex ${
                path === "/workspace/page" ? "btn-outline no-hover" : ""
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
              className={`btn btn-primary w-full rounded-lg flex ${
                path === "/workspace" ? "btn-outline bg-transparent" : ""
              }`}
            >
              <RiQuestionAnswerLine className="text-lg md:text-xl" />
              Workspace
            </Link>
          </li>
          <li>
            <Link
              href={"/workspace/settings"}
              className={`btn btn-primary w-full rounded-lg flex ${
                path === "/workspace/settings"
                  ? "btn-outline bg-transparent"
                  : ""
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
    <span className="p-2 mt-auto">
      <div className="card bg-base-100 saturate-50 image-full w-full shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </span>
  );
};
