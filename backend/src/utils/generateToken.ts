import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true, // prevent XSS cors site scripting
    secure: process.env.NODE_ENV === "development", // became https
    sameSite: "strict", // prevent CSRF attack cross-site request forgery(CSRF)
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
  });

  return token
}

export default generateToken