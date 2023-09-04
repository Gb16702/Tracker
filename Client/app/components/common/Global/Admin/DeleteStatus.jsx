"use client";

import { toast } from "react-hot-toast";
import Button from "../Button";
import { Close } from "../Icons/HeroIcons/Close";
import Trash from "./Trash";
import { useState } from "react";
import Toast from "../Toast";
import { useRouter } from "next/navigation";

const DeleteStatus = ({ selectedStatus, setSelectedStatus, item }) => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false),
    [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (selectedStatus.length < 1) return;
    else {
      setIsVisible(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (selectedStatus.length < 1) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${item}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: selectedStatus,
          }),
        }
      );
      if (!response.ok) {
        return setIsLoading(false);
      } else {
        const { message } = await response.json();
        setIsLoading(false);
        setIsVisible(false);
        toast.custom(
          <Toast message={message} variant="admin_success" type="Succès" dark />
        );
        setSelectedStatus([]);
        router.refresh();
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isVisible && (
        <>
          <div className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5] "></div>
          <div className="fixed z-20 top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-adminBgAlt rounded-xl p-[20px] border border-zinc-800">
            <div className="justify-between items-center flex">
              <h3 className="text-zinc-100 font-medium text-[20px] tracking-tight">
                Suppression de {item}
              </h3>
              <Close
                className="text-xl cursor-pointer fill-zinc-100"
                onClick={() => setIsVisible(false)}
              />
            </div>
            <div className="bg-zinc-900 w-full py-3 px-2 rounded-md mt-3">
              <div>
                <h4 className="mt-1 text-zinc-300">
                  {`${
                    item.charAt(0).toUpperCase() + item.slice(1)
                  } sélectionné :`}
                </h4>
                {selectedStatus.map((status, index) => (
                  <h4 key={index} className="text-[15px] text-zinc-300">
                    - {status}
                  </h4>
                ))}
              </div>
            </div>
            <form className="mt-7" onSubmit={handleSubmit}>
              <Button
                className={`w-full h-[46px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px] transition-all dureation-300 bg-vprimary text-zinc-200`}
              >
                {isLoading ? "Suppression..." : `Supprimer le ${item}`}
              </Button>
            </form>
          </div>
        </>
      )}
      <button onClick={handleClick}>
        <Trash className="w-9 h-9 p-[6px] stroke-zinc-300 rounded-md bg-zinc-800" />
      </button>
    </>
  );
};

export default DeleteStatus;
