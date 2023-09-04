"use client";

import Input from "../Input";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Submit } from "../Icons/HeroIcons/Submit";
import { Spinner } from "../Icons/Loaders/Spinner";
import Lottie, { LottiePlayer } from "lottie-web";
import Toast from "../Toast";
import { toast } from "react-hot-toast";

const ProfilePictureForm = () => {
  const [selectedFile, setSelectedFile] = useState(null),
    [showSelectedFile, setShowSelectedFile] = useState(true),
    [formState, setFormState] = useState("initial");

  const { data: session, update } = useSession();
  const router = useRouter();

  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("../Icons/anim/check.json"),
    });
  });

  const fetcher = async ({ base64EncodedImage }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${session?.user?.id}/image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64EncodedImage,
        }),
      }
    );
    return response;
  };

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0].name);
    setShowSelectedFile(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState("submitting");
    const target = e.currentTarget;
    const fileInput = Array.from(target.elements).find(
      (e) => e.id === "fileInput"
    );

    try {
      const reader = new FileReader();
      reader.readAsDataURL(fileInput.files[0]);
      reader.onloadend = async () => {
        const base64EncodedImage = reader.result,
          response = await fetcher({ base64EncodedImage });
        if (!response.ok) return setFormState("error");
        else {
          const data = await response.json();
          setFormState("success");
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
          setTimeout(() => {
            setFormState("initial");
            setShowSelectedFile(false);
          }, 2000);
        }
      };
    } catch (e) {
      console.log(e);
      setFormState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="image" className="mt-4 block text-zinc-400">
        Image de profil
      </label>
      <div className="relative w-full border rounded-md h-[46px] flex overflow-hidden">
        <input
          type="file"
          className="hidden"
          id="fileInput"
          onChange={handleChange}
        />
        <label
          htmlFor="fileInput"
          className="bg-zinc-200 flex items-center justify-center h-[46px] w-[130px] cursor-pointer text-zinc-900"
        >
          Sélec. fichier
        </label>
        <span
          className="ml-2 flex items-center justify-center"
          id="selectedFile"
        >
          {showSelectedFile && selectedFile && (
            <>
              {selectedFile}
              <button
                className="absolute right-[15px] rounded-full flex items-center"
                disabled={formState === "submitting"}
              >
                {formState === "submitting" ? (
                  <Spinner size={20} color="#B5B5B5" />
                ) : formState === "success" ? (
                  <div
                    className="w-12 h-12 relative left-[10px]"
                    ref={animationContainer}
                  ></div>
                ) : (
                  <Submit className="w-6 h-6 stroke-zinc-500" />
                )}
              </button>
            </>
          )}
        </span>
      </div>
    </form>
  );
};

export default ProfilePictureForm;
