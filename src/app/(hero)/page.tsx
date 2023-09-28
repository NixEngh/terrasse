import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function Login() {
  const session = await getAuthSession();

  return (
    <div className="absolute flex flex-col items-center w-full bg-white top-1/2 min-h-[50%]">
      <section className="relative flex flex-col items-center w-11/12 max-w-3xl p-10 text-white bg-black shadow-xl -top-40 gap-3">
        <h1 className="text-3xl font-bold">Terrasse83</h1>
        <p className="text-lg">Velkommen!</p>
        <div className="flex flex-row gap-3">
          <Link
            href="/login"
            className="flex-grow p-2 text-black transition-colors bg-white border border-transparent rounded-lg hover:text-white hover:bg-black hover:border-white"
          >
            Logg inn
          </Link>
          <Link
            href="/home"
            className="flex-grow p-2 text-black transition-colors bg-white border border-transparent rounded-lg hover:text-white hover:bg-black hover:border-white"
          >
            Fortsett som gjest
          </Link>
        </div>
        <div className="w-full h-px m-4 bg-white" />
        <h1 className="text-3xl font-bold">Book terrassen min!</h1>
        <h3 className="text-xl font-bold">Hva er denne nettsiden?</h3>
        <p className=" text-lg text-center">
          På denne nettsiden kan du booke terrassen der jeg bodde før! <br />
          Prosjektet startet som en vits, der jeg ville ha et litt større
          hobbyprosjekt. Jeg landet på bookingsystem, og valgte å lage det for
          den ene benken på terrassen som fikk sol. På denne måten kunne jeg og
          de jeg bodde med få litt sol uten å krangle.
        </p>
        <h3 className="text-xl font-bold"> Features?</h3>
        <p className="text-lg text-center">
          Nettsiden består av en bookingkalender der du kan
        </p>
        <h3 className="text-xl font-bold">Tech stack?</h3>
        <p className="text-lg text-center">
          Nettsiden er laget med next.js 13 (app directory), tailwindcss, og
          vercel postgres database. <br />
        </p>
      </section>
      <section className="max-w-xl">
        <h4 className="text-lg font-bold">Om meg</h4>
        <p>
          Jeg er en masterstudent ved uib som går informatikk med spesialisering
          innen maskinlæring. I det siste har jeg blitt interessert i fullstack
          utvikling, og har derfor laget denne nettsiden. Ser etter jobb!
        </p>
        <div className="w-full h-px my-4 bg-black" />
        <div className="flex flex-row">
          <Link href="https://github.com/NixEngh">
            <img src="/github-mark/github-mark.svg" className="rounded-xl border-2 border-transparent hover:border-black transition-colors p-2 w-14 h-14"/>
          </Link>
          <Link href="www.linkedin.com/in/nikolaus-engh-3385571ba">
            <img src="/iconmonstr-linkedin-3.svg" className="rounded-xl border-2 border-transparent hover:border-black transition-colors p-2 w-14 h-14"/>
          </Link>
          <Link href="mailto:n.d.engh@gmail.com">
            <img src="/211660_email_icon.svg" className="rounded-xl border-2 border-transparent hover:border-black transition-colors p-2 w-14 h-14"/>
          </Link>

        </div>
      </section>
    </div>
  );
}
