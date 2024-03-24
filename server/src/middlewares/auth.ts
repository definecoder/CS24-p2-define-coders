import { Request, Response, NextFunction } from "express";
import errorWrapper from "./errorWrapper";
import CustomError from "../services/CustomError";
import { verifyToken } from "../services/Token";

const authChecker = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new CustomError("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new CustomError("Unauthorized", 401);
    }

    // console.log(token);

    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  }
);

export default authChecker;
