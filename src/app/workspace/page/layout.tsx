import { UserProvider } from "@/providers/CurrentUserProvider";

export default async function Layout({ children }: { children: any }) {
  return <UserProvider>{children}</UserProvider>;
}
