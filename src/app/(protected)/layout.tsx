import Header from "@/components/Header";
import { getAuthSession } from "@/lib/auth";
getAuthSession
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: Props) {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/");
  }


  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        {children}
      </div>
    </div>
  );
}
