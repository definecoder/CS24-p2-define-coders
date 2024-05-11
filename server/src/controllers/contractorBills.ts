import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import { PrismaClient } from "@prisma/client";
import { adminLog } from "../services/logdata";

const prisma = new PrismaClient();

const generateBillFortheWeek = errorWrapper(
  async (req: Request, res: Response) => {
    const { stsId, contractorId } = req.body;

    const sts = await prisma.sTS.findUnique({
      where: {
        id: stsId,
      },
    });

    if (!sts) {
      res.status(404).json({ message: "STS not found" });
    }

    // get the entries for the week

    const contractorEntries = await prisma.sTSContractorEntry.findMany({
      where: {
        stsId,
        contractorId,
        entryTime: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    const totalWasteOfWeek = contractorEntries.reduce(
      (acc, entry) => acc + Number(entry.wasteWeight),
      0
    );

    const requiredWaste = Number(sts?.requiredWastePerWeek);
    const PaymentPerTon = Number(sts?.paymentPerTon);

    const basicPay = totalWasteOfWeek * PaymentPerTon;

    const deficit = Math.max(0, requiredWaste - totalWasteOfWeek);

    const fine = deficit * PaymentPerTon;

    const paymentAmount = basicPay - fine;

    const contractorBill = await prisma.contractorBill.create({
      data: {
        stsId,
        contractorId,
        billNo: Math.floor(Math.random() * 1000000),
        weightCollected: totalWasteOfWeek,
        weightRequired: requiredWaste,
        fine: fine,
        paymentPerTon: PaymentPerTon,
        deficit: deficit,
        paymentAmount: paymentAmount,
      },
    });

    adminLog(
      "Bill Generated",
      `Bill Generated for Contractor ${contractorId} for STS ${sts?.name}`
    );

    res.status(201).json(contractorBill);
  },
  { statusCode: 400, message: "Couldn't generate bill" }
);

const getAllContractorBills = errorWrapper(
  async (req: Request, res: Response) => {
    const contractorBills = await prisma.contractorBill.findMany();
    res.status(200).json(contractorBills);
  },
  { statusCode: 404, message: "Contractor Bills not found" }
);

const getContractorBillById = errorWrapper(
  async (req: Request, res: Response) => {
    const { contractorBillId } = req.params;
    const contractorBill = await prisma.contractorBill.findUnique({
      where: {
        id: contractorBillId,
      },
    });

    if (!contractorBill) {
      res.status(404).json({ message: "Contractor Bill not found" });
    }

    res.status(200).json(contractorBill);
  },
  { statusCode: 404, message: "Contractor Bill not found" }
);

export { generateBillFortheWeek, getAllContractorBills, getContractorBillById };
