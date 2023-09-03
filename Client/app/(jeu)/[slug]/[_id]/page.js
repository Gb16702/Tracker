import TrackerActionButton from "../../../components/common/Global/TrackerActionButton";
import { Ramabhadra } from "next/font/google";
import Image from "next/image";

const ramabhadra = Ramabhadra({
  weight: "400",
  subsets: ["latin"],
});

const page = async (req) => {
  const { slug, _id } = req.params;
  const response = await fetch(
    `${process.env.DEV_API_URL}/jeu/${slug}/joueur/${_id}`,
    { cache: "no-store" }
  );

  const { player, similarPlayers, banner } = await response.json();

  return (
    <div className="pb-3 bg-[#0F141A] min-h-screen">
      <div
        className="h-[280px] bg-[#0F141A] flex items-end max-sm:h-[210px]"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-[30px] w-full flex justify-center items-center">
          <div className="w-[1300px] ">
            <div className="flex flex-row gap-x-3 items-center relative top-3">
              <div className="bg-[#0F1923] p-2 rounded-full border-[#1b2733] border-t-2">
                <Image
                  src={player.avatar}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
              <h4 className="text-white font-medium text-xl relative bottom-4">
                {player.username}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0F1923] border-y border-[#1b2733] h-[80px] max-sm:h-[50px] w-full"></div>
      <div className="w-full flex justify-center ">
        <div className="w-[1300px] max-xl:w-full">
          <div className="flex items-center justify-between gap-x-3 w-full max-md:flex-col">
            <div className="bg-[#0F1923] mt-3 h-[140px] w-[650px] max-md:w-[95%] rounded-md border border-[#1b2733] overflow-hidden">
              <div className="w-full bg-[#1b2733] py-1 px-2 font-medium text-white">
                Division
              </div>
              <div className="flex flex-row items-center h-[100px] gap-x-3 px-2">
                <div className="flex items-center justify-center">
                  <Image
                    src={player.division.image}
                    width={120}
                    height={120}
                    className="rounded-md object-cover w-[60px] h-[60px]"
                  />
                </div>
                <div className="flex flex-col justify-center h-full relative">
                  <h4 className="text-white font-semibold text-xl uppercase">
                    {player.division.name}
                  </h4>
                  <h4
                    className={`text-[#94A5B9] font-medium ${ramabhadra.className}`}
                  >
                    {player.division.elo} ELO
                  </h4>
                </div>
              </div>
            </div>
            <div className="bg-[#0F1923] mt-3 h-[140px] w-[650px] max-md:w-[95%] rounded-md border border-[#1b2733] overflow-hidden">
              <div className="w-full bg-[#1b2733] py-1 px-2 font-medium text-white">
                Win Rate
              </div>
              <div className="flex flex-row items-center h-[100px] gap-x-3 px-2">
                <h4 className={`text-white text-3xl ${ramabhadra.className}`}>
                  {player.winRate} %
                </h4>
              </div>
            </div>
          </div>
          <div className="w-full max-md:flex max-md:justify-center">
            <div className="w-full max-md:w-[95%] bg-[#0F1923] border border-[#1b2733] mt-3 rounded-md  ">
              <div className="w-full h-full">
                <div className="w-full bg-[#1b2733] py-1 px-2 font-medium text-white flex flex-row gap-x-[6px] items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 21.977 32"
                    className="w-8 h-8 fill-zinc-200"
                  >
                    <path d="m19.877 19.593 1.975-.311a11.017 11.017 0 0 0-.557-2.126l-1.874.7a8.986 8.986 0 0 1 .456 1.737ZM19.978 21.389a9.068 9.068 0 0 1-.254 1.778l1.941.479a11.081 11.081 0 0 0 .311-2.173Z"></path>
                    <path d="M10.987 30a9 9 0 1 1 7.639-13.757l1.7-1.058a11.167 11.167 0 0 0-1.339-1.709V0h-16v13.474a10.993 10.993 0 1 0 17.942 12.24l-1.806-.858A9.049 9.049 0 0 1 10.987 30Zm4-28h2v9.8a10.869 10.869 0 0 0-2-1.044Zm-6 0h4v8.2a10.328 10.328 0 0 0-4-.009Zm-4 0h2v8.764a10.975 10.975 0 0 0-2 1.028Z"></path>
                    <path d="m13.195 18.461-2.209-4.475-2.209 4.475-4.94.718 3.574 3.484-.843 4.92 4.418-2.322 4.418 2.322-.843-4.92 3.574-3.484Zm-.447 5.466L10.986 23l-1.762.926.337-1.961-1.426-1.391 1.97-.286.881-1.783.881 1.784 1.97.286-1.426 1.391Z"></path>
                  </svg>
                  <div>
                    <h3>Joueurs similaires</h3>
                    <small className="text-[#94A5B9] relative bottom-1">
                      Trouve des joueurs similaires basé sur l'ELO
                    </small>
                  </div>
                </div>
                {similarPlayers.map((p_, index) => (
                  <div
                    key={index}
                    className={`h-[70px] max-sm:h-[100px] w-full px-3 flex items-center  ${
                      index % 2 !== 0 && "bg-[#1b2733]"
                    }`}
                  >
                    <div className="w-full flex flex-row">
                      <div className="flex items-center flex-row gap-x-2 w-[25%]">
                        <div className="overflow-hidden rounded-full max-sm:hidden">
                          <Image
                            src={p_.avatar}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-white font-medium">
                            {p_.username}
                          </h3>
                          <h4
                            className={`text-[#94A5B9] text-xs ${ramabhadra.className}`}
                          >
                            {p_.matches} matchs
                          </h4>
                        </div>
                      </div>
                      <div className="font-medium text-white w-[25%] flex flex-col max-sm:items-center">
                        {p_.division.name}
                        <h4
                          className={`text-[#94A5B9] text-xs ${ramabhadra.className}`}
                        >
                          {p_.division.elo} ELO
                        </h4>
                      </div>
                      <div className="font-medium text-white w-[25%] flex items-center max-sm:justify-center">
                        {p_.winRate} %
                      </div>
                      <div className="font-medium text-white w-[25%] flex max-sm:justify-center">
                        <TrackerActionButton url={slug + "/" + p_._id} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
