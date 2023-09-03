"use client";

import Edit from "../Icons/HeroIcons/admin/Edit";
import Toast from "../Toast";
import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Close } from "../Icons/HeroIcons/Close";
import Button from "../Button";
import { toast } from "react-hot-toast";

const EditStatus = ({
  selectedStatus,
  item,
  subject,
  isVisible,
  setIsVisible,
  category,
  game,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false),
    [updatedValues, setUpdatedValues] = useState([]),
    [selectedFile, setSelectedFile] = useState(null),
    [showSelectedFile, setShowSelectedFile] = useState(true),
    [bannerFile, setBannerFile] = useState(null);

  const sendUpdateRequest = async (requestBody) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${item}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...requestBody,
        }),
      });

      return response;
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setIsLoading(false);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (updatedValues.length === 0) {
      setIsLoading(false);
      return;
    }

    try {
      const requestBody = {
        statusUpdates: updatedValues,
        identifier: game.id,
      };

      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onloadend = async () => {
          const base64EncodedImage = reader.result;
          requestBody.statusUpdates.forEach((update) => {
            update.image = base64EncodedImage;
          });

          await sendUpdateRequest(requestBody);
          handleSuccess();
        };
      }

      if (bannerFile) {
        const bannerReader = new FileReader();
        bannerReader.readAsDataURL(bannerFile);

        bannerReader.onloadend = async () => {
          const base64EncodedBanner = bannerReader.result;
          requestBody.statusUpdates.forEach((update) => {
            update.banner = base64EncodedBanner;
          });

          await sendUpdateRequest(requestBody);
          handleSuccess();
        };
      }

      if (!selectedFile && !bannerFile) {
        await sendUpdateRequest(requestBody);
        handleSuccess();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    setIsLoading(false);
    setIsVisible(false);
    toast.custom(
      <Toast
        message="Update successful"
        variant="admin_success"
        type="Success"
        dark
      />
    );
    router.refresh();
  };

  const handleChange = (field, value, e) => {
    setUpdatedValues((prevValues) => {
      const updated = [...prevValues];

      if (!updated[0]) {
        updated[0] = {};
      }

      if (field === "image") {
        const file = e.target.files[0];
        setSelectedFile(file);
        setShowSelectedFile(true);
      } else if (field === "banner") {
        const file = e.target.files[0];
        setBannerFile(file);
      } else {
        updated[0][field] = value;
      }
      return updated;
    });
  };

  return (
    <>
      {isVisible && (
        <>
          <div className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5] "></div>
          <div className="fixed z-20 top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-adminBgAlt rounded-xl p-[20px] border border-zinc-800">
            <div className="justify-between items-center flex">
              <h3 className="text-zinc-100 font-medium text-[20px] tracking-tight">
                Modification de {item}
              </h3>
              <Close
                className="text-xl cursor-pointer fill-zinc-100"
                onClick={() => setIsVisible(false)}
              />
            </div>
            <form className="mt-7" onSubmit={handleSubmit}>
              {item === "jeu" && (
                <Fragment>
                  <label className="text-sm text-zinc-200 mb-1">Nom</label>
                  <input
                    type="text"
                    className="w-full h-[46px] rounded-md px-3 outline-none bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200 text-sm font-light placeholder-zinc-400 mb-1"
                    onChange={(e) => handleChange("name", e.target.value)}
                    defaultValue={game.name}
                  />
                  <label className="text-sm text-zinc-200 mb-1">
                    Popularité
                  </label>
                  <input
                    type="text"
                    className="w-full h-[46px] rounded-md px-3 outline-none bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200 text-sm font-light placeholder-zinc-400 mb-1"
                    onChange={(e) => handleChange("popularity", e.target.value)}
                    defaultValue={game.popularity}
                  />

                  <label className="text-sm text-zinc-200 mb-1">Image</label>
                  <div className="relative w-full rounded-md h-[46px] flex overflow-hidden bg-zinc-900 mt-1">
                    <input
                      type="file"
                      className="hidden"
                      id="fileInput"
                      onChange={(e) => handleChange("image", e.target.value, e)}
                    />
                    <label
                      htmlFor="fileInput"
                      className=" text-zinc-200 flex items-center justify-center h-[46px] w-[130px] cursor-pointer"
                    >
                      Sélec. image
                    </label>
                    <span
                      className="ml-2 flex items-center justify-center text-zinc-200"
                      id="selectedFile"
                    >
                      {selectedFile && selectedFile.name}
                    </span>
                  </div>

                  <label className="text-sm text-zinc-200 mb-1">Bannière</label>
                  <div className="relative w-full rounded-md h-[46px] flex overflow-hidden bg-zinc-900 mt-1">
                    <input
                      type="file"
                      name="bannerFile"
                      className="hidden"
                      id="bannerFileInput"
                      onChange={(e) =>
                        handleChange("banner", e.target.value, e)
                      }
                    />
                    <label
                      htmlFor="bannerFileInput"
                      className=" text-zinc-200 flex items-center justify-center h-[46px] w-[130px] cursor-pointer"
                    >
                      Sélec. bannière
                    </label>
                    <span
                      className="ml-2 flex items-center justify-center text-zinc-200"
                      id="selectedBannerFile"
                    >
                      {bannerFile
                        ? bannerFile.name
                        : "Aucun fichier sélectionné"}
                    </span>
                  </div>
                </Fragment>
              )}
              {item === "sujet" && (
                <>
                  <input
                    type="text"
                    className="w-full h-[46px] rounded-md px-3 outline-none bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200 text-sm font-light placeholder-zinc-400"
                    defaultValue={category}
                    onChange={(e) => handleChange("category", e.target.value)}
                  />
                </>
              )}
              <Button
                className={`w-full h-[46px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px] transition-all dureation-300 bg-vprimary text-zinc-200`}
              >
                Sauvegarder
              </Button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditStatus;
