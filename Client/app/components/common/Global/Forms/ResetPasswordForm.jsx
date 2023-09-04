"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation"
import Input from "../Input";
import Toast from "../Toast";
import { toast } from "react-hot-toast";

const ResetPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const {register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async (data) => {
    const {passwordToken} = session?.user, token = passwordToken, {email, password, newPassword} = data;
    if(!password || !newPassword)
    return

    setIsSubmitted(true)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${session?.user?.id}/reset-password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, newPassword, token})
    })

    if(!response.ok) {
        toast.custom(<Toast message={"Une erreur est survenue"} variant = "error" type="Erreur" />)
    }else{
      await response.json()
      setSuccess(true)
      toast.custom(<Toast message={`Ton mot de passe a correctement été modifié`} variant = "success" type="Succès" />)
      router.replace("/")
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-4 mb-6">
      <div>
        <label className="text-zinc-500 font-medium text-md">
          Nouveau mot de passe
        </label>
        <Input
          type="password"
          className="bg-[#1B2733] border border-[#303742]   w-full h-[41px] gap-4 flex items-center disabled:opacity-50 disabled:pointer-events-none px-3 mt-1 outline-none rounded-[5px] font-normal text-zinc-400 text-base focus:border-vtertiary focus:text-vtertiary transition duration-200"
          {...register("newPassword", { required: true })}
        />
      </div>
      <div>
        <label className="text-zinc-500 font-medium text-md">
          Mot de passe actuel
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

export default ResetPasswordForm;
