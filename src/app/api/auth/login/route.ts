import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

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
      });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return Response.json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const sendUser = {
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
    };

    //generate access token
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: 'user'
    })

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: 'user'
    })

    return Response.json({
      success: true,
      data: sendUser,
    });
  } catch (err) {
    console.log(err);
  }
}
