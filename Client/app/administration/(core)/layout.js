import Sidebar from "../../components/common/Global/Admin/Sidebar";
import "../../globals.css";
import Header from "../../components/common/Global/Admin/Header";
import Pathname from "../../components/common/Global/Admin/Pathname";
import { decodeSession } from "../../../lib/decodeSession";

export const metadata = {
  title: "Administration du site",
  description: "Administration du site",
  ogTitle: "Administration du site",
  ogDescription: "Administration du site",
};

export default async function AdminCoreLayout({ children, searchParams }) {
  const response = await fetch(`${process.env.DEV_API_URL}/admin/allUsers`, {
    cache: "no-store",
  });

  const session = await decodeSession()

  const { users } = await response.json();

  return (
    <>
      <div className="relative h-[100vh] overflow-hidden">
        <Header session={session} users={users} />
        <main className="flex flex-row w-full h-full">
          <Sidebar />
          <section className="w-full h-full bg-zinc-950/[.95] border-t border-zinc-800 px-[40px]">
            <Pathname />
            {children}
          </section>
        </main>
      </div>
    </>
  );
}
