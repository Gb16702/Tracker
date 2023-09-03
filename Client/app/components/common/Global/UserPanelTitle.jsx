"use client";

import GetProfilePathname from "./GetProfilePathname";

const UserPanelTitle = ({ links }) => {
  const Pathname = GetProfilePathname();

  const normalize = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  let title;
  links.some((link) => {
    if (normalize(link.name) === Pathname) {
      return (title = link.name);
    }
  });

  return title;
};

export default UserPanelTitle;
