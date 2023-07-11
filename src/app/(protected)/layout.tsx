import Header from "@/components/Header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    // return redirect("/");
  }
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
