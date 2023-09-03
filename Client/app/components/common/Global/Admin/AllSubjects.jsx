"use client";

import React, { useState } from "react";
import { timeSince } from "../../../../../lib/timeSince";
import AddStatus from "./AddStatus";
import DeleteStatus from "./DeleteStatus";
import { usePathname } from "next/navigation";
import EditStatus from "./EditStatus";
import { ActionButton } from "./ActionButton";

const SubjectsRow = ({
  category,
  createdAt,
  updatedAt,
  onSelect,
  item,
  subjects,
  selectedStatus,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    onSelect(category, !isSelected);
  };

  return (
    <tr
      className={`align-top border-t border-zinc-800 ${
        isSelected && "bg-zinc-800"
      }`}
    >
      <td className="px-6 py-4">{category}</td>
      <td className="px-6 py-4">{timeSince(new Date(createdAt))}</td>
      <td className="px-6 py-4">
        {createdAt !== updatedAt
          ? `Il y a ${timeSince(new Date(updatedAt))}`
          : "Jamais modifié"}
      </td>
      <td className="px-6 py-4">
        <ActionButton
          select={handleSelect}
          isSelected={isSelected}
          item={item}
          subject={subjects}
          selectedStatus={selectedStatus}
          category={category}
        />
      </td>
    </tr>
  );
};

const AllSubjects = ({ head, subjects }) => {
  const [selectedStatus, isSelectedStatus] = useState([]);

  const pathname = usePathname();
  const lastSection = pathname.split("/administration/")[1];

  const handleSelect = (state, isSelected) => {
    if (isSelected) isSelectedStatus([...selectedStatus, state]);
    else isSelectedStatus(selectedStatus.filter((s) => s !== state));
  };

  const item = "sujet";

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
              {subjects &&
                subjects
                  .sort((a, b) => (a.category > b.category ? 1 : -1))
                  .map((c, index) => (
                    <SubjectsRow
                      key={index}
                      category={c.category}
                      createdAt={c.createdAt}
                      updatedAt={c.updatedAt}
                      onSelect={handleSelect}
                      item={item}
                      subjects={subjects}
                      selectedStatus={selectedStatus}
                    />
                  ))}
            </tbody>
          </table>
        </section>
        <div className="w-full flex justify-end gap-x-2">
          {subjects && (
            <>
              {selectedStatus.length >= 1 && (
                <DeleteStatus selectedStatus={selectedStatus} item={item} />
              )}
              {selectedStatus.length <= 1 && (
                <EditStatus
                  selectedStatus={selectedStatus}
                  item={item}
                  subject={subjects}
                />
              )}
            </>
          )}
          <AddStatus pathname={lastSection} item={item} />
        </div>
      </>
    </>
  );
};

export default AllSubjects;
