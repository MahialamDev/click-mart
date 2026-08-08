import jwt from "jsonwebtoken";
type JwtPayload = {
  userId: string;
  email: string;
  role: string;
};

export const generateAccessToken = (payload: JwtPayload) => { 
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: "15m"
        }
    )
}


export const generateRefreshToken = (payload: JwtPayload) => { 
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: "7d"
        }
    )
}