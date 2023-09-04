"use client";

import { FormEnglober } from "../FormEnglober";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "../Toast";
import { toast } from "react-hot-toast";

const ResetEmail = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }} = useForm();
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = async (data) => {
    const { emailToken } = session?.user;
    const token = emailToken
    const { email, password } = data;

    if (!password)
     return;

    setIsSubmitted(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${session?.user?.id}/reset-email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, token }),
        }
      );

      if (!response.ok) {
        toast.custom(
          <Toast
            message={"Une erreur est survenue"}
            variant="error"
            type="Erreur"
          />
        );
      } else {
        await response.json();
        setSuccess(true);
        toast.custom(
          <Toast
            message={`Ton adresse mail a correctement été modifiée`}
            variant="success"
            type="Succès"
          />
        );
        router.replace("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-y-4 mb-6"
    >
      <div>
        <label className="text-zinc-500 font-medium text-md">
          Nouvelle adresse mail
        </label>
        <Input
          type="email"
          className="bg-[#1B2733] border border-[#303742]   w-full h-[41px] gap-4 flex items-center disabled:opacity-50 disabled:pointer-events-none px-3 mt-1 outline-none rounded-[5px] font-normal text-zinc-400 text-base focus:border-vtertiary focus:text-vtertiary transition duration-200"
          {...register("email")}
        />
      </div>

      <div>
        <label className="text-zinc-500 font-medium text-md">
          Mot de passe
        </label>
        <Input
          type="password"
          className="bg-[#1B2733] border border-[#303742]   w-full h-[41px] gap-4 flex items-center disabled:opacity-50 disabled:pointer-events-none px-3 mt-1 outline-none rounded-[5px] font-normal text-zinc-400 text-base focus:border-vtertiary focus:text-vtertiary transition duration-200"
          {...register("password", { required: true })}
        />
      </div>

      <button
        className="bg-[#FF4655] h-[41px] text-white w-full gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3  rounded-md"
        onClick={() => setIsSubmitted(true)}
      >
        {isSubmitted ? (success ? "Succès !" : "Erreur") : "Valider"}
      </button>
    </form>
  );
};

export default ResetEmail;
