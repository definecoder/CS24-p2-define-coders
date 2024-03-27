import { PrismaClient, STS, Vehicle } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";

const prisma = new PrismaClient();

const addSTS = errorWrapper(
  async (req: Request, res: Response) => {
    const stsInfo: STS = req.body;

    const sts = await prisma.sTS.create({
      data: stsInfo,
    });

    res.status(201).json(sts);
  },
  { statusCode: 400, message: "Couldn't add sts" }
);

const getAllSTS = errorWrapper(
  async (req: Request, res: Response) => {
    const stss = await prisma.sTS.findMany({});
    res.json(stss);
  },
  { statusCode: 500, message: "Couldn't fetch stss" }
);

const getSTSById = errorWrapper(
  async (req: Request, res: Response) => {
    const { stsId } = req.params;
    const sts = await prisma.sTS.findUnique({
      where: {
        id: stsId,
      },
      include: {
        manager: true,
      },
    });

    res.json(sts);
  },
  { statusCode: 404, message: "STS not found" }
);

const updateSTS = errorWrapper(
  async (req: Request, res: Response) => {
    const { stsId } = req.params;
    const stsInfo: STS = req.body;

    const stsExists = await prisma.sTS.findUnique({
      where: {
        id: stsId,
      },
    });

    if (!stsExists) {
      throw new CustomError("STS not found", 404);
    }

    const sts = await prisma.sTS.update({
      where: {
        id: stsId,
      },
      data: stsInfo,
    });

    res.json(sts);
  },
  { statusCode: 500, message: "Couldn't update sts" }
);

const deleteSTS = errorWrapper(
  async (req: Request, res: Response) => {
    const { stsId } = req.params;

    const stsExists = await prisma.sTS.findUnique({
      where: {
        id: stsId,
      },
    });

    if (!stsExists) {
      throw new CustomError("STS not found", 404);
    }

    const sts = await prisma.sTS.delete({
      where: {
        id: stsId,
      },
    });

    res.json(sts);
  },
  { statusCode: 500, message: "Couldn't delete sts" }
);

export { addSTS, getAllSTS, getSTSById, updateSTS, deleteSTS };
