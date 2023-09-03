"use client"

import { usePathname } from "next/navigation";

const GetProfilePathname = () => {
    const pathname = usePathname();

    const pathnameArray = pathname.split("/");

    const section = pathnameArray[pathnameArray.length - 1];

    return section;
}

export default GetProfilePathname;