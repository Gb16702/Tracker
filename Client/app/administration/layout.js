import "../globals.css";

export const metadata = {
  title: "Administration",
  description: "Administration du site",
  ogTitle: "Administration",
  ogDescription: "Administration du site",
};

export default function RootLayout({ children }) {
  return (
    <>
      <main className="w-[100] h-[100vh] bg-white">{children}</main>
    </>
  );
}
