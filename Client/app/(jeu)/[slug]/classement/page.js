import Image from "next/image";
import { Ramabhadra } from "next/font/google";
import ClientPagination from "../../../components/common/Global/ClientPagination";
import Link from "next/link";

const ramabhadra = Ramabhadra({
  weight: "400",
  subsets: ["latin"],
});

const Page = async ({ params, searchParams }) => {
  const { slug } = params;

  let fetchUrl = !searchParams.records
    ? `${process.env.DEV_API_URL}/jeu/${slug}?page=${searchParams.page}`
    : `${process.env.DEV_API_URL}/jeu/${slug}?page=${searchParams.page}&records=${searchParams.records}`;

  const response = await fetch(fetchUrl, {
    cache: "no-store",
  });

  const { game, totalPages, paginatedPlayers } = await response.json();

  return (
    <div className="w-full min-h-screen bg-[#0F141A] flex justify-center py-20">
      <div className="w-[90%] max-sm:w-full flex items-center flex-col gap-y-4">
        <div className="flex flex-row justify-start w-full text-white text-[24px] font-medium">
          <h2 className={`${ramabhadra.className}`}>
            Classements de {game.name}
          </h2>
        </div>
        <div className="w-full  border border-[#1B2733] rounded-md overflow-hidden max-sm:rounded-none">
          <div className="relative h-full overflow-x-auto shadow-md ">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs text-white bg-[#1B2733]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Rang
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Utilisateur
                  </th>
                  <th scope="col" className="px-6 py-3 bg-white/[.04]">
                    Division
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Elo
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedPlayers.players.map((p_, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-[#0F1923]" : "bg-[#1B2733] "
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium whitespace-nowrap text-white"
                    >
                      {`${p_.rank ?? index + 1}`}
                    </th>
                    <td className="px-6 py-2">
                      <Link
                        href={`${slug}/${p_._id}`}
                        className="flex flex-row gap-x-3 items-center"
                      >
                        <Image
                          src={p_.avatar}
                          width={35}
                          height={35}
                          className="rounded-full object-cover outline outline-white outline-2"
                        />
                        <div className="flex-col">
                          <h3 className="text-left  text-white">
                            {p_.username}
                          </h3>
                          <h4>{p_.matches} matchs</h4>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-4 bg-white/[.04]">
                      <div className="flex flex-row gap-x-2 items-center">
                        <Image
                          src={p_.division.image}
                          width={30}
                          height={30}
                          className="rounded-full object-cover"
                        />
                        <h3 className="text-left  text-white">
                          {p_.division.name}
                        </h3>
                      </div>
                    </td>
                    <td className="px-6 py-2 font-medium whitespace-nowrap text-white">
                      {p_.division.elo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <ClientPagination
            totalPages={totalPages}
            initialPage={searchParams.page}
            slug={slug}
            records={searchParams.records}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
