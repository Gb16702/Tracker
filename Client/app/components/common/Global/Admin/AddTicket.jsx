"use client";

import { useState } from "react";
import Add from "../Icons/HeroIcons/admin/Add";
import { Cross } from "../Icons/HeroIcons/Cross";
import Button from "../Button";
import { toast } from "react-hot-toast";
import Toast from "../Toast";
import { useRouter } from "next/navigation";
import { Close } from "../Icons/HeroIcons/Close";

const AddTicket = () => {
  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sujets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: value,
      }),
    });

    const data = await response.json();

    setIsModalOpen(false);

    if (response.ok) {
      router.refresh();
      toast.custom(
        <Toast
          message={data.message}
          variant="admin_success"
          type="Succès"
          dark
        />
      );
    }
  };

  return (
    <>
      {isModalOpen && (
        <>
          <div className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5]"></div>
          <div
            className="fixed z-20 top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-adminBgAlt rounded-xl p-[20px] border border-zinc-800
              w-[500px]"
          >
            <div className="justify-between items-center flex">
              <h3 className="text-zinc-100 font-medium text-[20px] tracking-tight">
                {"Ajout de ticket"}
              </h3>
              <Close
                className="w-5 h-5 cursor-pointer fill-zinc-100"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <form className="mt-7 flex flex-col gap-y" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ajouter le ticket"
                className="w-full h-[46px] rounded-md px-3 outline-none bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200 text-sm font-light placeholder-zinc-400"
                onChange={(e) => setValue(e.target.value)}
              />

              <Button
                onClick={() => setIsModalOpen(false)}
                className={`w-full h-[46px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px] transition-all dureation-300 bg-vprimary text-zinc-200`}
              >
                {"Ajouter"}
              </Button>
            </form>
          </div>
        </>
      )}

      <button onClick={handleClick}>
        <Add className="w-9 h-9 p-[6px] stroke-zinc-300 rounded-md bg-zinc-800" />
      </button>
    </>
  );
};
export default AddTicket;
