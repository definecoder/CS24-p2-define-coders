import jwt, { Secret } from "jsonwebtoken";

const generateToken = (info: any) => {
  const secret: Secret | undefined = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is undefined.");
  }
  return jwt.sign(info, secret, { expiresIn: "1h" });
};

const verifyToken = (token: string) => {
  const secret: Secret | undefined = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is undefined.");
  }
  return jwt.verify(token, secret);
};

export { generateToken, verifyToken };
