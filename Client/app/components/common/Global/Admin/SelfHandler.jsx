"use client"

import Image from "next/image"
import { useState } from "react"

const SelfHandler = ({session}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(true)
    }

    return <>
    <Image
    src={session?.avatar}
    alt={`Image de profil de ${session?.username}`}
    className="rounded-full object-cover w-[36px] h-[36px]"
    width={50}
    height={50}

    onClick={handleClick}
    />
    </>
}

export default SelfHandler