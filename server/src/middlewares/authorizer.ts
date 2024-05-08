import { Request, Response, NextFunction } from "express";
import errorWrapper from "./errorWrapper";
import CustomError from "../services/CustomError";
import { getPermittedRoleNames } from "../permissions/permissions";

const authRole = (roles: string[]) => {
  return errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const userRole = req.user?.role;
      if (!userRole) throw new CustomError("Unauthorized", 401);
      if (!roles.includes(userRole)) {
        throw new CustomError("Unauthorized", 401);
      }
      next();
    }
  );
};

const authorizer = (permission: string) => {
  return errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const userRole = req.user?.role;

      const permittedRoles = await getPermittedRoleNames(permission);

      if (userRole && permittedRoles.includes(userRole)) {
        next();
      } else throw new CustomError("Unauthorized", 401);
    }
  );
};
export { authRole, authorizer };
