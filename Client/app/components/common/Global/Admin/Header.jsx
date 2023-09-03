import { decodeSession } from "../../../../../lib/decodeSession";
import SelfHandler from "./SelfHandler";
import GlobalSearchBar from "../GlobalSearchbar";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Header = async ({ users }) => {
  const session = await decodeSession();

  return (
    <header className="h-[90px] bg-adminBgAlt w-full flex px-[25px] items-center justify-between">
      <div
        className={`capitalize whitespace-nowrap font-semibold tracking-wide text-[20px] text-zinc-100 ${orbitron.className}`}
      >
        tracker.
      </div>
      <GlobalSearchBar users={users} />
      <div className="flex flex-row items-center justify-end gap-x-4 ">
        <div className="w-12 h-12 flex items-center justify-center">
          <SelfHandler session={session} />
        </div>
      </div>
    </header>
  );
};

export default Header;
