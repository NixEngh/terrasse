import LoginButton from "@/components/LoginButton";
import { redirect } from "next/navigation";

export default function Home() {
  if (false) {
    return redirect("/login");
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-8xl pb-3 mb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-900 to-teal-950">
          Hei Nikolaus!
        </h1>
        <h3 className="text-3xl">
            Du har 2 ledige timer på terrassen i denne uken.
        </h3>
        <LoginButton />

      </div>
    </main>
  );
}
