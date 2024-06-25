"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Page = () => {
  const [markdownContent, setmarkdownContent] = useState(
    " # Hello, Markdown! `  console.log(gev) `  This is a **Markdown** content rendered using `react-markdown` in a Next.js application."
  );
  return (
    <section className="flex flex-col lg:flex-row p-4 gap-10 justify-center items-center min-h-dvh">
      {/* Your existing UI elements */}
      <div className="relative">
        <div className="text-sm text-wrap w-full">
          <textarea
            rows={6}
            value={markdownContent}
            className="textarea"
            onChange={(e) => setmarkdownContent(e.target.value)}
          />
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      </div>
      {/* Other parts of your page */}
    </section>
  );
};

export default Page;
