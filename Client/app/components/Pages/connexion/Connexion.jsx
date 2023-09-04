"use client";

import ConnexionForm from "../../common/Global/Forms/ConnexionForm";
import Link from "next/link";
import { FormEnglober } from "../../common/Global/FormEnglober";
import { Ramabhadra } from "next/font/google";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const ramabhadra = Ramabhadra({
  weight: "400",
  subsets: ["latin"],
});

const Connexion = () => {
  return (
    <section className="h-[100vh] flex items-center justify-center  bg-[#0F141A] flex-col">
      <div className="flex items-center justify-center flex-col w-[1000px] max-sm:w-full">
        <div className="flex items-center flex-col max-sm:w-full">
          <h1
            className={`text-white font-bold text-[30px] ${orbitron.className}`}
          >
            TRACKER.
          </h1>
          <FormEnglober>
            <h1
              className={`text-[24px] py-[5px] text-center text-white pb-[15px] ${ramabhadra.className}`}
            >
              Connexion au compte
            </h1>
            <ConnexionForm />
            <h3 className="mt-7 text-zinc-400">
              Nouveau sur Tracker ?
              <Link href="/inscription" className="text-[#fff]">
                {" "}
                Inscris-toi
              </Link>
            </h3>
          </FormEnglober>
        </div>
      </div>
    </section>
  );
};

export default Connexion;
