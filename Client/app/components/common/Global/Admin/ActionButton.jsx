"use client";

import { useState, useRef, useEffect } from "react";

import EditStatus from "./EditStatus";
import { toast } from "react-hot-toast";
import Toast from "../Toast";
import { useRouter } from "next/navigation";
import { GetPathname } from "../GetPathname";

const ActionButton = ({
  select,
  isSelected,
  item,
  subject,
  selectedStatus,
  category,
  isPublished,
  testimonialIdentifier,
  setFocused,
  slug,
  game,
}) => {
  const [isOpen, setIsOpen] = useState(false),
    [isVisible, setIsVisible] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  const handleEditClick = () => {
    setIsVisible(true);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const router = useRouter();

  const handleChange = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/testimonials/${testimonialIdentifier}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isVisible: !isPublished }),
      }
    );

    if (response.ok) {
      const { message } = await response.json();
      toast.custom(
        <Toast message={message} variant="admin_success" type="Succès" dark />
      );
      router.refresh();
    }
  };

  const pathname = GetPathname();

  const getActions = () => {
    if (pathname == "retours") {
      return [
        {
          name: isPublished ? "Cacher" : "Publier",
          callback: handleChange,
        },
        {
          name: "Détails",
          callback: handleFocus,
        },
        {
          name: isSelected ? "Désélectionner" : "Sélectionner",
          callback: select,
        },
      ];
    } else if (pathname == "sujets") {
      return [
        {
          name: "Modifier",
          callback: handleEditClick,
        },
        {
          name: isSelected ? "Désélectionner" : "Sélectionner",
          callback: select,
        },
      ];
    } else if (pathname == "utilisateurs") {
      return [
        {
          name: "Voir le profil",
          callback: () => {
            router.push(`/administration/utilisateurs/${slug}`);
          },
        },
      ];
    } else if (pathname == "jeux") {
      return [
        {
          name: "Modifier",
          callback: handleEditClick,
        },
        {
          name: isSelected ? "Désélectionner" : "Sélectionner",
          callback: select,
        },
      ];
    }
  };

  return (
    <>
      {isVisible && (
        <>
          <EditStatus
            selectedStatus={selectedStatus}
            item={item}
            subject={subject}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            category={category}
            game={game}
          />
        </>
      )}
      {isOpen && !isVisible && (
        <>
          <ActionButtonMenu action={getActions()} setIsOpen={setIsOpen} />
        </>
      )}
      <button
        onClick={handleClick}
        className="tracking-[.2em] pt-[2px] pb-1 px-1 hover:bg-zinc-800 rounded-md relative flex items-center justify-center"
      >
        <span className="w-fit h-fit relative bottom-[2px] left-[1px]">
          ...
        </span>
      </button>
    </>
  );
};

const ActionButtonMenu = ({ action, setIsOpen }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-md border border-zinc-800/[.8] bg-[#151517] fixed py-3 w-[200px] px-2 z-30"
    >
      <ActionButtonMenuItem action={action} />
    </div>
  );
};

const ActionButtonMenuItem = ({ action }) => {
  return action.map((a, index) => (
    <div key={index}>
      <button
        className="py-1 text-sm text-zinc-200 cursor-pointer"
        onClick={a.callback}
      >
        {a.name}
      </button>
      {index != action.length - 1 && (
        <hr className="border-zinc-800/[.8] my-1" />
      )}
    </div>
  ));
};
export { ActionButton };
