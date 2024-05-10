// get all admin logs

import { PrismaClient } from "@prisma/client";
import errorWrapper from "../middlewares/errorWrapper";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getAdminLogs = errorWrapper(
  async (req: Request, res: Response) => {
    const logs = await prisma.adminLogs.findMany();
    res.status(200).json(logs);
  },
  { statusCode: 500, message: "Couldn't get admin logs" }
);

// get all sts manager logs
// get all contractor manager logs

export { getAdminLogs };
