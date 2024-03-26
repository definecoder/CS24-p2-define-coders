import { Request, Response, NextFunction } from "express";
import errorWrapper from "./errorWrapper";
import CustomError from "../services/CustomError";

const authRole = (roles: string[]) => {
  return errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const userRole = ((req as any).user as any).role;
      if (!roles.includes(userRole)) {
        throw new CustomError("Unauthorized", 401);
      }
      next();
    }
  );
};

export { authRole };
