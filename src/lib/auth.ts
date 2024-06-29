import { NextAuthOptions, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, credentials, email }) {
      if (user) {
        const { name, email, image } = user;
        let websiteUrl: string | undefined = "";
        if (process.env.DEV_ENVIRONMENT === "local") {
          websiteUrl = process.env.LOCAL_URL;
        } else {
          websiteUrl = process.env.WEBSITE_URL;
        }
        console.log(websiteUrl);
        const apiUrl = `${websiteUrl}/api/createuser`;
        console.log(apiUrl);
        try {
          const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
            }),
          });
        } catch (error) {
          console.log(error);
        }
        return true;
      } else {
        return redirect("/login");
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/login");
}

export function LoginIsRequiredClient() {
  const session = useSession();
  if (!session.data) return redirect("/login");
}
