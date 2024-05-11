import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import { adminLog } from "../services/logdata";

const prisma = new PrismaClient();

const addContractor = errorWrapper(
  async (req: Request, res: Response) => {
    const contractorInfo = req.body;
    const contractor = await prisma.contractor.create({
      data: contractorInfo,
    });

    console.info("Contractor added", { contractor: contractor });

    await adminLog("Contractor Entry", `Contractor ${contractor.name} added`);

    res.status(201).json(contractor);
  },
  { statusCode: 400, message: "Couldn't add contractor" }
);

const getAllContractors = errorWrapper(
  async (req: Request, res: Response) => {
    const contractors = await prisma.contractor.findMany({
      include: {
        assignedSTS: true,
      },
    });
    res.status(200).json(contractors);
  },
  { statusCode: 500, message: "Couldn't fetch contractors" }
);

const getContractorById = errorWrapper(
  async (req: Request, res: Response) => {
    const { contractorId } = req.params;
    const contractor = await prisma.contractor.findUnique({
      where: {
        id: contractorId,
      },
    });

    if (!contractor) {
      throw new CustomError("Contractor not found", 404);
    }

    res.status(200).json(contractor);
  },
  { statusCode: 404, message: "Contractor not found" }
);

const updateContractor = errorWrapper(
  async (req: Request, res: Response) => {
    const { contractorId } = req.params;
    const contractorInfo = req.body;
    const contractor = await prisma.contractor.update({
      where: {
        id: contractorId,
      },
      data: contractorInfo,
    });

    await adminLog(
      "Contractor Entry",
      `Contractor ${contractor.name} information updated`
    );

    res.status(200).json(contractor);
  },
  { statusCode: 400, message: "Couldn't update contractor" }
);

const deleteContractor = errorWrapper(
  async (req: Request, res: Response) => {
    const { contractorId } = req.params;
    const contractor = await prisma.contractor.delete({
      where: {
        id: contractorId,
      },
    });

    adminLog("Contractor Entry", `Contractor ${contractor.name} deleted`);

    res.status(200).json(contractor);
  },
  { statusCode: 400, message: "Couldn't delete contractor" }
);

export {
  addContractor,
  getAllContractors,
  getContractorById,
  updateContractor,
  deleteContractor,
};
