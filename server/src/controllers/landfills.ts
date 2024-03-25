import { Landfill, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";

const prisma = new PrismaClient();

const addlandfill = errorWrapper(
  async (req: Request, res: Response) => {
    const landfillInfo: Landfill = req.body;

    const landfill = await prisma.landfill.create({
      data: landfillInfo,
    });
    res.status(201).json(landfill);
  },
  { statusCode: 400, message: "Couldn't add landfill" }
);

const getAllLandfills = errorWrapper(
  async (req: Request, res: Response) => {
    const landfills = await prisma.landfill.findMany({});
    res.status(200).json(landfills);
  },
  { statusCode: 500, message: "Couldn't fetch landfills" }
);

const getLandfillById = errorWrapper(
  async (req: Request, res: Response) => {
    const { landfillId } = req.params;
    const landfill = await prisma.landfill.findUnique({
      where: {
        id: landfillId,
      },
    });

    res.status(200).json(landfill);
  },
  { statusCode: 404, message: "Landfill not found" }
);

const updateLandfill = errorWrapper(
  async (req: Request, res: Response) => {
    const { landfillId } = req.params;
    const landfillInfo: Landfill = req.body;

    const landfillExists = await prisma.landfill.findUnique({
      where: {
        id: landfillId,
      },
    });

    if (!landfillExists) {
      throw new CustomError("Landfill not found", 404);
    }

    const landfill = await prisma.landfill.update({
      where: {
        id: landfillId,
      },
      data: landfillInfo,
    });

    res.json(landfill);
  },
  { statusCode: 404, message: `Couldn't update landfill information` }
);

const deleteLandfill = errorWrapper(
  async (req: Request, res: Response) => {
    const { landfillId } = req.params;

    const landfillExists = await prisma.landfill.findUnique({
      where: {
        id: landfillId,
      },
    });

    if (!landfillExists) {
      throw new CustomError("Landfill not found", 404);
    }

    const landfill = await prisma.landfill.delete({
      where: {
        id: landfillId,
      },
    });

    res.status(204).json({ msg: "deleted landfill successfully!" });
  },
  { statusCode: 404, message: "Landfill not found" }
);

export {
  addlandfill,
  getAllLandfills,
  getLandfillById,
  updateLandfill,
  deleteLandfill,
};
