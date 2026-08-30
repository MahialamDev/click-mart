import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    console.log(email, password);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // if not found users
    if (!user) {
      return Response.json({
        success: false,
        message: "Invalid Email or Password",
      }),
      { status: 401 }
    }

    if (!user.password) {
  return Response.json(
    {
      success: false,
      message: "This account does not have a password login.",
    },
    { status: 401 }
  );
}


    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return Response.json({
        success: false,
        message: "Invalid Email or Password",
      }),
      { status: 401 }
    }

    //generate access token
    const accessToken = await generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const userInfo = {
      email: user.email,
      name: user.name,
      role: user.role,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
    };

    const response = NextResponse.json({
      success: true,
      data: userInfo,
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}
