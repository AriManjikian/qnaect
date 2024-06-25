import Link from "next/link";
import { MdOutlineContactPage, MdSettings } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";

export default async function Layout({ children }: { children: any }) {
  return (
    <section data-theme="" className="h-dvh">
      <div className="navbar fixed md:hidden bg-base-200 z-50">
        <ul className="flex justify-center w-dvw gap-2">
          <li>
            <Link
              href={"/workspace/page"}
              className="btn btn-primary w-full rounded-lg flex"
            >
              <MdOutlineContactPage className="text-md md:text-xl" />
              <p>Page</p>
            </Link>
          </li>
          <li>
            <Link
              href={"/workspace"}
              className="btn btn-primary w-full rounded-lg flex"
            >
              <RiQuestionAnswerLine className="text-md md:text-xl" />
              <p>Workspace</p>
            </Link>
          </li>
          <li>
            <Link
              href={"/workspace/settings"}
              className="btn btn-primary w-full rounded-lg flex"
            >
              <MdSettings className="text-md md:text-xl" />
              <p>Settings</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="drawer md:drawer-open h-full w-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content pt-16 lg:pt-0">
          {/* Page content here */}
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content fixed min-h-full p-0">
            {/* Sidebar content here */}
            <ul className="menu bg-base-200 text-base-content min-h-dvh w-full p-0">
              <ul className="flex flex-col menu bg-base-300 text-base-content min-h-dvh w-80">
                <a href="" className="btn btn-ghost w-fit text-xl">
                  qnaect
                </a>
                <div className="divider divider-primary m-0"></div>
                <span className="menu rounded-box w-56 mt-10">
                  <ul className="w-full flex flex-col gap-2">
                    <li>
                      <Link
                        href={"/workspace/page"}
                        className="btn btn-primary w-full rounded-lg flex justify-start"
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
                        className="btn btn-primary w-full rounded-lg flex justify-start"
                      >
                        <RiQuestionAnswerLine className="text-lg md:text-xl" />
                        Workspace
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/workspace/settings"}
                        className="btn btn-primary w-full rounded-lg flex justify-start"
                      >
                        <MdSettings className="text-lg md:text-xl" />
                        Settings
                      </Link>
                    </li>
                  </ul>
                </span>
                <span className="p-2 mt-auto">
                  <div className="card bg-base-100 image-full w-full shadow-xl">
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
              </ul>
            </ul>
          </ul>
        </div>
      </div>
    </section>
  );
}
