"use client"

import { signOut } from "next-auth/react";

const LogoutButton = ({isLogged, text, className}) => {

    const handleClick = () => {
        signOut();
    }

    return  <button className="w-full" onClick={handleClick} >
                 <h3 className={className}>{isLogged ? text : "Déconnexion"}</h3>
            </button>
}

export default LogoutButton;