import "../globals.css";

import Header from "../components/common/Partials/Header/Header";
import Footer from "../components/common/Partials/Footer/Footer";
import { decodeSession } from "../../lib/decodeSession";
import Nav from "../components/common/Partials/Header/Navigation/Nav";

export const metadata = {
  title: "Tracker",
  description: "Le site de tracking de statistiques le plus performant",
  ogTitle: "Tracker",
  ogDescription: "Le site de tracking de statistiques le plus performant",
   ogImage: '/images/og-image.jpg',
};

export default async function ClientLayout({ children }) {
  const session = await decodeSession();

  return (
    <>
      <Header>
        <Nav session={session} />
      </Header>
      <main className="w-[100%] h-[100%]">{children}</main>
      <Footer />
    </>
  );
}
