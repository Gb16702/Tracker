import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "../components/common/Global/LogoutButton";

const error = () => {
  const message =
    cookies().get("errorMessage").value || "Quelque chose s'est mal passé";

  let errorCode = null;

  const errorVariants = {
    401: {
      buttonLink: "/connexion",
      buttonText: "Se connecter",
    },
    403: {
      buttonLink: "/",
      buttonText: "Aller à l'accueil",
    },
    404: 403,
  };

  switch (message) {
    case "Tu dois être connecté pour accéder à cette page":
      errorCode = 401;
      break;
    case "Tu n'es pas autorisé à accéder à cette page":
      errorCode = 403;
      break;
    case "Cette page n'existe pas":
      errorCode = 404;
      break;
    case "Tu es déjà connecté":
      errorCode = 409;
      break;
  }

  return (
    <main className="h-[100vh] bg-white">
      <div className="h-[68vh] bg-zinc-900 w-full top-0">
        <div className="flex items-center justify-center flex-col h-full max-sm:px-2">
          <p className="text-[28px] font-semibold text-red-400">{errorCode}</p>
          <h1 className="mt-4 text-[40px] font-bold tracking-tight text-zinc-100 max-sm:text-center max-sm:text-[30px]">
            {message}
          </h1>
          <p className="mt-4 text-[19px] leading-7 text-zinc-400 max-sm:text-center max-sm:text-base max-sm:mt-7">
            Réessaye plus tard ou contacte le support si le problème persiste
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 flex-row max-sm:mt-14">
            {errorCode !== 409 ? (
              errorCode === 401 ? (
                <>
                  <Link
                    replace
                    href="/connexion"
                    className="text-zinc-900 font-medium  w-[250px] h-11 px-5 rounded-md bg-vprimary flex items-center justify-center"
                  >
                    Se connecter
                  </Link>
                  <Link
                    replace
                    href="/"
                    className="text-zinc-900 font-medium w-[250px] h-11 px-5 rounded-md bg-emerald-300  flex items-center justify-center"
                  >
                    Aller à l'accueil
                  </Link>
                </>
              ) : (
                <>
                  {errorCode === 403 || errorCode === 404 ? (
                    <Link
                      replace
                      href="/"
                      className="text-zinc-900 font-medium  w-[250px] h-11 px-5 rounded-md bg-vprimary flex items-center justify-center"
                    >
                      Aller à l'accueil
                    </Link>
                  ) : null}
                </>
              )
            ) : (
              <>
                <Link
                  replace
                  href="/"
                  className=" text-zinc-900 font-medium w-[250px] h-11 px-5 rounded-md  bg-emerald-300 flex items-center justify-center"
                >
                  Aller à l'accueil
                </Link>
                <div className="w-[250px]">
                  <LogoutButton className=" text-zinc-900 font-medium w-[250px] h-11 px-5 rounded-md bg-vprimary flex items-center justify-center" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default error;
