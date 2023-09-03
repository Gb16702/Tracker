"use client";

import { useState } from "react";
import Edit from "../Icons/HeroIcons/admin/Edit";
import { Close } from "../Icons/HeroIcons/Close";
import Select from "../Select";
import { useRouter } from "next/navigation";
import Toast from "../Toast";
import { toast } from "react-hot-toast";

const EditRolesComponent = ({ user, roles }) => {
  const [open, setOpen] = useState(false),
    [selectedOption, setSelectedOption] = useState(""),
    [roleChanges, setRoleChanges] = useState([]);

  const router = useRouter();

  const handleEditRoles = () => {
    setOpen(true);
  };

  const filteredRoleForSelect = (users) => {
    const userRoleName = users.roles.name;
    return roles
      .filter((role) => role.name !== userRoleName && role.name !== "Fondateur")
      .map((role) => ({
        value: role.name,
        label: role.name,
      }));
  };

  const handleResetSelect = (user) => {
    const updatedRoleChanges = roleChanges.filter(
      (change) => change.user !== user.username
    );
    setRoleChanges(updatedRoleChanges);
    setSelectedOption(updatedRoleChanges.length > 0 ? "save" : "");
  };

  function handleSelectChange(value, user) {
    const updatedRoleChanges = [...roleChanges],
      existingChangeIndex = updatedRoleChanges.findIndex((change) => {
        return change.user === user.username;
      });

    if (existingChangeIndex !== -1)
      updatedRoleChanges[existingChangeIndex].newRole = value;
    else {
      updatedRoleChanges.push({
        user: user.username,
        previousRole: user.roles.name,
        newRole: value,
      });
    }

    setRoleChanges(updatedRoleChanges);
    setSelectedOption("save");
  }

  const handleSave = async () => {
    if (roleChanges.length === 0) return;

    const role = roleChanges[0].newRole;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/roles`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role,
            uid: user._id,
          }),
        }
      );
      if (!response.ok) {
        toast.custom(
          <Toast
            message="Une erreur est survenue"
            variant="error"
            type="Erreur"
            dark
          />
        );
      } else {
        const { message } = await response.json();
        toast.custom(
          <Toast message={message} variant="admin_success" type="Succès" dark />
        );
        setOpen(false)
        router.refresh();
      }
    } catch (e) {
      console.error(`Erreur lors de la mise à jour`, e);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5] ">
          <div className="fixed z-20 top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-adminBgAlt rounded-xl p-[20px] border border-zinc-800">
            <div className="justify-between items-center flex">
              <h3 className="text-zinc-100 font-medium text-[20px] tracking-tight">
                Modifier le rôle de {user.username}
              </h3>
              <Close
                className="text-xl cursor-pointer fill-zinc-100"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="mt-3">
              <div>
                <h3 className="text-zinc-200 text-sm py-2">
                  Rôle actuel : {user.roles.name}
                </h3>
                <div className="text-zinc-200 text-sm py-2 border-t border-zinc-800">
                  Nouveau rôle :
                  <div className="w-[300px] h-[40px] mt-2">
                    <Select
                      placeholder="Modifier le rôle"
                      options={filteredRoleForSelect(user)}
                      className=" bg-zinc-900 rounded-md w-full h-full px-2 py-2 "
                      onChange={(value) => handleSelectChange(value, user)}
                      onReset={() => handleResetSelect(user)}
                    />
                  </div>
                </div>
                {selectedOption === "save" && roleChanges.length > 0 && (
                  <button
                    onClick={handleSave}
                    className="w-full h-[40px] text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3  rounded-[5px] transition-all dureation-300 bg-vprimary text-zinc-200"
                  >
                    Sauvegarder
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="p-2 bg-zinc-900 rounded-md cursor-pointer"
        onClick={handleEditRoles}
      >
        <Edit className=" w-5 h-5 stroke-zinc-200" />
      </div>
    </>
  );
};

export default EditRolesComponent;
