"use client";

import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/connexion",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.DEV_API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            const { message } = await res.json();
            console.log(message);
          }
            const { userWithoutPassword: { _id: id, username, email, roles, slug, avatar}} = await res.json();
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
};
