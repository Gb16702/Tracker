import "../globals.css";
import Header from "../components/common/Partials/Header/Header";
import Nav from "../components/common/Partials/Header/Navigation/Nav";

export const metadata = {
  title: "Tracker - Authentification",
  description: "Pages d'authentification de Tracker",
  ogTitle: "Tracker - Authentification",
  ogDescription: "Pages d'authentification de Tracker",
};

export default function AuthLayout({ children }) {
  return (
    <>
      <Header>
        <Nav />
      </Header>
      {children}
    </>
  );
}
