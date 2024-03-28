import { Request, Response, NextFunction } from "express";
import errorWrapper from "./errorWrapper";
import CustomError from "../services/CustomError";
import { getToken, verifyToken } from "../services/token";

const authChecker = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    if (!token) {
      throw new CustomError("Unauthorized", 401);
    }
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  }
);

export default authChecker;
