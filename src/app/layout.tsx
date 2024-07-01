import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import { getServerSession } from "next-auth";
import { ToastContainer } from "react-toastify";
import { authConfig } from "@/lib/auth";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/providers/CurrentUserProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "qnaect",
  description: "Transform questions into connections with ease.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <UserProvider>
            <ToastContainer />
            {children}
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
