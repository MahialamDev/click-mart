import { cookies } from "next/headers";
import { verifyRefreshToken, generateAccessToken } from "@/lib/jwt";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;

    // Refresh token নেই
    if (!refreshToken) {
      return Response.json(
        {
          success: false,
          message: "Refresh token not found",
        },
        { status: 401 }
      );
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Token invalid / expired
    if (!decoded) {
      return Response.json(
        {
          success: false,
          message: "Invalid or expired refresh token",
        },
        { status: 401 }
      );
    }

    // নতুন access token
    await generateAccessToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

    return Response.json({
      success: true,
      message: "Access token refreshed",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}