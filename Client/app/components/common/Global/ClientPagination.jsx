"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const ClientPagination = ({ totalPages, initialPage, slug, records }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(Number(initialPage) || 1);
  const ref = useRef(null);

  const url = `/${slug}/classement`;
  const searchParams = useSearchParams();

  const handleClick = (page) => {
    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }
    setCurrentPage(page);
    searchParams.get("records")
      ? router.push(`${url}?page=${page}&records=${records}`)
      : router.push(`${url}?page=${page}`);

    router.refresh();
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    if (totalPages > 5) {
      for (let i = 0; i < totalPages; i++) {
        if (
          i === 0 ||
          i === totalPages - 1 ||
          i === currentPage - 1 ||
          i === currentPage
        ) {
          pageButtons.push(
            <button
              key={i}
              onClick={() => handleClick(i + 1)}
              className={`px-4 py-2 text-white ${
                currentPage === i + 1 ? "bg-[#FF4655]" : ""
              }`}
            >
              {i + 1}
            </button>
          );
        } else {
          if (i === currentPage - 2 || i === currentPage + 2) {
            pageButtons.push(
              <input
                key={i}
                className={`py-2 text-white outline outline-transparent bg-transparent w-[40px] text-center focus:w-[100px] focus:outline focus:outline-[#FF4655] transition-all duration-150 focus:placeholder-transparent`}
                placeholder=". . ."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (
                      e.target.value !== "" &&
                      e.target.value > 0 &&
                      e.target.value <= totalPages
                    ) {
                      searchParams.get("records")
                        ? router.push(
                            `${url}?page=${e.target.value}&records=${records}`
                          )
                        : router.push(`${url}?page=${e.target.value}`);
                      setCurrentPage(Number(e.target.value));
                    } else {
                      return toast.error("Le nombre est invalide");
                    }
                  }
                }}
              />
            );
          }
        }
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`px-4 py-2 text-white ${
              currentPage === i ? "bg-[#FF4655]" : ""
            }`}
          >
            {i}
          </button>
        );
      }
    }
    return pageButtons;
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("keydown", (e) => {
        if (
          e.key === "Enter" &&
          e.target.value !== "" &&
          !isNaN(e.target.value)
        ) {
          if (e.target.value >= 5) {
            searchParams.get("page")
              ? router.push(`${url}?page=1&records=${e.target.value}`)
              : router.push(`${url}?records=${e.target.value}`);
          } else {
            return toast.error("Le nombre doit être supérieur ou égal à 5");
          }
        }
      });
    }
  }, []);

  return (
    <div className="flex justify-end w-full my-2 gap-x-2 max-sm:flex-col max-sm:items-end max-sm:gap-y-2">
      <div className="h-[40px]">
        <input
          className="h-full max-sm:min-w-[250px] bg-[#1B2733] rounded-[4px] text-white px-4 py-2 focus:outline focus:outline-[#FF4655] border-none"
          ref={ref}
          placeholder={`${
            searchParams.get("records")
              ? records + " résultats par page"
              : "10 résultats par page"
          }`}
        />
      </div>
      <div className="bg-[#1B2733] rounded-[4px] max-sm:min-w-[250px]">
        {renderPageButtons()}
      </div>
    </div>
  );
};

export default ClientPagination;
