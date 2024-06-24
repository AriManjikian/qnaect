import Link from "next/link";
import { MdOutlineContactPage, MdSettings } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";

export default async function Layout({ children }: { children: any }) {
  return (
    <section data-theme="dark" className="min-h-dvh">
      <div className="p-4">
        <div className="navbar bg-neutral rounded-lg w-full justify-center lg:justify-start">
          <span className="flex gap-4">
            <Link
              href={"/workspace/page"}
              className="btn rounded-lg btn-primary flex flex-col lg:flex-row"
            >
              <span>
                <MdOutlineContactPage className="text-lg md:text-xl" />
              </span>
              <p>Page</p>
            </Link>
            <Link
              href={"/workspace"}
              className="btn rounded-lg btn-primary flex flex-col lg:flex-row"
            >
              <RiQuestionAnswerLine className="text-lg md:text-xl" />
              Workspace
            </Link>
            <Link
              href={"/workspace/settings"}
              className="btn rounded-lg btn-primary flex flex-col lg:flex-row"
            >
              <MdSettings className="text-lg md:text-xl" />
              Settings
            </Link>
          </span>
        </div>
        {children}
      </div>
    </section>
  );
}
