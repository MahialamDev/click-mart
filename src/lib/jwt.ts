import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
type JwtPayload = {
  userId: string;
  email: string;
  role: string;
};

// generate access token and store cookies
export const generateAccessToken = async (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });

  // store cookies
  const cookieStore = await cookies();
  cookieStore.set(
    "accessToken", //token name
    token, //token


    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 15,
      path: "/",
    },
  );

  return token;
};

// generate refresh token and store cookies
export const generateRefreshToken = async (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });

  const cookieStore = await cookies();
  cookieStore.set(
    "refreshToken", //token name
    token, //token

    //options
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    },
  );

  return token;
};


export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
  } catch {
    return null
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
  } catch {
   return null
  }
};
