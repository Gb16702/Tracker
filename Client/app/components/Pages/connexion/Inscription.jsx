"use client";

import InscriptionForm from "../../common/Global/Forms/InscriptionForm";
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

const Inscription = () => {
  return (
    <section className="h-[100vh] flex items-center justify-center bg-[#0F141A] relative">
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
              Crée un nouveau compte
            </h1>

            <InscriptionForm />
            <h3 className="mt-7 text-zinc-400">
              Tu as déjà un compte ?{" "}
              <Link href="/connexion" className="text-[#fff]">
                Connecte-toi
              </Link>
            </h3>
          </FormEnglober>
        </div>
      </div>
    </section>
  );
};

export default Inscription;
