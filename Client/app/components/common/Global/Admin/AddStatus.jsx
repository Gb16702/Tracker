"use client";

import { useState } from "react";
import Add from "../Icons/HeroIcons/admin/Add";
import Button from "../Button";
import { toast } from "react-hot-toast";
import Toast from "../Toast";
import { useRouter } from "next/navigation";
import Cross from "../Icons/HeroIcons/admin/Cross";

const fetcher = async (value, pathname, { popularity, data, banner }) => {
  let bodyValue;

  if (pathname === "contact") {
    bodyValue = { subject: value };
  } else if (pathname === "jeux") {
    bodyValue = {
      name: value,
      popularity,
      picture: data,
      banner,
    };
  } else if (pathname === "sujets") {
    bodyValue = {
      category: value,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${pathname}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bodyValue,
        }),
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

const AddStatus = ({ pathname, session, tags, item, isSelectedStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false),
    [loading, setLoading] = useState(false),
    [value, setValue] = useState(""),
    [selectedFile, setSelectedFile] = useState(null),
    [bannerFile, setBannerFile] = useState(null),
    [showSelectedFile, setShowSelectedFile] = useState(true),
    [popularity, setPopularity] = useState(""),
    [key, setKey] = useState(""),
    [disabled, setDisabled] = useState(false);

  const getPathname = () => {
    if (pathname === "contact") {
      return "contact";
    } else if (pathname === "jeux") {
      return "jeu";
    } else if (pathname == "sujets") {
      return "sujet";
    }
  };

  const router = useRouter();

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    try {
      const target = e.currentTarget;
      const fileInput = Array.from(target.elements).find(
        (element) => element.id === "fileInput"
      );

      if (fileInput && bannerFile) {
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);

        const bannerReader = new FileReader();
        bannerReader.readAsDataURL(bannerFile);

        reader.onloadend = async () => {
          bannerReader.onloadend = async () => {
            const base64EncodedImage = reader.result;
            const base64EncodedBanner = bannerReader.result;

            await fetcher(value, pathname, {
              key,
              popularity,
              data: base64EncodedImage,
              banner: base64EncodedBanner,
              session,
            });

            setLoading(false);
            setIsModalOpen(false);
            isSelectedStatus([]);
            router.refresh();

            toast.custom(
              <Toast
                message={`Le jeu a bien été ajouté`}
                variant="admin_success"
                type="Succès"
                dark
              />
            );
          };

          reader.onerror = () => {
            console.log("Erreur lors de la lecture de l'image");
          };
        };
      } else {
        await fetcher(value, {
          pathname,
          key,
          session,
        });

        console.log("value", value);

        setLoading(false);
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0].name);
    setShowSelectedFile(true);
  };

  const handlePopularity = (e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    if (sanitizedValue.length > 2 || sanitizedValue > 10)
      return toast.error("La popularité est trop grande");
    setPopularity(sanitizedValue);
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
                {"Ajout de " + getPathname()}
              </h3>
              <Cross
                className="w-5 h-5 cursor-pointer stroke-zinc-100"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <form className="mt-7 flex flex-col gap-y" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={
                  getPathname() === "catégorie"
                    ? `Ajouter la ${getPathname()}`
                    : `Ajouter le ${getPathname()}`
                }
                className="w-full h-[46px] rounded-md px-3 outline-none bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200 text-sm font-light placeholder-zinc-400"
                onChange={(e) => setValue(e.target.value)}
              />
              {pathname == "jeux" && (
                <>
                  <div>
                    <input
                      type="text"
                      className="w-full h-[46px] rounded-md px-3 outline-none bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200 text-sm font-light placeholder-zinc-400 my-1"
                      placeholder="Popularité du jeu sur 10"
                      value={popularity}
                      onChange={handlePopularity}
                    />
                  </div>
                  <div className="relative w-full bg-zinc-900 rounded-md h-[46px] flex overflow-hidden">
                    <input
                      type="file"
                      name="file"
                      className="hidden"
                      id="fileInput"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="fileInput"
                      className="bg-zinc-900 border-r border-vprimary flex items-center justify-center h-[46px] w-[130px] cursor-pointer text-sm text-zinc-400 font-light"
                    >
                      Image du jeu
                    </label>
                    <span
                      className="ml-2 text-zinc-400 text-sm font-light flex items-center justify-center"
                      id="selectedFile"
                    >
                      {selectedFile
                        ? selectedFile
                        : "Aucun fichier sélectionné"}
                    </span>
                  </div>
                  <div className="relative w-full bg-zinc-900 rounded-md h-[46px] flex overflow-hidden mt-1">
                    <input
                      type="file"
                      name="bannerFile"
                      className="hidden"
                      id="bannerFileInput"
                      onChange={(e) => setBannerFile(e.target.files[0])}
                    />
                    <label
                      htmlFor="bannerFileInput"
                      className="bg-zinc-900 border-r border-vprimary flex items-center justify-center h-[46px] w-[130px] cursor-pointer text-sm text-zinc-400 font-light"
                    >
                      Bannière du jeu
                    </label>
                    <span
                      className="ml-2 text-zinc-400 text-sm font-light flex items-center justify-center"
                      id="selectedBannerFile"
                    >
                      {bannerFile
                        ? bannerFile.name
                        : "Aucun fichier sélectionné"}
                    </span>
                  </div>
                </>
              )}
              <Button
                disabled={disabled}
                className={`w-full h-[46px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px] transition-all dureation-300 bg-vprimary text-zinc-200`}
              >
                {"Ajouter le " + getPathname()}
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
export default AddStatus;
