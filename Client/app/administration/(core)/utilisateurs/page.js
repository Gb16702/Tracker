import AllUsers from "../../../components/common/Global/Admin/AllUsers";
import DashboardCards from "../../../components/common/Global/Admin/DashboardCards";
import writeHead from "../../../../lib/writeHead";
import { decodeSession } from "@/lib/decodeSession";

const page = async ({ searchParams }) => {

  const session = await decodeSession();

  const urls = [
    `${process.env.DEV_API_URL}/admin/users`,
    `${process.env.DEV_API_URL}/games`,
    `${process.env.DEV_API_URL}/roles?grade=${session?.roles?.grade}`,
    `${process.env.DEV_API_URL}/testimonials`,
    `${process.env.DEV_API_URL}/admin/users?page=${searchParams.page}`
  ];

  const [usersResponse, gamesResponse, rolesResponse, testimonialsResponse, searchResponse] =
    await Promise.all(
      urls.map((url) =>
        fetch(url, {
          cache: "no-store",
        }).then((response) => response.json())
      )
    );

  const head = writeHead("utilisateurs");

  return (
    <>
      <div className="flex flex-row gap-x-2 w-full justify-between">
      <DashboardCards
          title="Utilisateurs"
          body={`${
            usersResponse.users.length <= 1
              ? usersResponse.users.length + " Utilisateur inscrit"
              : usersResponse.users.length + " Utilisateurs inscrits"
          }`}
        />
        <DashboardCards
          title="Jeux"
          body={`${
            gamesResponse.games.length <= 1
              ? gamesResponse.games.length + " Jeu disponible"
              : gamesResponse.games.length + " Jeux disponibles"
          }`}
        />
        <DashboardCards
          title="Rôles"
          body={`${
            rolesResponse.roles.length <= 1
              ? rolesResponse.roles.length + " Rôle"
              : rolesResponse.roles.length + " Rôles"
          }`}
        />
        <DashboardCards
          title="Retours"
          body={`${
            testimonialsResponse.length <= 1
              ? testimonialsResponse.length + " Retour utilisateur"
              : testimonialsResponse.length + " Retours utilisateurs"
          }`}
        />
      </div>
      <div className="flex gap-y-4 flex-col">
        <AllUsers
          users={searchResponse.paginatedUsers}
          head={head}
          totalPage={searchResponse.totalPages}
          initialPage={searchParams}
        />
      </div>
    </>
  );
};

export default page;
