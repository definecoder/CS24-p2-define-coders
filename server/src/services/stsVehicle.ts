import { PrismaClient, STSVehicleEntry } from "@prisma/client";
import CustomError from "./CustomError";

const prisma = new PrismaClient();

const getAllStsVehicleEntries = async () => {
  const stsVehicles = await prisma.sTSVehicleEntry.findMany({
    include: {
      sts: true,
      vehicle: true,
    },
  });
  return stsVehicles;
};

const getStsVehicleEntryById = async (stsVehicleId: string) => {
  const stsVehicle = await prisma.sTSVehicleEntry.findUnique({
    where: {
      id: stsVehicleId,
    },
    include: {
      sts: true,
      vehicle: true,
    },
  });

  return stsVehicle;
};

const addStsVehicleEntry = async (stsVehicleData: STSVehicleEntry) => {
  const stsVehicle = await prisma.sTSVehicleEntry.create({
    data: stsVehicleData,
  });

  return stsVehicle;
};

const updateStsVehicleEntry = async (
  stsVehicleId: string,
  stsVehicleData: STSVehicleEntry
) => {
  const stsVehicleExists = await prisma.sTSVehicleEntry.findUnique({
    where: {
      id: stsVehicleId,
    },
  });

  if (!stsVehicleExists) {
    throw new CustomError("Sts vehicle not found", 404);
  }

  const stsVehicle = await prisma.sTSVehicleEntry.update({
    where: {
      id: stsVehicleId,
    },
    data: stsVehicleData,
  });

  return stsVehicle;
};

const deleteStsVehicleEntry = async (stsVehicleId: string) => {
  const stsVehicleExists = await prisma.sTSVehicleEntry.findUnique({
    where: {
      id: stsVehicleId,
    },
  });

  if (!stsVehicleExists) {
    throw new CustomError("Sts vehicle not found", 404);
  }

  await prisma.sTSVehicleEntry.delete({
    where: {
      id: stsVehicleId,
    },
  });
};

export {
  getAllStsVehicleEntries,
  getStsVehicleEntryById,
  addStsVehicleEntry,
  updateStsVehicleEntry,
  deleteStsVehicleEntry,
};
