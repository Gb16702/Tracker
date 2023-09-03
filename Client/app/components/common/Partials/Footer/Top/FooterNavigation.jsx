import Link from "next/link";

const FooterNavigation = () => {
  return (
    <nav className="h-[55%] w-full flex justify-between items-center">
      <Link className="text-white" href="/">
        Accueil
      </Link>
      <Link className="text-white" href="/contact">
        Contact
      </Link>
      <Link className="text-white" href="/connexion">
        Connexion
      </Link>
      <Link className="text-white" href="/inscription">
        Inscription
      </Link>
    </nav>
  );
};

export default FooterNavigation;
