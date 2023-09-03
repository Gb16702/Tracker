import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { FormEnglober } from "../../../components/common/Global/FormEnglober";
import ResetPasswordForm from "../../../components/common/Global/Forms/ResetPasswordForm";
import { decodeSession } from "../../../../lib/decodeSession";
import { Ramabhadra } from "next/font/google";

const decodeToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    return decodedToken;
  } catch (e) {
    return null;
  }
};

const ramabhadra = Ramabhadra({
  weight: "400",
  subsets: ["latin"],
});

const page = async (req, res) => {
  const { slug, token } = req.params;

  const verifyToken = await decodeToken(token);
  const session = await decodeSession();

  if (!session) {
    return redirect("/");
  }

  if (!verifyToken || !session) {
    return redirect("/");
  }

  const expiration = new Date(verifyToken.exp * 1000).toLocaleDateString(
    "fr-FR",
    { hour: "2-digit", minute: "2-digit" }
  );
  const now = new Date().toLocaleDateString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (expiration < now) {
    await fetch(`/api/users/${session?.id}/token`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: session?.user?.passwordToken }),
    });

    return redirect("/");
  }

  if (verifyToken.id !== session.id) {
    return redirect("/");
  }

  return (
    <section className="h-[100vh] flex items-center justify-center bg-[#0F141A] relative">
      <div className="flex items-center justify-center flex-col w-[1000px]">
        <div className="w-[330px] max-sm:w-full flex items-center flex-col">
          <FormEnglober>
            <h1
              className={`text-[24px] py-[5px] text-center text-white pb-[45px] ${ramabhadra.className}`}
            >
              Modifie ton mot de passe
            </h1>
            <ResetPasswordForm />
          </FormEnglober>
        </div>
      </div>
    </section>
  );
};
export default page;
