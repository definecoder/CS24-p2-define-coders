import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { adminLog } from "../services/logdata";
import errorWrapper from "../middlewares/errorWrapper";

const prisma = new PrismaClient();

const addContractorEntry = errorWrapper(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const newContractorEntry = await prisma.sTSContractorEntry.create({
      data: payload,
    });

    await adminLog(
      "Contractor Entry",
      `${newContractorEntry.vehicleNumber} has entered STS ${newContractorEntry.stsId}`
    );

    res.status(201).json(newContractorEntry);
  },
  { statusCode: 400, message: "Contractor Entry not created" }
);

const getAllContractorEntries = errorWrapper(
  async (req: Request, res: Response) => {
    const contractorEntries = await prisma.sTSContractorEntry.findMany();
    res.status(200).json(contractorEntries);
  },
  { statusCode: 404, message: "Contractor Entries not found" }
);

const getContractorEntryById = errorWrapper(
  async (req: Request, res: Response) => {
    const { contractorEntryId } = req.params;
    const contractorEntry = await prisma.sTSContractorEntry.findUnique({
      where: {
        id: contractorEntryId,
      },
    });

    if (!contractorEntry) {
      res.status(404).json({ message: "Contractor Entry not found" });
    }

    res.status(200).json(contractorEntry);
  },
  { statusCode: 404, message: "Contractor Entry not found" }
);

export { addContractorEntry, getAllContractorEntries, getContractorEntryById };
