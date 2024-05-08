import { Request, Response, NextFunction } from "express";
import errorWrapper from "./errorWrapper";
import CustomError from "../services/CustomError";
import { getToken, verifyToken } from "../services/Token";
import { JwtPayload } from "jsonwebtoken";

const authChecker = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    if (!token) {
      throw new CustomError("Unauthorized", 401);
    }
    const decoded = verifyToken(token);
    req.user = decoded as JwtPayload;
    console.log(req.user);
    next();
  }
);

export default authChecker;
