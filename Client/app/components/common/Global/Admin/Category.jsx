"use client";

import { GetPathname } from "../GetPathname";

const Category = () => {
  let category;
  if (GetPathname() === "dashboard") {
    category = "Derniers utilisateurs inscrits";
  }
  if (GetPathname() === "utilisateurs") {
    category = "Tous les utilisateurs inscrits";
  }
  if (GetPathname() === "roles") {
    category = "Tous les rôles";
  }
  if (GetPathname() === "jeux") {
    category = "Tous les jeux";
  }

  return (
    <h3 className="text-zinc-100 text-[18px] tracking-tight ">{category}</h3>
  );
};

export default Category;
