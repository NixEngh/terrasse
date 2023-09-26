import DiscordButton from "@/components/DiscordButton";

export default function LoginPage() {
  return (
    <section className="flex flex-col items-center p-10 bg-white rounded-md">
      <h1 className="text-2xl">Logg inn</h1>
      <div className="w-full h-px my-5 bg-gray-300"></div>

      <DiscordButton />
    </section>
  );
}
