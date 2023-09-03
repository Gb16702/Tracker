"use client";

import { useRef, useState } from "react";
import { Orbitron } from "next/font/google";
import { toast } from "react-hot-toast";
import Toast from "../Toast";
import ModalBox from "../ModalBox";
import { Close } from "../Icons/HeroIcons/Close";
import { useRouter } from "next/navigation";

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const ForgotPwStepOne = () => {
  const inputRef = useRef(null);
  const codeRef = useRef(null);
  const passwordRef = useRef(null);
  const [codeModal, setCodeModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [emailValue, setEmailValue] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = inputRef.current.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!response.ok) {
      const { message } = await response.json();
      return toast.custom(
        <Toast message={message} variant="error" type="Erreur" dark />
      );
    }

    const { message } = await response.json();
    toast.custom(
      <Toast message={message} variant="admin_success" type="Succès" dark />
    );
    setCodeModal(true);
    setEmailValue(email);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();

    const code = codeRef.current.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/verifyCode?forgot=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      return toast.custom(
        <Toast message={message} variant="error" type="Erreur" dark />
      );
    }

    const { message } = await response.json();
    toast.custom(
      <Toast message={message} variant="admin_success" type="Succès" dark />
    );
    setCodeModal(false);
    setEditModal(true);

    codeRef.current.value = "";
  };

  const handlePasswordSubmit = async e => {
      e.preventDefault();
      const password = passwordRef.current.value;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email: emailValue })
      });

      if (!response.ok) {
        const { message } = await response.json();
        return toast.custom(<Toast message={message} variant="error" type="Erreur" dark />);
      }

      const { message } = await response.json();
      toast.custom(<Toast message={message} variant="admin_success" type="Succès" dark />);
      setEditModal(false);
      router.push("/connexion");
  };

  return (
    <>
      {codeModal || editModal ? (
        <div>
          <ModalBox>
            <div className="justify-between items-center flex">
              <h3 className="text-white font-medium text-[20px] tracking-tight">
                {codeModal ? "Code envoyé !" : "Nouveau mot de passe"}
              </h3>
              {codeModal ? (
                <Close
                  className="text-xl cursor-pointer fill-white"
                  onClick={() => setCodeModal(false)}
                />
              ) : (
                <Close
                  className="text-xl cursor-pointer fill-white"
                  onClick={() => setEditModal(false)}
                />
              )}
            </div>
            <h4 className="mt-1 text-sm text-slate-400">
              {codeModal
                ? "Un code a été envoyé à ton adresse mail"
                : "Entre ton nouveau mot de passe"}
              <br />
            </h4>

            {codeModal ? (
              <form onSubmit={handleCodeSubmit} className="mt-4">
                <input
                  className="bg-[#1B2733] border border-[#303742] w-full h-[41px] gap-4 flex items-center text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-1 rounded-[5px] font-normal text-zinc-400 focus:border-vtertiary focus:text-vtertiary transition duration-200 mb-3"
                  ref={codeRef}
                />
                <button className="text-white w-full gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3  rounded-md bg-vprimary h-[41px]">
                  Envoyer
                </button>
              </form>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="mt-4">
                <input
                  type="password"
                  className="bg-[#1B2733] border border-[#303742] w-full h-[41px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-1 rounded-[5px] font-normal text-zinc-400 focus:border-vtertiary focus:text-vtertiary transition duration-200 mb-3"
                  ref={passwordRef}
                />
                <button className="text-white w-full gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3  rounded-md bg-vprimary h-[41px]">
                  Envoyer
                </button>
              </form>
            )}
          </ModalBox>
        </div>
      ) : (
        <>
          <form
            className="w-[330px] flex items-center flex-col max-sm:w-full"
            onSubmit={handleSubmit}
          >
            <h1
              className={`text-white font-bold text-[30px] ${orbitron.className}`}
            >
              TRACKER.
            </h1>
            <h4 className="text-slate-300 text-lg mt-3">
              Réinitialise ton mot de passe
            </h4>
            <div className="w-[330px] mt-8 max-sm:w-full">
              <label
                htmlFor="email"
                className="text-zinc-200 text-sm font-medium w-full"
              >
                Adresse mail
              </label>
              <input
                type="email"
                className="bg-[#1B2733] border border-[#303742] w-full h-[41px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-1 rounded-[5px] font-normal text-zinc-400 focus:border-vtertiary focus:text-vtertiary transition duration-200 mb-3"
                ref={inputRef}
              />
              <button className="text-white w-full gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3  rounded-md bg-vprimary h-[41px]">
                Envoyer
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default ForgotPwStepOne;
