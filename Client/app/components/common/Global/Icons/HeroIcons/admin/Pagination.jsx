"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, DoubleArrowLeft, DoubleArrowRight } from "../ArrowPagination"
import { useRouter } from "next/navigation"

const Pagination = (props) => {

    const [currentPage, setCurrentPage] = useState(Number(props.initialPage.page) || 1)
    const numberOfPages = props.totalPage

    const router = useRouter()

    const url = "/administration/utilisateurs"

    const handleClick = (page) => {
        setCurrentPage(page)
        if(currentPage < 1) {
            setCurrentPage(1)
        }
        else if (currentPage > numberOfPages) {
            setCurrentPage(numberOfPages)
        }
        router.push(`${url}?page=${page}`)
    }

    return  <div className="w-full flex justify-end">
        <div className="w-[400px] flex flex-row gap-x-4 justify-end h-[50px] items-center">
                <h2 className="text-zinc-100 text-[15px]">Page {currentPage} sur {numberOfPages}</h2>
            <div className="flex flex-row items-center h-full w-200px rounded-md">
                <button className="w-[35px] h-[30px]  bg-adminBgAlt flex items-center justify-center rounded-l-md hover:bg-zinc-800 transition duration-200"
                onClick={() => handleClick(1)} disabled={currentPage <= 1}>
                    <DoubleArrowLeft className="w-[18px] h-[18px] text-gray-400" />
                </button>
                <button className="w-[35px] h-[30px]  bg-adminBgAlt flex items-center justify-center border-l border-zinc-800  hover:bg-zinc-800 transition duration-200" onClick={() => handleClick(currentPage - 1)}>
                    <ArrowLeft className="w-[18px] h-[18px] text-gray-400" disabled={currentPage === numberOfPages} />
                </button>
                <button className="w-[35px] h-[30px]  bg-adminBgAlt flex items-center justify-center border-l border-zinc-800  hover:bg-zinc-800 transition duration-200" onClick={() => handleClick(currentPage + 1)} disabled={currentPage === numberOfPages}  >
                    <ArrowRight className="w-[18px] h-[18px] text-gray-400" />
                </button>
                <button className="w-[35px] h-[30px] bg-adminBgAlt flex items-center justify-center rounded-r-md border-l border-zinc-800  hover:bg-zinc-800 transition duration-200" onClick={() => handleClick(numberOfPages)} disabled={currentPage >= numberOfPages}>
                    <DoubleArrowRight className="w-[18px] h-[18px] text-gray-400" />
                </button>
            </div>
        </div>
        </div>
}

export default Pagination