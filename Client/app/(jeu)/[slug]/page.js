import GameDetailsComponent from "../../components/common/Global/GameDetailsComponent";

const Page = async ({ params }) => {
  const { slug } = params;

  const response = await fetch(`${process.env.DEV_API_URL}/jeu/${slug}`, {
    cache: "no-store",
  });

  const { game } = await response.json();

  return (
      <GameDetailsComponent game={game} />
  );
};

export default Page;
