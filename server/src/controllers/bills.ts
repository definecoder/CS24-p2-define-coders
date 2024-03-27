import { Bill, Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import {
  addBill,
  deleteBill,
  getBill,
  getBills,
  updateBill,
} from "../services/billServices";
import { getTripById } from "../services/tripServices";
import CustomError from "../services/CustomError";

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

const createBillFromTrip = errorWrapper(
  async (req: Request, res: Response) => {
    const { tripId, allocatedFuelCost } = req.body;

    const trip = await getTripById(tripId);

    if (!trip) {
      throw new CustomError("No such trip found", 404);
    }

    const bill = await prisma.bill.create({
      data: {
        vehicleId: trip.vehicleId,
        stsId: trip.stsId,
        landfillId: trip.landfillId,
        tripId: trip.id,
        weightOfWaste: trip.weightOfWaste,
        allocatedFuelCost,
      },
      include: {
        trip: true,
        vehicle: true,
        sts: true,
        landfill: true,
      },
    });

    res.status(201).json(bill);
  },
  { statusCode: 500, message: "Couldn't create bill" }
);

const getListOfBills = errorWrapper(async (req: Request, res: Response) => {
  const { landfillId, day } = req.query;

  let where: Prisma.BillWhereInput | undefined = undefined;

  if (landfillId || day) {
    where = {};
    if (landfillId) {
      where.landfillId = landfillId as string;
    }
    if (day) {
      const days = parseInt(day as string, 10);

      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - days);

      where.createdAt = {
        gte: thresholdDate.toISOString(),
      };
    }
  }

  const bills = await prisma.bill.findMany({
    where,
    include: {
      trip: true,
      vehicle: true,
      sts: true,
      landfill: true,
    },
  });
  res.json(bills);
});

export {
  createBill,
  fetchBills,
  fetchBill,
  editBill,
  removeBill,
  createBillFromTrip,
  getListOfBills,
};
