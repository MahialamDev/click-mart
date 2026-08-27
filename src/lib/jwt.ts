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
  return token;
};

// generate refresh token and store cookies
export const generateRefreshToken = async (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });

  return token;
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
};
