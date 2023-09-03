import Button from "./Button";
import { signIn } from "next-auth/react"
import { useState } from "react";
import {Google, GoogleSecondary} from "./Icons/BrandLogos/Google";
import {Discord, DiscordSecondary} from "./Icons/BrandLogos/Discord";


export const ProvidersButtonsBloc = () => {

    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
    const [isLoadingDiscord, setIsLoadingDiscord] = useState(false);

    const handleLogin = provider => {
        try {
            if (provider === "google") {
                setIsLoadingGoogle(true)
            }
            else if (provider === "discord") {
                setIsLoadingDiscord(true)
            }
            signIn(provider)
        }
        catch (e) {
        }
    }

    return <>
        <Button className={`border border-[#dbdcde] text-white w-full h-[50px] gap-4 flex items-center  text-sm disabled:opacity-50 disabled:pointer-events-none px-3 rounded-[5px] mt-2 transition duration-200 ${isLoadingGoogle ? "bg-vprimary/[.16]" : "bg-white hover:bg-zinc-200/[.60]"}`} onClick={() => handleLogin("google")}>
            <Google />
            <h3 className="text-zinc-500 text-base font-normal">
                {isLoadingGoogle ? "Connexion en cours..." : "Continuer avec Google"}
            </h3>
        </Button>
        <Button className={`border border-[#dbdcde] text-white w-full h-[50px] gap-4 flex items-center  text-sm disabled:opacity-50 disabled:pointer-events-none px-3 rounded-[5px] mt-2 transition duration-200 ${isLoadingDiscord ? "bg-vprimary/[.16]" : "bg-white hover:bg-zinc-200/[.60]"}`} onClick={() => handleLogin("discord")}>
            <Discord color={"#5865F2"} />
            <h3 className="text-zinc-500 text-base font-normal">
                {isLoadingDiscord ? "Connexion en cours..." : "Continuer avec Discord"}
            </h3>
        </Button>
    </>
}

export const ProvidersButtonsBlocSecondary = () => {

    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
    const [isLoadingDiscord, setIsLoadingDiscord] = useState(false);

    const handleLogin = provider => {
        try {
            if (provider === "google") {
                setIsLoadingGoogle(true)
            }
            else if (provider === "discord") {
                setIsLoadingDiscord(true)
            }
            signIn(provider)
        }
        catch (e) {
        }
    }

    return <div className="flex flex-row w-full gap-3 h-[38px]">
        <Button className={`w-1/2 flex items-center justify-center shadow-sm ring-1 ring-inset ring-gray-200 rounded-md  ${isLoadingGoogle ? "bg-zinc-200/[.60]" : "bg-white "} hover:bg-zinc-200/[.60]`} onClick={() => handleLogin("google")}>
            {isLoadingGoogle ?
            <Google className="h-[19px] w-[19px]" />
            :
            <GoogleSecondary className="text-zinc-500/[.80] h-4 w-4" />
        }
        </Button>
        <Button className={`w-1/2 flex items-center justify-center shadow-sm ring-1 ring-inset ring-gray-200 rounded-md ${isLoadingDiscord ? "bg-zinc-200/[.60]" : "bg-white "} hover:bg-zinc-200/[.60]`} onClick={() => handleLogin("discord")}>
            {isLoadingDiscord ?
        <Discord color={"#5865F2"} className="h5 w-5" />
        : <DiscordSecondary className="text-zinc-500/[.80] h-5 w-5" />
        }
        </Button>
    </div>

}

