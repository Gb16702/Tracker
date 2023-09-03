"use client";

import Image from "next/image";
import { Close } from "./Icons/HeroIcons/Close";
import { useState, useRef, useEffect, useCallback } from "react";
import NotFound from "./Icons/HeroIcons/admin/NotFound";

import { useRouter } from "next/navigation";

import {
  ArrowBottomSearchbar,
  ArrowTopSearchbar,
  ArrowEnter,
} from "./Icons/HeroIcons/admin/ArrowsForMenu";
import Edit from "./Icons/HeroIcons/admin/Edit";

const GlobalSearchBar = ({ trackerSection, gameSlug }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();

  const ref = useRef(null);

  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleChange = async (e) => {
    if (open) {
      setLoader(true);
      const searchValue = e.target.value;
      setSearch(searchValue);

      if (searchValue === "") {
        setLoading(false);
        return;
      }

      setLoading(true);

      let response;

      if (!trackerSection) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/allUsers?search=${searchValue}`
        );
      } else {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/jeu/${gameSlug}/allUsers?search=${searchValue}`
        );
      }

      if (response.ok) {
        const { users } = await response.json();
        setData(users);
      }
    }
    setLoader(false);
  };

  const handleEscape = (e) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
    }
  };

  const handleArrowNavigation = (e) => {
    if (!trackerSection) {
      if (e.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        scrollToSelected();
      }
      if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, data.length - 1)
        );
        scrollToSelected();
      }
    } else {
      if (e.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        scrollToSelected();
      }
      if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, data?.length - 1)
        );
        scrollToSelected();
      }
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && open) {
      if (data && data.length > 0 && data[selectedIndex]?.slug) {
        if (!trackerSection) {
          router.push(
            `/administration/utilisateurs/${data[selectedIndex]?.slug}`
          );
        } else {
          router.push(`/${gameSlug}/${data[selectedIndex]?.slug}`);
        }
        setOpen(false);
      }
    }
  };

  const handleOpenSearchbar = useCallback((e) => {
    if (e.altKey && e.key === "s") {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleOpenSearchbar);
    return () => {
      document.removeEventListener("keydown", handleOpenSearchbar);
    };
  }, [handleOpenSearchbar]);

  useEffect(() => {
    const handleKeydown = (e) => {
      handleEscape(e);
      handleArrowNavigation(e);
      handleEnter(e);
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [selectedIndex, handleEscape, handleArrowNavigation, handleEnter]);

  const scrollToSelected = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleMouseOver = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      {open && (
        <>
          <div
            className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5] backdrop-blur-[2px]"
            onClick={handleClick}
          ></div>
          <div
            className={`border border-zinc-800 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 rounded-lg w-[580px] max-sm:w-[95%] bg-adminBgAlt overflow-hidden flex flex-col ${
              loading && "h-[650px]"
            }`}
            ref={ref}
          >
            <div
              className={`w-full text-sm bg-adminBgAlt border-b border-zinc-800 flex flex-row justify-between items-center px-4 gap-x-1 ${
                loading ? "min-h-[9%]" : "h-[50px]"
              }`}
            >
              <input
                type="text"
                className="bg-transparent flex flex-1 text-zinc-300 placeholder-zinc-300 outline-none"
                placeholder="Tapez votre recherche..."
                onChange={handleChange}
                value={search}
                autoFocus
              />
              <Close
                className="fill-zinc-300 w-4 h-4 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            {loading && (
              <>
                <div
                  className="flex h-[82%] max-sm:h-[91%] overflow-y-auto flex-col px-4 gap-y-2 scrollbar pb-[20px]"
                  tabIndex={0}
                  ref={ref}
                >
                  {data && data.length > 0 && (
                    <h2 className="text-zinc-300 py-3 text-sm">
                      {data.length} résultats
                    </h2>
                  )}
                  {data && data.length > 0 && (
                    <>
                      {data.map((u_, index) => (
                        <div
                          key={index}
                          className={`w-full min-h-[65px] rounded-lg px-2 bg-adminBgAlt cursor-pointer ${
                            index === selectedIndex &&
                            "outline outline-1 outline-zinc-800 brightness-[115%]"
                          } `}
                          ref={index === selectedIndex ? ref : null}
                          onClick={() => {
                            !trackerSection
                              ? router.push(
                                  `/administration/utilisateurs/${u_.slug}`
                                )
                              : router.push(`/${gameSlug}/${u_._id}`);
                            setOpen(false);
                          }}
                          onMouseOver={() => handleMouseOver(index)}
                        >
                          <div className="flex flex-row gap-x-2 items-center h-full py-3">
                            {u_.avatar ? (
                              <Image
                                src={u_.avatar}
                                alt={`Image de ${u_.username}`}
                                className="rounded-full object-cover w-[40px] h-[40px]"
                                width={80}
                                height={80}
                              />
                            ) : (
                              <div className="rounded-full w-[40px] h-[40px] bg-zinc-800"></div>
                            )}
                            <div className="flex flex-1 justify-between h-full">
                              <div className="flex flex-col justify-between">
                                <h3 className="w-[50%] block float-left uppercase tracking-wide text-zinc-300">
                                  {u_.username}
                                </h3>
                                <h4 className="text-[13px] text-zinc-400 font-extralight">
                                  {trackerSection
                                    ? u_.division.name
                                    : u_.roles.name}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {(!data || data.length === 0) &&
                    search.length >= 1 &&
                    !loader && (
                      <section className="w-full flex items-center justify-center h-[400px]">
                        <div className="w-full">
                          <div className="rounded-md bg-adminBgAlt w-full h-[330px] flex items-center justify-center flex-col">
                            <>
                              <NotFound />
                              <h3 className="text-center text-[16px] tracking-tight text-zinc-300">
                                Pas de résultat pour cette recherche : "{search}
                                "
                              </h3>
                            </>
                          </div>
                        </div>
                      </section>
                    )}
                </div>
                <div className="w-full h-[9%] border-t border-zinc-800 flex items-center justify-between px-4 gap-x-1 bg-zinc-900/[.9] max-sm:hidden">
                  <div className="text-zinc-300 text-sm flex flex-row items-center gap-x-2">
                    <div className="w-[32px] h-[22px] bg-zinc-700/[.7] rounded-[5px] flex items-center justify-center shadow-sm">
                      <ArrowEnter className="w-[14px] h-[14px] rotate-180" />
                    </div>
                    To enter
                  </div>
                  <div className="text-zinc-300 text-sm flex flex-row items-center gap-x-2">
                    <div className="flex items-center flex-row gap-x-2">
                      <div className="p-1 bg-zinc-700/[.7] rounded-[5px] flex items-center justify-center shadow-sm">
                        <ArrowBottomSearchbar className="w-[14px] h-[14px]" />
                      </div>
                      <div className="p-1 bg-zinc-700/[.7] rounded-[5px] flex items-center justify-center shadow-sm">
                        <ArrowTopSearchbar className="w-[14px] h-[14px]" />
                      </div>
                    </div>
                    To navigate
                  </div>
                  <div className="text-zinc-300 text-sm flex flex-row items-center gap-x-2">
                    <div className="w-[32px] h-[22px] bg-zinc-700/[.7] rounded-[5px] flex items-center justify-center shadow-sm">
                      Esc
                    </div>
                    To close
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {!trackerSection ? (
        <button
          className="bg-zinc-900 rounded-lg text-zinc-300 w-[300px] py-[6px] border border-zinc-800 text-[15px] flex-start px-4 items-center gap-x-2 text-sm flex justify-between"
          onClick={() => setOpen(true)}
        >
          <div className="flex flex-row items-center gap-x-1">
            Rechercher...
          </div>
          <div className="py-[2px] px-2 bg-adminBgAlt rounded-md border border-zinc-800 text-[12px]">
            ALT S
          </div>
        </button>
      ) : (
        <button
          className="mt-[23px] w-[80%] max-sm:w-[92%] py-3 max-sm:py-2 rounded-md px-3 placeholder-slate-500 font-light bg-zinc-200 text-[15px] flex"
          onClick={() => setOpen(true)}
        >
          Trouver un joueur
        </button>
      )}
    </>
  );
};

export default GlobalSearchBar;
