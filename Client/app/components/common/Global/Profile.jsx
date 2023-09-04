"use client";

import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Menu } from "@headlessui/react";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <span className="flex items-center">
      <Menu as="div">
        <Menu.Button>
          <span>
            <li className="inline text-sm text-[#DFE0D7]">Mon Compte</li>
            <MdKeyboardArrowDown className="text-white inline" />
          </span>
        </Menu.Button>
        <Menu.Items className="fixed translate-y-[10px] w-[155px] bg-[#1E1E20] border border-[#333333] rounded-md px-[5px] py-[7px] z-50">
          <>
            <Menu.Item>
              <div className="flex flex-row gap-x-4 items-center justify-start border-b border-[#333333] py-2">
                <Link
                  href={`/${session?.user?.slug}/profil/dashboard`}
                  className="flex justify-start hover:opacity-70 transition-all duration-300 relative text-sm text-zinc-300"
                >
                  Voir le compte
                </Link>
              </div>
            </Menu.Item>
            {session?.user?.roles.grade <= 2 && (
              <Menu.Item>
                <div className="flex flex-row gap-x-4 items-center justify-start border-b border-[#333333] py-2">
                  <Link
                    href="/administration/dashboard"
                    className="flex justify-start hover:opacity-70 transition-all duration-300 relative text-sm text-zinc-300"
                  >
                    Administration
                  </Link>
                </div>
              </Menu.Item>
            )}
            <Menu.Item>
              <div className="flex flex-row gap-x-4 items-center justify-start py-2">
                <LogoutButton
                  isLogged
                  text="Se déconnecter"
                  className="flex justify-start hover:opacity-70 transition-all duration-300 relative text-sm text-zinc-300"
                />
              </div>
            </Menu.Item>
          </>
        </Menu.Items>
      </Menu>
    </span>
  );
};

export default Profile;
