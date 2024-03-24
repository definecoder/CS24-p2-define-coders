import { Request, Response, NextFunction } from "express";
import errorWrapper from "./errorWrapper";
import CustomError from "../services/CustomError";

const checkSystemAdmin = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    if (role !== "SYSTEM_ADMIN") {
      throw new CustomError(
        "You are not authorized to perform this action",
        403
      );
    }

    next();
  }
);

const checkSTSManager = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    if (role !== "STS_MANAGER") {
      throw new CustomError(
        "You are not authorized to perform this action",
        403
      );
    }

    next();
  }
);

const checkLandfillManager = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    if (role !== "LAND_MANAGER") {
      throw new CustomError(
        "You are not authorized to perform this action",
        403
      );
    }

    next();
  }
);

export { checkSystemAdmin, checkSTSManager, checkLandfillManager };
