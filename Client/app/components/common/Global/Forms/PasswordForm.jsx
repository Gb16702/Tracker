"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Toast from "../Toast";

const PasswordForm = () => {
  const { data: session, update } = useSession();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsClicked(true);

    return toast.custom(
      <Toast
        message={`Un email vous a été envoyé !`}
        variant="admin_success"
        type="Succès"
        dark
      />
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8000/api/users/${session?.user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          username: session?.user?.username,
        }),
      }
    );
    const { token } = await response.json();

    if (response.ok && token) {
      await update({
        ...session,
        user: {
          ...session.user,
          passwordToken: token,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[300px] max-sm:w-[260px]">
      <label className="text-zinc-200 text-sm font-medium">
        Modifier le mot de passe
      </label>
      <button
        onClick={handleClick}
        className="bg-[#0F141A] border border-[#303742] w-full h-[41px] gap-4 flex items-center text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-1 rounded-[5px] font-normal text-zinc-400 mb-3"
      >
        {isClicked && "Email envoyé !"}
      </button>
    </form>
  );
};

export default PasswordForm;
