"use client"

import { usePathname } from "next/navigation"

export const GetPathname = () => {
    const pathname = usePathname();
    const pathnameArray = pathname.split("/")[2];
    return pathnameArray;
}