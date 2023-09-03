"use client";

import { useState, useEffect } from "react";
import Toast from "../Toast";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const TestimonialsForm = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const [formValues, setFormValues] = useState({
    username: "" || session?.user?.username,
    title: "",
    message: "",
    rating: "",
    isAnonymous: false,
  });

  useEffect(() => {
    if (!session) {
      const { username, isAnonymous, ...rest } = formValues;
      setFormValues(rest);
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCheckboxChange = () => {
    setFormValues((prev) => {
      return {
        ...prev,
        isAnonymous: !prev.isAnonymous,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      ...formValues,
      isLogged: session ? true : false,
    };

    try {
      const response = await fetch("http://localhost:8000/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
      }

      const { message } = await response.json();

      toast.custom(
        <Toast message={message} variant="admin_success" type="Succès" dark />
      );
      router.push("/");
    } catch (err) {
      console.error("Erreur lors de l'envoi du formulaire :", err);
    }
  };

  return (
    <form
      className="flex justify-center items-center flex-col my-[20px]"
      onSubmit={handleSubmit}
    >
      {session && (
        <div className="w-full flex items-center justify-center">
          <input
            className=" h-[45px] rounded w-full px-4 py-2 outline-none bg-adminBgAlt border border-zinc-800 text-zinc-200 placeholder-white focus:border-vprimary transition duration-200"
            type="text"
            name="username"
            placeholder="Votre nom d'utilisateur"
            defaultValue={session?.user?.username}
            onChange={handleChange}
          />
        </div>
      )}
      <div className="w-full flex items-center justify-center mt-2">
        <input
          className=" h-[45px] rounded w-full px-4 py-2 outline-none bg-adminBgAlt border border-zinc-800 text-zinc-200 placeholder-white focus:border-vprimary transition duration-200"
          type="text"
          name="title"
          placeholder="Le titre de votre retour"
          value={formValues.title}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex items-center justify-center mt-2">
        <textarea
          className="rounded w-full px-4 py-2 outline-none h-[150px] max-h-[200px] min-h-[100px] bg-adminBgAlt border border-zinc-800 placeholder-white text-white focus:border-vprimary transition duration-200"
          type="text"
          name="message"
          placeholder="Le contenu de votre retour"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex items-center justify-center mt-2">
        <input
          className=" h-[45px] rounded w-full px-4 py-2 outline-none bg-adminBgAlt border border-zinc-800 text-zinc-200 placeholder-white focus:border-vprimary transition duration-200"
          type="text"
          name="rating"
          placeholder="Votre note finale sur 10"
          value={formValues.rating}
          onChange={handleChange}
        />
      </div>
      {session && (
        <div className="w-full flex items-center justify-start mt-3">
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              className="form-checkbox text-vprimary border-zinc-500"
              checked={formValues.isAnonymous}
              onChange={handleCheckboxChange}
            />
            <span className="text-zinc-200">Apparaître en tant qu'anonyme</span>
          </label>
        </div>
      )}
      <div className="w-full flex items-center justify-start mt-3">
        <button className="rounded w-[35%] max-sm:w-full bg-vprimary h-10 text-white font-medium">
          Soumettre
        </button>
      </div>
    </form>
  );
};

export default TestimonialsForm;
