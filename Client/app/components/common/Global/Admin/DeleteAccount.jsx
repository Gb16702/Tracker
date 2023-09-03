"use client"

import { useState } from "react"
import Trash from "./Trash"
import { Close } from "../Icons/HeroIcons/Close"
import Button from "../Button"
import Toast from "../Toast"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

const DeleteAccount = ({user}) => {

    const [isModalOpen, setIsModalOpen] = useState(false),
    [loading, setLoading] = useState(false),
    router = useRouter(),

    handleClick = e => {
        setIsModalOpen(true)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const response = await fetch(`http://localhost:8000/api/admin/users/${user.user._id}`, {
            method: "DELETE",
        })
        if(!response.ok) {
            setLoading(false)
            return
        }
        else {
            setLoading(false)
            toast.custom(<Toast message="Compte supprimé avec succès !" variant = "success" type="Succès" />)
            router.push("/administration/utilisateurs")
            router.refresh()
        }

    }

    return (
        <>
            {isModalOpen && (
                <>
                <div className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5] "></div>
            <div className="fixed z-20 top-1/2 left-1/2 w-[500px] h-[180px] -translate-x-1/2 -translate-y-1/2 bg-adminBgAlt rounded-xl p-[20px] border border-zinc-800">
            <div className="justify-between items-center flex">
            <h3 className="text-zinc-100 font-medium text-[20px] tracking-tight">
              Suppression de compte
            </h3>
            <Close className="text-xl cursor-pointer fill-zinc-100" onClick={() =>setIsModalOpen(false)} />
          </div>
          <h4 className="mt-1 text-sm text-zinc-400">
            {`Es-tu sûr de vouloir supprimer le compte de ${user.user.username} ?`}<br />
          </h4>
          <form  className="mt-7" onSubmit={handleSubmit}>
            <Button className={`w-full h-[46px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px] transition-all dureation-300 bg-zinc-100 text-zinc-700`}
            >
              Supprimer le compte
            </Button>
          </form>
          </div>
                </>
            )}
            <Trash className="w-5 h-5 stroke-white cursor-pointer" onClick={handleClick} />
            </>
    )
}

export default DeleteAccount