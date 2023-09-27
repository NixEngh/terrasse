import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function Login() {
  const session = await getAuthSession();

  return (
    <section className="absolute flex flex-col items-center w-full gap-5 bg-white top-1/2 rounded-2xl">
      <div className="absolute flex flex-col items-center p-10 text-white bg-black shadow-xl w-max -top-20">
        <h1 className="text-3xl font-bold">Terrasse83</h1>
        <div className="w-full h-px bg-white m-4"/>
        <div className="flex flex-row gap-3">
          <Link href="/login" className="p-2 text-black bg-white rounded-lg">
            Logg inn
          </Link>
          <Link href="/home" className="p-2 text-black bg-white rounded-lg">
            Til kalenderen
          </Link>
        </div>
      </div>
      <h1 className="mt-20 text-3xl font-bold">Book terrassen min!</h1>
      <h3 className="text-2xl font-bold">Hva er denne nettsiden?</h3>
      <p className="text-lg">
        Denne nettsiden er en prototype for å booke terrassen på Samfundet. Den
        er laget av meg.
      </p>
      <h3 className="text-xl font-bold">Hvorfor?</h3>
      <p className="text-lg">Jeg ville lage noe kult.</p>
      <h3 className="text-xl font-bold">Hvordan?</h3>
      <p className="text-lg">Jeg brukte React, Next.js og Tailwind CSS.</p>
      <h3 className="text-xl font-bold">Hvem?</h3>
      <p className="text-lg">Jeg heter Arne, og jeg er en student på NTNU.</p>
      <h3 className="text-xl font-bold">Hvorfor er det så mye tekst?</h3>
      <p className="text-lg">Jeg vet ikke.</p>
      <h3 className="text-xl font-bold">Hvordan kan jeg kontakte deg?</h3>
      <p className="text-lg">
        Du kan sende meg en mail på
        <a className="text-blue-500" href="mailto:n.d.engh@gmail.com">
          {" "}
        </a>
      </p>
    </section>
  );
}
