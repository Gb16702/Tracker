import GameSectionHeader from "../components/common/Partials/Header/GameSectionHeader";
import "../globals.css";

export const metadata = {
  title: "Tracker - Jeux",
  description: "Jeux",
  ogTitle: "Tracker - Jeux",
  ogDescription: "Jeux",
};

export default async function GameLayout({ children }) {
  const response = await fetch(`${process.env.DEV_API_URL}/games`, {
    cache: "no-store",
  });

  const { games } = await response.json();

  const headerObject = games.map((g_) => ({
    name: g_.name,
    slug: g_.slug,
  }));

  return (
    <>
      <GameSectionHeader obj={headerObject} />
      {children}
    </>
  );
}
