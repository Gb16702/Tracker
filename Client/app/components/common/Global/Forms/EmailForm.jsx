"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Toast from "../Toast";

const EmailForm = () => {
  const { data: session, update } = useSession();
  const [isClicked, setIsClicked] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${session?.user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }),
      }
    );

    toast.custom(
      <Toast
        message={`Un email vous a été envoyé !`}
        variant="admin_success"
        type="Succès"
        dark
      />
    );

    const { token } = await response.json();

    if (response.ok) {
      await update({
        ...session,
        user: {
          ...session.user,
          emailToken: token,
        },
      });
      return toast.custom(
        <Toast
          message={`Email modifié avec succès !`}
          variant="admin_success"
          type="Succès"
          dark
        />
      );
    }
  };

  return (
    <div onClick={handleSubmit} className="w-[300px] max-sm:w-[260px]">
      <label className="text-zinc-200 text-sm font-medium">
        Modifier l'adresse mail
      </label>
      <button
        className="bg-[#0F141A] border border-[#303742] w-full h-[41px] gap-4 flex items-center text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-1 rounded-[5px] font-normal text-zinc-400 mb-3"
      >
        {isClicked && "Email envoyé !"}
      </button>
    </div>
  );
};

export default EmailForm;
