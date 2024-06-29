import { UserProvider } from "@/app/Providers/CurrentUserProvider";

export default async function Layout({ children }: { children: any }) {
  return <UserProvider>{children}</UserProvider>;
}
