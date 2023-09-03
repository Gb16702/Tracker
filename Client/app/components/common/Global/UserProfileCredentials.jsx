"use client";

import { set, useForm } from "react-hook-form";
import Input from "./Input";
import { useEffect } from "react";
import UsernameForm from "./Forms/usernameForm";
import EmailForm from "./Forms/EmailForm";
import PasswordForm from "./Forms/PasswordForm";
import ProfilePictureForm from "./Forms/ProfilePictureForm";

const UserProfileCredentials = () => {
  return (
    <>
      <div className="">
        <h2 className="text-zinc-300 font-semibold text-lg">
          Informations générales
        </h2>
        <h3 className="text-zinc-500 font-medium text-md">
          Ces informations sont visibles par tout le monde.
        </h3>
        <div className="mt-6 w-[40%] ">
          <UsernameForm />
          <ProfilePictureForm />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-zinc-300 font-semibold text-lg">Adresse mail</h2>
        <h3 className="text-zinc-500 font-medium text-md">
          Modifier votre adresse mail demanderait la confirmation de ton mot de
          passe
        </h3>
        <EmailForm />
      </div>
      <div className="mt-8">
        <h2 className="text-zinc-300 font-semibold text-lg">Mot de passe</h2>
        <h3 className="text-zinc-500 font-medium text-md">
          Modifer ton mot de passe demanderait la confirmation de ton mot de
          passe actuel
        </h3>
        <PasswordForm />
      </div>
    </>
  );
};

export default UserProfileCredentials;
