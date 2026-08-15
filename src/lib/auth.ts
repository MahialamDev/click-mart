import { cookies } from "next/headers";
import {
  verifyAccessToken,
  verifyRefreshToken,
} from "./jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // Access token আছে
  if (accessToken) {
    const decoded = verifyAccessToken(accessToken);

    if (decoded) {
      return decoded;
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

  return decodedRefresh;
}

  

