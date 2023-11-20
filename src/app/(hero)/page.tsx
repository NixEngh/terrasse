import Link from "next/link";

export default async function Hero() {
  return (
    <div className="absolute flex flex-col items-center w-full bg-white top-1/2 min-h-[50%]">
      <section className="relative flex flex-col items-center w-11/12 max-w-4xl gap-3 p-10 text-white bg-black shadow-xl -top-40">
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
        <p className="text-lg text-center ">
          På denne nettsiden kan du booke terrassen der jeg bodde før! <br />
          Prosjektet startet som en vits, der jeg ville ha et litt større
          hobbyprosjekt. Jeg landet på bookingsystem, og valgte å lage det for
          den ene benken på terrassen som fikk sol. På denne måten kunne jeg og
          de jeg bodde med få litt sol uten å krangle.
        </p>
        <h3 className="mt-2 text-xl font-bold"> Features?</h3>
        <p className="text-lg text-center">
          Nettsiden består av en enkel bookingkalender, der du kan trykke på en dag for å legge en reservasjon. <br />
          Alle bookinger vises i kalenderen, med brukerens profilbilde der hver bruker har sin egen farge.
          Brukere kan endre sin profilfarge ved å trykke på <span className="italic">instillinger</span>.
        </p>
        <img alt="Screenshot of calendar" src="/calendar.png" className="w-full" />
        <h3 className="mt-2 text-xl font-bold">Tech stack?</h3>
        <p className="text-lg text-center">
          Nettsiden er laget med next.js 13 (app directory), typescript, zod, tailwindcss, og
          vercel postgres database. <br />
        </p>
      </section>
      <section className="max-w-xl px-3">

        <img
          alt="Nikolaus Engh"
          src="/Profile.JPG"
          className="object-cover w-40 h-40 mx-auto border-4 rounded-full"
        />
        <h4 className="text-lg font-bold">Om meg</h4>
        <p>
          Jeg er en masterstudent ved uib som går informatikk med spesialisering
          innen maskinlæring. I det siste har jeg blitt interessert i fullstack
          utvikling, og har derfor laget denne nettsiden. Ser etter jobb!
        </p>
        <div className="w-full h-px my-4 bg-black" />
        <div className="flex flex-row">
          <Link href="https://github.com/NixEngh">
            <img
              alt="Github logo"
              src="/github-mark/github-mark.svg"
              className="p-2 transition-colors border-2 border-transparent rounded-xl hover:border-black w-14 h-14"
            />
          </Link>
          <Link href="https://www.linkedin.com/in/nikolaus-engh-3385571ba">
            <img
              alt="LinkedIn logo"
              src="/iconmonstr-linkedin-3.svg"
              className="p-2 transition-colors border-2 border-transparent rounded-xl hover:border-black w-14 h-14"
            />
          </Link>
          <Link href="mailto:n.d.engh@gmail.com" prefetch={false}>
            <img
              alt="Email logo"
              src="/211660_email_icon.svg"
              className="p-2 transition-colors border-2 border-transparent rounded-xl hover:border-black w-14 h-14"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
