"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Toast from "./Toast";
import { useSession } from "next-auth/react";
import { Close } from "./Icons/HeroIcons/Close";
import Button from "./Button";

const ProfilePictureSection = () => {
  const { data: session, update } = useSession();

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const inputRef = useRef(null);
  const deleteButtonRef = useRef(null);

  const router = useRouter();

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const toggleMenu = () => {
    setOpen(true);
  };

  const handleClickOutside = (e) => {
    if (
      deleteButtonRef.current &&
      !deleteButtonRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = () => {
    setOpen(false);
    setModalOpen(true);
  };

  const confirmDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${session?.user.id}?image=${session?.user?.avatar}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) return;
      else {
        await update({
          ...session,
          user: {
            ...session.user,
            avatar: null,
          },
        });
        toast.custom(
          <Toast
            message={`Votre avatar a correctement été supprimé`}
            variant="admin_success"
            type="Succès"
            dark
          />
        );
        router.refresh();
        setModalOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetcher = async ({ base64EncodedImage }) => {
    const method = session?.user?.avatar ? "PATCH" : "POST";

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${session?.user.id}/image`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64EncodedImage,
          }),
        }
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    try {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = async () => {
        const base64EncodedImage = reader.result,
          response = await fetcher({ base64EncodedImage, session });
        if (!response.ok) return;
        else {
          const data = await response.json();
          await update({
            ...session,
            user: {
              ...session.user,
              avatar: data.image,
            },
          });
          toast.custom(
            <Toast
              message={`Votre avatar a correctement été modifié`}
              variant="admin_success"
              type="Succès"
              dark
            />
          );
          router.refresh();
        }
      };
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {modalOpen && (
        <>
          <div className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5]"></div>
          <div className="fixed z-20 top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-[#1B2733] rounded-xl p-[20px] border border-[#303742]">
            <div className="justify-between items-center flex">
              <h3 className="text-zinc-100 font-medium text-[20px] tracking-tight">
                Suppression d'image
              </h3>
              <Close
                className="text-xl cursor-pointer fill-zinc-100"
                onClick={() => setModalOpen(false)}
              />
            </div>
            <h3 className="text-zinc-400 text-sm mt-1">
              Êtes-vous sûr de vouloir supprimer votre image ?
            </h3>
            <Button
              className={`w-full h-[46px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-8 rounded-[5px] transition-all dureation-300 bg-vprimary text-zinc-200`}
              onClick={confirmDelete}
            >
              Oui, supprimer
            </Button>
          </div>
        </>
      )}
      <div className="w-full h-[22%] flex flex-row items-center gap-x-4 bg-[#1B2733] border border-[#303742] px-3 rounded-md max-sm:px-1 max-sm:gap-x-3 max-sm:border-none">
        <div
          className="rounded-full min-w-[100px] min-h-[100px] w-[100px] h-[100px] relative max-sm:w-[70px] max-sm:h-[70px] max-sm:min-w-[70px] max-sm:min-h-[70px]"
          onClick={handleClick}
        >
          {session?.user.avatar ? (
            <>
              <Image
                src={session?.user.avatar}
                alt="Image de profil"
                className="rounded-full object-cover w-full h-full min-w-[100%]"
                width={150}
                height={150}
              />
              <input
                type="file"
                className="hidden"
                ref={inputRef}
                onChange={handleChange}
              ></input>
            </>
          ) : (
            <div className="rounded-full bg-[#0F141A] w-full h-full border border-[#303742]">
              <input
                type="file"
                className="hidden"
                id="fileInput"
                ref={inputRef}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="w-[40px] h-[40px] bg-[#1B2733] outline outline-1 outline-white p-1 absolute bottom-0 right-0 rounded-full border-[6px] border-[#1B2733]  flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-6 h-6 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          </div>
        </div>
        <div className="flex gap-y-1 h-full justify-center relative bottom-5 py-4 flex-col flex-1 max-sm:gap-0 max-sm:bottom-2">
          <div className="flex justify-between w-full">
            <h3 className="text-white font-medium text-[18px] max-sm:text-[15px]">
              {session?.user?.avatar
                ? "Changer d'image de profil"
                : "Ajouter une image de profil"}
            </h3>
            {session?.user?.avatar && (
              <button
                className="text-white px-2 py-1 rounded-md hover:bg-slate-700/[.3] relative"
                onClick={toggleMenu}
              >
                . . .
                {open && (
                  <div
                    className="fixed bg-[#1B2733] border border-[#303742] w-[200px] py-2 rounded-md text-sm"
                    ref={deleteButtonRef}
                    onClick={handleDelete}
                  >
                    Supprimer l'image
                  </div>
                )}
              </button>
            )}
          </div>
          <p className="text-[13px] text-zinc-400 max-sm:relative max-sm:bottom-1 max-sm:text-[12px]">
            {session?.user?.avatar
              ? "Cliquez pour la changer"
              : "Cliquez pour en ajouter une"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfilePictureSection;
