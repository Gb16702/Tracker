"use client";

import Select from "../Select";
import { useState } from "react";
import Toast from "../Toast";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ContactForm = ({ sujets }) => {
  const router = useRouter();

  const categories = sujets.map((sujet) => {
    return {
      label: sujet.category,
      value: sujet._id,
    };
  });

  const [formValues, setFormValues] = useState({
    email: "",
    category: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

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
      <div className="w-full flex items-center justify-center">
        <input
          className=" h-[45px] rounded w-full px-4 py-2 outline-none bg-adminBgAlt border border-zinc-800 text-zinc-200 placeholder-white focus:border-vprimary transition duration-200"
          type="text"
          name="email"
          placeholder="Votre adresse mail"
          value={formValues.email}
          onChange={handleChange}
        />
      </div>
      <div className=" w-full flex items-center justify-center mt-2">
        <Select
          options={categories}
          placeholder="Choisissez un type de problème"
          className="h-[45px] rounded w-full px-4 py-2 outline-none bg-adminBgAlt border border-zinc-800 text-white focus:border-vprimary transition duration-200"
          onChange={(value) =>
            handleChange({ target: { name: "category", value } })
          }
          onReset={() =>
            handleChange({ target: { name: "category", value: "" } })
          }
        />
      </div>
      <div className="w-full flex items-center justify-center mt-2">
        <textarea
          className="rounded w-full px-4 py-2 outline-none h-[150px] max-h-[200px] min-h-[100px] bg-adminBgAlt border border-zinc-800 placeholder-white text-white focus:border-vprimary transition duration-200"
          type="text"
          name="message"
          placeholder="Votre message"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex items-center justify-start mt-2">
        <button className="rounded w-[35%] max-sm:w-full bg-vprimary h-10 text-white font-medium">
          Soumettre
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
