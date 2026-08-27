import { cookies } from "next/headers";
import { verifyAccessToken, verifyRefreshToken } from "./jwt";
import prisma from "./prisma";
import { User } from "@/redux/features/auth/authSlice";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

   console.log("ACCESS TOKEN:", !!accessToken);
  console.log("REFRESH TOKEN:", !!refreshToken);

  const findUser = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }
   
      const result: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt.toISOString(),
      };

      return result;
  
  };

  // Access token আছে
  if (accessToken) {
    const decoded = verifyAccessToken(accessToken);

    if (decoded) {
      return findUser(decoded.userId);
    }
  }

  // Access token invalid/expired
  // এখন refresh token check
  if (!refreshToken) {
    return null;
  }

  const decodedRefresh = verifyRefreshToken(refreshToken);

  if (!decodedRefresh) {
    return null;
  }

  // এখানে নতুন token generate/set করবে না
  // কারণ এটা Server Component থেকেও call হতে পারে

  return findUser(decodedRefresh.userId);
}
