import { decodeSession } from "@/lib/decodeSession";
import DeleteAccount from "../../../../components/common/Global/Admin/DeleteAccount";
import Cross from "../../../../components/common/Global/Icons/HeroIcons/admin/Cross";
import Image from "next/image";
import Link from "next/link";
import EditRolesComponent from "@/app/components/common/Global/Admin/EditRolesComponent";

const page = async ({ params }) => {
  const response = await fetch(
    `http://localhost:8000/api/admin/users/${params.slug}`,
    {
      cache: "no-store",
    });

  const rolesResponse = await fetch(
    `${process.env.DEV_API_URL}/roles?grade=1`,{cache: "no-store"}
  );

  const { roles } = await rolesResponse.json();

  const filteredRoles = roles.filter((r_) => r_.grade !== 1);

  const data = await response.json();

  const session = await decodeSession();

  return (
    <div className="w-full h-[220px] bg-[#1D1D20] border border-zinc-800 rounded-md flex flex-col">
      <div className="pt-[20px] px-[12px] flex flex-row flex-grow gap-x-4 relative">
        {data.user.avatar ? (
          <Image
            src={data.user.avatar}
            alt={`Avatar de ${data.user.name}`}
            width={90}
            height={90}
            className="rounded-full w-[80px] h-[80px]"
          />
        ) : (
          <div className="rounded-full min-w-[90px] h-[90px] bg-zinc-800"></div>
        )}
        <div className="flex flex-row relative top-2 w-full">
          <div className="flex flex-col w-full">
            <div className="w-full flex flex-row">
              <h1 className="text-2xl text-zinc-100 tracking-tight font-medium w-full">
                {data.user.username}
              </h1>
              <div className="flex flex-row gap-x-2">
                <EditRolesComponent user={data.user} roles={filteredRoles} />
                {session?.id !== data.user._id && (
                  <div className="p-2 bg-zinc-900 rounded-md cursor-pointer">
                    <DeleteAccount user={data} />
                  </div>
                )}
                <div className="p-2 bg-zinc-900 rounded-md cursor-pointer">
                  <Link href="/administration/utilisateurs">
                    <Cross className=" w-5 h-5 stroke-zinc-200" />
                  </Link>
                </div>
              </div>
            </div>
            <small className="text-zinc-400">{data.user.roles.name}</small>
          </div>
          <div></div>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-grow items-end py-2 px-4 text-zinc-400 text-[12px] gap-x-2">
        <h4>{data.user.email}</h4>
        Inscrit depuis le{" "}
        {new Date(data.user.createdAt).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

export default page;
