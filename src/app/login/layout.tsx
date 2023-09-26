import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function login({ children }: Props) {
  const session = await getAuthSession();

  if (session) {
    return redirect("/home");
  }

  return <div className="flex flex-col items-center justify-center h-screen">{children}</div>;
}
