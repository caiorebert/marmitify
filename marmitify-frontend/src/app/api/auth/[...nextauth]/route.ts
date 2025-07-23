import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { buscaUser, userIsChef } from "../../user";
import { obterChefPorIdUser } from "../../chef";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials!.email,
              password: credentials!.password,
            }
          );

          const { access_token, user, chef } = res.data;
          if (access_token && user) {
            return {
              access_token,
              ...user,
              ...chef,
            };
          }
          return null;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // @ts-ignore
      if (user?.access_token) {
        // @ts-ignore
        token.accessToken = user.access_token;
        // @ts-ignore
        token.id = user.id;
        // @ts-ignore
        token.name = user.name;
        // @ts-ignore
        token.email = user.email;
        // @ts-ignore
        token.endereco = user.endereco || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id != undefined) {
        // @ts-ignore
        const user = await buscaUser(token.id, token.accessToken);
        session.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          endereco: user.endereco || "",
          // outros campos necessários
        };

        // @ts-ignore
        if (await userIsChef(token.id, token.accessToken)) {
          // @ts-ignore
          session.user.isChef = true;
          // @ts-ignore
          session.user.chef = (await obterChefPorIdUser(token.id))[0];
        }

      } else {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.name = token.name;
        // @ts-ignore
        session.user.email = token.email;
        // @ts-ignore
        session.user.endereco = token.endereco || "";
      }
      
      // @ts-ignore
      session.accessToken = token.accessToken;
      
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
});

export { handler as GET, handler as POST };
