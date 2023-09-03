"use client"

import Link from "next/link"

const SidebarLink = ({href, iconOnly=false, text, icon, props}) => {

    return  <Link href={href} className={`flex ${iconOnly ? null : "gap-x-5"}`}>
        <>
                {icon && <span className="relative top-[3px]">{icon}</span>}
                {iconOnly && <h3 className="text-slate-800 font-medium text-base" {...props}>{text}</h3>}
        </>
            </Link>
}

export default SidebarLink;