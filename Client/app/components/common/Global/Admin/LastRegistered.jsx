"use client";

import Image from "next/image";
import { timeSince } from "../../../../../lib/timeSince";
import Link from "next/link";

const LastRegistered = ({ users, head }) => {
  return (
    <section className="w-full rounded-md bg-adminBgAlt overflow-hidden">
      <table className="w-full h-full text-sm text-left">
        <thead className="text-xs uppercase bg-zinc-800">
          <tr className="text-zinc-100">
            {head.map((item, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 font-medium tracking-wider"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-adminBgAlt text-zinc-100">
          {users.map((user, index) => (
            <tr key={index} className="align-top border-t border-zinc-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                <div className="flex items-center justify-start gap-x-5">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={`Image de profil de ${user.username}`}
                      className="rounded-full object-cover w-[36px] h-[36px]"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <div className="w-[36px] h-[36px] rounded-full bg-zinc-800"></div>
                  )}
                  <div className="flex flex-col">
                    <h3>{user.username}</h3>
                    <h4 className="text-zinc-400 text-[12px]">
                      {user.roles.name}
                    </h4>
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {timeSince(new Date(user.createdAt))}
              </td>
              <td className="px-6 py-4">
                <Link
                  href={`${process.env.NEXT_PUBLIC_URL}/administration/utilisateurs/${user.slug}`}
                  className="text-vprimary hover:underline"
                >
                  Voir le profil
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default LastRegistered;
