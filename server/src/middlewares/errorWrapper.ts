import { ErrorInfo } from "./../types/ErrorInfo";
import { NextFunction, Request, Response } from "express";
import CustomError from "../services/CustomError";

const errorWrapper = (fn: Function, errorInfo?: ErrorInfo) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      // Add type annotation here

      console.log(error);

      if (error instanceof CustomError) {
        const statusCode: number = error?.statusCode || 500;
        const message: string = error?.message || "Something went wrong";

        res.status(statusCode).json({ message });
      } else if (errorInfo) {
        const statusCode: number = errorInfo.statusCode;
        const message: string = errorInfo.message;
        res.status(statusCode).json({ message, details: error.message });
      } else res.status(500).json({ message: "Something went wrong" });
    }
  };
};

export default errorWrapper;
