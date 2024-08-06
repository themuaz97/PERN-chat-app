import token, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      }
    }
  }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokens = req.cookies.token;
    
    if (!tokens) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const decoded = token.verify(tokens, process.env.JWT_SECRET!) as DecodedToken;

    if(!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, username: true, fullName: true, profilePic: true } });

    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();

  } catch (error:any) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ error: "Internal server error" });   
  }
}

export default protectRoute