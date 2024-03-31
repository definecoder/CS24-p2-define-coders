import jwt, { Secret } from "jsonwebtoken";
import { Request } from "express";
import CustomError from "./CustomError";

const tokenBlacklist: Set<string> = new Set();

const getToken = (req: Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
};

const generateToken = (info: any, expiry: string | number | undefined) => {
  const secret: Secret | undefined = process.env.JWT_SECRET;
  if (!secret) {
    throw new CustomError("JWT secret is undefined.", 500);
  }
  return jwt.sign(info, secret, { expiresIn: expiry });
};

const verifyToken = (token: string) => {
  const secret: Secret | undefined = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is undefined.");
  }
  if (tokenBlacklist.has(token)) {
    throw new CustomError("User is logged out!", 401);
  }

  return jwt.verify(token, secret);
};

const invalidateToken = (token: string) => {
  tokenBlacklist.add(token);
  return;
};

export { generateToken, verifyToken, getToken, invalidateToken };
