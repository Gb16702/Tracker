"use client";

import Input from "../Input";
import { useForm } from "react-hook-form";
import ConnectButton from "../ConnectButton";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { ClosedEye, OpenEye } from "../Icons/HeroIcons/Eyes";
import { emailPattern as pattern } from "../../../../../lib/emailPattern";
import { toast } from "react-hot-toast";
import Toast from "../Toast";
import Link from "next/link";

const ConnexionForm = () => {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const url = "http://localhost:3000/";
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        redirect: "/",
        email: data.email,
        password: data.password,
      });

      if (response.ok) {
        toast.custom(
          <Toast message="Tu es connecté !" variant="success" type="Succès" />
        );
        setSuccess(true);
      } else {
        toast.error("Une erreur est survenue");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const passwordValue = watch("password", "");

  useEffect(() => {
    if (passwordValue.length > 0) {
      setFocused(true);
    } else {
      setFocused(false);
    }
  }, [passwordValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full py-6">
      <label htmlFor="email" className="text-zinc-200 text-sm font-medium">
        Adresse mail
      </label>
      <Input
        type="email"
        className="bg-[#1B2733] border border-[#303742] w-full h-[41px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-1 rounded-[5px] font-normal text-zinc-400 focus:border-vtertiary focus:text-vtertiary transition duration-200 mb-3"
        {...register("email", {
          required: {
            value: true,
            message: "Ce champs est requis",
          },
          pattern: {
            value: pattern,
            message: "Veuillez entrer une adresse mail valide",
          },
        })}
      />

      <div className="flex justify-between">
        <label htmlFor="email" className="text-zinc-200 text-sm font-medium">
          Mot de passe
        </label>
        <Link
          href="/forgot-password"
          className="text-zinc-200 text-sm font-medium cursor-pointer"
        >
          Mot de passe oublié ?
        </Link>
      </div>
      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          className="bg-[#1B2733] border border-[#303742]   w-full h-[41px] gap-4 flex items-center disabled:opacity-50 disabled:pointer-events-none px-3 mt-1 outline-none rounded-[5px] font-normal text-zinc-400 text-base focus:border-vtertiary focus:text-vtertiary transition duration-200"
          {...register("password", { required: true })}
        />
        {visible ? (
          <ClosedEye
            className={`h-[22px] w-[22px] ${
              focused ? "text-vprimary" : "text-[#c2c8d0]"
            } cursor-pointer absolute top-1/2 -translate-y-1/2 right-[20px] transition duration-200`}
            onClick={() => setVisible(!visible)}
          />
        ) : (
          <OpenEye
            className={`h-[22px] w-[22px] ${
              focused ? "text-vprimary" : "text-[#c2c8d0]"
            } cursor-pointer absolute top-1/2 -translate-y-1/2 right-[20px] transition duration-200`}
            onClick={() => setVisible(!visible)}
          />
        )}
      </div>
      <ConnectButton>
        {loading
          ? "Connexion en cours"
          : success
          ? "Redirection en cours"
          : "Se connecter"}
      </ConnectButton>
    </form>
  );
};

export default ConnexionForm;
