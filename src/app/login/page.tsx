import LoginButton from "@/components/LoginButton";

export default function Login() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-8xl pb-3 mb-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-900 to-teal-950">
          Book tid på terrassen!
        </h1>
        <div className="bg-gradient-to-b from-white to-slate-200 h-2/5 w-2/6 rounded-3xl flex flex-col items-center justify-center">
        <h2 className="text-4xl pb-3 mb-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-cyan-900 to-teal-950">
          Velkommen!
        </h2>
        <LoginButton />
        
        </div>
      </div>
    </main>
  );
}
