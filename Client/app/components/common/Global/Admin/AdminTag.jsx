"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const AdminTag = ({linkTo, children, text}) => {

    const [isActive, setIsActive] = useState(false)
    const pathname = usePathname()
    const newPathname = pathname.split("/administration/")[1]

    useEffect(() => {
        if(newPathname.includes(linkTo.split("/administration/")[1]))
            setIsActive(true)
        else
            setIsActive(false)
    }, [newPathname])

    return  <div className="w-full h-[60px]">
                <Link href={linkTo} className={`w-full h-full flex items-center ${isActive && "border-l-2 border-vprimary"}`}>
                <div className="px-[25px] flex flex-row gap-x-4 justify-start">
                    {children}
                    <h2 className={`${isActive ? "text-white" : "text-zinc-400"} text-[17px] capitalize medium`}>{text}</h2>
                </div>
                </Link>
            </div>
}

export default AdminTag