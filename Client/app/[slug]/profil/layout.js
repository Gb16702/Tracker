import Header from "../../components/common/Partials/Header/Header";
import Nav from "../../components/common/Partials/Header/Navigation/Nav";
import { decodeSession } from "../../../lib/decodeSession";
import ProfileMenu from "../../components/common/Global/ProfileMenu";
import UserPanelTitle from "@/app/components/common/Global/UserPanelTitle";

export const metadata = {
  title: "Tracker - Profil",
  description: "Profil",
  ogTitle: "Tracker - Profil",
  ogDescription: "Profil",
};

export default async function ProfileLayout({ children }) {
  const session = await decodeSession();

  let array = [];

  if (session?.roles?.grade === 1) {
    array.push(
      {
        path: "/profil/dashboard",
        name: "Dashboard",
      },
      {
        path: "/profil/parametres",
        name: "Paramètres",
      },
      {
        path: "/profil/administration",
        name: "Administration",
      }
    );
  } else {
    array.push(
      {
        path: "/profil/dashboard",
        name: "Dashboard",
      },
      {
        path: "/profil/parametres",
        name: "Paramètres",
      }
    );
  }

  return (
    <>
      <Header>
        <Nav session={session} />
      </Header>
      <main className="w-[100%] min-h-[100vh] h-[100%] bg-[#0F141A]">
        <ProfileMenu links={array} session={session} />
        <section className="flex justify-center">
          <div className="h-[80vh] bg-[#0F1923] w-[1500px] mt-10 border border-[#303742] overflow-hidden rounded-md max-sm:rounded-none max-sm:border-none max-sm:mt-7">
            <div className="h-[50px] flex items-center justify-center w-full bg-[#1B2733] border border-[#303742] px-10 max-sm:border-none">
              <h1 className="text-white text-xl uppercase tracking-tight font-medium">
                <UserPanelTitle links={array} />
              </h1>
            </div>
            {children}
          </div>
        </section>
      </main>
    </>
  );
}
