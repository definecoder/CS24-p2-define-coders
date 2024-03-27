import { Bill, PrismaClient } from "@prisma/client";
import CustomError from "./CustomError";
const prisma = new PrismaClient();

const addBill = async (billData: Bill) => {
  const bill = await prisma.bill.create({
    data: billData,
    include: {
      sts: true,
      landfill: true,
      vehicle: true,
    },
  });

  return bill;
};

const getBills = async () => {
  const bills = await prisma.bill.findMany({
    include: {
      sts: true,
      landfill: true,
      vehicle: true,
    },
  });

  return bills;
};

const getBill = async (billId: string) => {
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

  return bill;
};

const updateBill = async (billId: string, billData: Bill) => {
  const billExists = await prisma.bill.findUnique({
    where: {
      id: billId,
    },
    include: {
      sts: true,
      landfill: true,
      vehicle: true,
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
    include: {
      sts: true,
      landfill: true,
      vehicle: true,
    },
  });

  return bill;
};

const deleteBill = async (billId: string) => {
  const billExists = await prisma.bill.findUnique({
    where: {
      id: billId,
    },
    include: {
      sts: true,
      landfill: true,
      vehicle: true,
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

  return billExists;
};

export { addBill, getBills, getBill, updateBill, deleteBill };
