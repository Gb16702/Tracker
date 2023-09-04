import Sidebar from "../../components/common/Global/Admin/Sidebar";
import "../../globals.css";

export const metadata = {
  title: "Administration - Dashboard",
  description: "Dashboard du site",
  ogTitle: "Administration - Dashboard",
  ogDescription: "Dashboard du site",
};

export default function RootLayout({ children }) {
  return (
    <>
      <main className="w-[100%] h-[100%]">
        <Sidebar />
        {children}
      </main>
    </>
  );
}
