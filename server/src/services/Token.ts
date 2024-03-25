import jwt, { Secret } from "jsonwebtoken";
import { Request } from "express";

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
    throw new Error("JWT secret is undefined.");
  }
  return jwt.sign(info, secret, { expiresIn: expiry });
};

const verifyToken = (token: string) => {
  const secret: Secret | undefined = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is undefined.");
  }
  return jwt.verify(token, secret);
};

const invalidateToken = (token: string) => {
  // This is a dummy function that does nothing.
  // In a real-world application, you would probably want to blacklist the token.
  return;
};

export { generateToken, verifyToken, getToken, invalidateToken };
