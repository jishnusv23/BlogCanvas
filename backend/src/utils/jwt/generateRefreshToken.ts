import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateRefreshToken = (payload: {
  _id: string;
  email: string;
}) => {
  return jwt.sign(payload, String(process.env.REFRESH_TOKEN_SECRET));
};
