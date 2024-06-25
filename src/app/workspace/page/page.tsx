import React from "react";
import { LuAtSign, LuLink, LuUser } from "react-icons/lu";
import profile from "@/public/profile.jpg";
import Image from "next/image";
const Page = () => {
  return (
    <section className="flex flex-col lg:flex-row p-4 md:pl-80 gap-10 justify-center items-center min-h-dvh">
      <div className="p-5">
        <span className="flex items-center">
          <div
            className="avatar rounded-full tooltip tooltip-info"
            data-tip={"Profile Image Customization Coming Soon"}
          >
            <div className="w-14 sm:w-16 rounded-full">
              <Image src={profile} alt="" width={96} height={96} />
            </div>
          </div>
        </span>
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-sm font-medium text-white">Username</p>
            <label className="input input-bordered flex items-center gap-2 bg-zinc-950">
              <LuAtSign />
              <input type="text" required />
            </label>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-white">Name</p>
            <label className="input input-bordered flex items-center gap-2 bg-zinc-950">
              <LuUser />
              <input type="text" required />
            </label>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-white">Bio</p>
            <textarea
              className="textarea textarea-bordered w-full bg-zinc-950"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="mb-2 text-sm font-medium text-white">URLs</p>
            <label className="input input-bordered flex items-center gap-2 bg-zinc-950">
              <LuLink />
              <input type="text" />
            </label>
          </div>
        </div>
      </div>
      <div className="mockup-phone m-0">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1">Hi.</div>
        </div>
      </div>
    </section>
  );
};

export default Page;
