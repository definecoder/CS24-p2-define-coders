import { Bill, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import {
  addBill,
  deleteBill,
  getBill,
  getBills,
  updateBill,
} from "../services/bills";

const prisma = new PrismaClient();

const createBill = errorWrapper(
  async (req: Request, res: Response) => {
    const billData: Bill = req.body;

    console.log("billdata: ", billData);

    const bill = await addBill(billData);
    res.json(bill);
  },
  { statusCode: 500, message: "Couldn't add bill" }
);

const fetchBills = errorWrapper(
  async (req: Request, res: Response) => {
    const bills = await getBills();
    res.json(bills);
  },
  { statusCode: 500, message: "Couldn't fetch bills" }
);

const fetchBill = errorWrapper(
  async (req: Request, res: Response) => {
    const { billId } = req.params;
    const bill = await getBill(billId);
    res.json(bill);
  },
  { statusCode: 500, message: "Couldn't fetch bill" }
);

const editBill = errorWrapper(
  async (req: Request, res: Response) => {
    const { billId } = req.params;
    const billData: Bill = req.body;

    const bill = await updateBill(billId, billData);
    res.json(bill);
  },
  { statusCode: 500, message: "Couldn't update bill" }
);

const removeBill = errorWrapper(
  async (req: Request, res: Response) => {
    const { billId } = req.params;

    await deleteBill(billId);
    res.json({ message: "Bill deleted" });
  },
  { statusCode: 500, message: "Couldn't delete bill" }
);

export { createBill, fetchBills, fetchBill, editBill, removeBill };
