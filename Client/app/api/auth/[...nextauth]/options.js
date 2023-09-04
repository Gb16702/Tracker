import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Votre email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Votre mot de passe",
        },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `https://tracker-beryl-eight.vercel.app/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );

          if (!res.ok) {
            const { message } = await res.json();
            throw new Error(message ?? "Une erreur est survenue");
          }
          const {
            userWithoutPassword: {
              _id: id,
              username,
              email,
              roles,
              slug,
              avatar,
            },
          } = await res.json();
          return { id, username, email, roles, slug, avatar };
        } catch (e) {
          console.log(e);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
    async redirect() {
      return "/";
    },
  },
  pages: {
    signIn: "/connexion",
  },
};
