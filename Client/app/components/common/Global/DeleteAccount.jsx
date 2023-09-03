"use client";

import { useState, useEffect } from "react";
import ModalBox from "./ModalBox";
import { Close } from "./Icons/HeroIcons/Close";
import Input from "./Input";
import Button from "./Button";
import { ClosedEye, OpenEye } from "./Icons/HeroIcons/Eyes";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Toast from "./Toast";

const DeleteAccount = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState(null);

  const handleResponse = (response) => {
    if (response.ok) {
      router.refresh();
      signOut();
    }
  };

  const checkRoles = () => {
    if (session?.user?.roles?.grade === 1) {
      return toast.custom(
        <Toast
          message="Le fondateur ne peut pas supprimer son compte"
          variant="error"
          type="Erreur"
          dark
        />
      );
    }
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8000/api/users/${session?.user?.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: "include",
      }
    );

    await response.json();
    if (response.ok) {
      handleResponse(response);
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="w-full h-[22%] flex flex-row items-center gap-x-4 bg-[#1B2733] border border-[#303742] px-3 rounded-md max-sm:border-none">
        <div className="flex flex-col max-sm:w-full" onClick={checkRoles}>
          <label
            className={`text-zinc-200 text-sm font-medium ${
              session?.user?.roles?.grade == 1 && "opacity-60"
            }`}
          >
            Suppression de compte
          </label>
          <button
            className="bg-[#0F141A] border border-[#303742] w-[300px] max-sm:w-[90%] h-[41px] gap-4 flex items-center text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-1 rounded-[5px] font-normal text-zinc-400 mb-3"
            onClick={handleClick}
            disabled={session?.user?.roles?.grade === 1}
          ></button>
        </div>
        {isOpen && (
          <ModalBox>
            <div className="justify-between items-center flex">
              <h3 className="text-zinc-100 font-medium text-[20px] tracking-tight">
                Suppression d'image
              </h3>
              <Close
                className="text-xl cursor-pointer fill-zinc-100"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <h4 className="mt-1 text-sm text-zinc-400">
              Es-tu sûr de vouloir supprimer ton compte ?<br />
            </h4>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="relative">
                <Input
                  type={visible ? "text" : "password"}
                  className="bg-[#0F141A] border border-[#303742]  w-full h-[41px] gap-4 flex items-center disabled:opacity-50 disabled:pointer-events-none px-3 mt-1 outline-none rounded-[5px] font-normal text-zinc-400 text-base focus:border-vtertiary focus:text-vtertiary transition duration-200"
                  placeholder="Entre ton mot de passe"
                  onChange={handleChange}
                />
                {visible ? (
                  <ClosedEye
                    className="h-[22px] w-[22px] cursor-pointer absolute top-1/2 -translate-y-1/2 right-[35px] transition duration-200 stroke-slate-400"
                    onClick={() => setVisible(!visible)}
                  />
                ) : (
                  <OpenEye
                    className="h-[22px] w-[22px] cursor-pointer absolute top-1/2 -translate-y-1/2 right-[35px] transition duration-200 stroke-slate-400"
                    onClick={() => setVisible(!visible)}
                  />
                )}
              </div>
              <Button
                className={`w-full h-[50px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px] transition-all dureation-300 text-white ${
                  password && password.length > 0
                    ? "bg-red-400"
                    : "bg-red-400/[.3]"
                }`}
              >
                Supprimer mon compte
              </Button>
            </form>
          </ModalBox>
        )}
      </div>
    </>
  );
};

export default DeleteAccount;
