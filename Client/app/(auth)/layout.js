import "../globals.css";
import Header from "../components/common/Partials/Header/Header";
import Nav from "../components/common/Partials/Header/Navigation/Nav";

export const metadata = {
  title: "Dice - Authentification",
  description: "Pages d'authentification de Dice",
  ogTitle: "Dice - Authentification",
  ogDescription: "Pages d'authentification de Dice",
  // ogImage: '/images/og-image.jpg',
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
