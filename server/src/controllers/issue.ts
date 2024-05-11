import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import { adminLog } from "../services/logdata";

const prisma = new PrismaClient();

const addIssue = errorWrapper(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const newIssue = await prisma.issue.create({
      data: payload,
    });

    await adminLog("Issue Entry", `Issue ${newIssue.issueType} created`);

    res.status(201).json(newIssue);
  },
  { statusCode: 400, message: "Issue not created" }
);

const getAllIssues = errorWrapper(
  async (req: Request, res: Response) => {
    const issues = await prisma.issue.findMany();
    res.status(200).json(issues);
  },
  { statusCode: 404, message: "Issues not found" }
);

export { addIssue, getAllIssues };
