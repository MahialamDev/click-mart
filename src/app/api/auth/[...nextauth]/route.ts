import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks:{ 
    async signIn({ user }) { 
       if (!user.email) {
        return false;
      }

       // 1. Check user in DB
      let dbUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      // 2. Create if user doesn't exist
      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            name: user.name || "Google User",
            email: user.email,
            password: user.password || "",
            imageUrl: user.image || null,
          },
        });
      }

       // 3. Generate YOUR JWT
      await generateAccessToken({
        userId: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
      });

      await generateRefreshToken({
        userId: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
      });

      return true;



    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
