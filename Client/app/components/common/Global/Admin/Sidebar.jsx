"use client";

import AdminTag from "./AdminTag";
import Home from "../Icons/HeroIcons/admin/Home";
import User from "../Icons/HeroIcons/admin/User";
import Role from "../Icons/HeroIcons/admin/Role";
import Back from "../Icons/HeroIcons/admin/Back";
import Game from "../Icons/HeroIcons/admin/Game";
import Subject from "../Icons/HeroIcons/admin/Subject";
import Chat from "../Icons/HeroIcons/admin/Chat";

const Sidebar = ({ children }) => {
  const defaultIconClassName = "w-6 h-6 stroke-white";

  return (
    <>
      <aside
        className={`w-[260px] h-[100vh] bg-adminBgAlt transition-all duration-100 relative border-r border-zinc-800`}
      >
        <AdminTag linkTo="/administration/dashboard" text="Dashboard">
          <Home className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/administration/utilisateurs" text="Utilisateurs">
          <User className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/administration/roles" text="Rôles">
          <Role className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/administration/sujets" text="Sujets">
          <Subject className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/administration/jeux" text="Jeux">
          <Game className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/administration/retours" text="Retours">
          <Chat className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/" text="Quitter">
          <Back className={`${defaultIconClassName}`} />
        </AdminTag>
      </aside>
    </>
  );
};

export default Sidebar;
