import { NextFunction, Request, Response } from "express";


const errorWrapper = (fn : Function) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) { // Add type annotation here
            const statusCode: number = error?.statusCode || 500;
            const message: string = error?.message || 'Something went wrong';

            console.log(error);
            res.status(statusCode).json({message});
            
        }
    }
}

export default errorWrapper;