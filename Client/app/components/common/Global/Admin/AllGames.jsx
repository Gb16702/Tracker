"use client";

import React, { useState } from "react";
import { timeSince } from "../../../../../lib/timeSince";
import AddStatus from "./AddStatus";
import DeleteStatus from "./DeleteStatus";
import { usePathname } from "next/navigation";
import Image from "next/image";
import EditStatus from "./EditStatus";
import { ActionButton } from "./ActionButton";

const GamesRow = ({
  image,
  name,
  popularity,
  createdAt,
  onSelect,
  item,
  games,
  game,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    onSelect(name, !isSelected);
  };

  return (
    <tr
      className={`align-top border-t border-zinc-800 ${
        isSelected && "bg-zinc-800"
      }`}
    >
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        <div className="flex items-center justify-start gap-x-5">
          <div className="flex items-center justify-start gap-x-5">
            <Image
              src={image}
              alt={`Image de la catégorie ${name}`}
              className="rounded-full object-cover w-[36px] h-[36px]"
              width={50}
              height={50}
            />
            <h3>{name}</h3>
          </div>
        </div>
      </th>
      <td className="px-6 py-4">{popularity}</td>
      <td className="px-6 py-4">{timeSince(new Date(createdAt))}</td>
      <td className="px-6 py-4">
        <ActionButton
          select={handleSelect}
          isSelected={isSelected}
          item={item}
          subject={games}
          game={game}
        />
      </td>
    </tr>
  );
};

const AllGames = ({ head, games }) => {
  const [selectedStatus, isSelectedStatus] = useState([]);

  const pathname = usePathname();
  const lastSection = pathname.split("/administration/")[1];

  const handleSelect = (state, isSelected) => {
    if (isSelected) isSelectedStatus([...selectedStatus, state]);
    else isSelectedStatus(selectedStatus.filter((s) => s !== state));
  };

  const item = "jeu";

  return (
    <>
      <>
        <section className="w-full rounded-md bg-adminBgAlt overflow-hidden">
          <table className="w-full h-full text-sm text-left">
            <thead className="text-xs uppercase bg-zinc-800">
              <tr className="text-zinc-100">
                {head.map((item, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 font-medium tracking-wider"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-adminBgAlt text-zinc-100">
              {games &&
                games
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((c, index) => (
                    <GamesRow
                      game={{
                        id: c._id,
                        name: c.name,
                        popularity: c.popularity,
                        createdAt: c.createdAt,
                        description: c.description,
                        image: c.image,
                      }}
                      key={index}
                      image={c.image}
                      name={c.name}
                      slug={c.slug}
                      popularity={c.popularity}
                      description={c.description}
                      createdAt={c.createdAt}
                      onSelect={handleSelect}
                      item={item}
                      games={games}
                    />
                  ))}
            </tbody>
          </table>
        </section>
        <div className="w-full flex justify-end gap-x-2">
          {selectedStatus.length >= 1 && (
            <DeleteStatus selectedStatus={selectedStatus} setSelectedStatus={isSelectedStatus} item={item} />
          )}
          {selectedStatus.length <= 1 && (
            <EditStatus
              selectedStatus={selectedStatus}
              item={item}
              subject={games}
            />
          )}
          <AddStatus pathname={lastSection} item={item} isSelectedStatus={isSelectedStatus} />
        </div>
      </>
    </>
  );
};

export default AllGames;
