import { cookies } from "next/headers";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // কোনো access token নেই
  if (accessToken) {
    // Access token verify
    const decoded = verifyAccessToken(accessToken);

    // Access token valid
    if (decoded) {
      return decoded;
    }
  }

  // Access token expired/invalid
  if (!refreshToken) {
    return null;
  }

  // Refresh token verify
  const decodedRefresh = verifyRefreshToken(refreshToken);

  if (!decodedRefresh) {
    return null;
  }

  // নতুন access token generate
  await generateAccessToken({
    userId: decodedRefresh.userId,
    email: decodedRefresh.email,
    role: decodedRefresh.role,
  });

  return {
    userId: decodedRefresh.userId,
    email: decodedRefresh.email,
    role: decodedRefresh.role,
  };
}
