import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    let userId: string;

    // ==========================================
    // 1. Access Token Check
    // ==========================================

    if (accessToken) {
      const decoded = verifyAccessToken(accessToken);

      if (decoded) {
        userId = decoded.userId;
      } else {
        // Access token expired/invalid
        userId = "";
      }
    } else {
      userId = "";
    }

    // ==========================================
    // 2. Access Token invalid/expired
    //    → Refresh Token Check
    // ==========================================

    if (!userId) {
      if (!refreshToken) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 401 },
        );
      }

      const decodedRefresh = verifyRefreshToken(refreshToken);

      if (!decodedRefresh) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid or expired refresh token",
          },
          { status: 401 },
        );
      }

      // নতুন access token
      await generateAccessToken({
        userId: decodedRefresh.userId,
        email: decodedRefresh.email,
        role: decodedRefresh.role,
      });

      

      userId = decodedRefresh.userId;
    }

    // ==========================================
    // 3. Database থেকে User
    // ==========================================

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    // ==========================================
    // 4. Return User
    // ==========================================

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("ME API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

// ok