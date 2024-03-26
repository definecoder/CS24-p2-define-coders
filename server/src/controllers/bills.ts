import { Bill, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";

const prisma = new PrismaClient();

const addBill = errorWrapper(
  async (req: Request, res: Response) => {
    const billData: Bill = req.body;

    console.log("billdata: ", billData);

    const bill = await prisma.bill.create({
      data: billData,
      include: {
        sts: true,
        landfill: true,
        vehicle: true,
      },
    });
    res.json(bill);
  },
  { statusCode: 500, message: "Couldn't add bill" }
);

const getBills = errorWrapper(
  async (req: Request, res: Response) => {
    const bills = await prisma.bill.findMany({
      include: {
        sts: true,
        landfill: true,
        vehicle: true,
      },
    });
    res.json(bills);
  },
  { statusCode: 500, message: "Couldn't fetch bills" }
);

const getBill = errorWrapper(
  async (req: Request, res: Response) => {
    const { billId } = req.params;
    const bill = await prisma.bill.findUnique({
      where: {
        id: billId,
      },
      include: {
        sts: true,
        landfill: true,
        vehicle: true,
      },
    });
    res.json(bill);
  },
  { statusCode: 500, message: "Couldn't fetch bill" }
);

const updateBill = errorWrapper(
  async (req: Request, res: Response) => {
    const { billId } = req.params;
    const billData: Bill = req.body;

    const billExists = await prisma.bill.findUnique({
      where: {
        id: billId,
      },
    });

    if (!billExists) {
      throw new CustomError("Bill not found", 404);
    }

    const bill = await prisma.bill.update({
      where: {
        id: billId,
      },
      data: billData,
    });
    res.json(bill);
  },
  { statusCode: 500, message: "Couldn't update bill" }
);

const deleteBill = errorWrapper(
  async (req: Request, res: Response) => {
    const { billId } = req.params;

    const billExists = await prisma.bill.findUnique({
      where: {
        id: billId,
      },
    });

    if (!billExists) {
      throw new CustomError("Bill not found", 404);
    }

    await prisma.bill.delete({
      where: {
        id: billId,
      },
    });
    res.json({ message: "Bill deleted" });
  },
  { statusCode: 500, message: "Couldn't delete bill" }
);

export { addBill, getBills, getBill, updateBill, deleteBill };
