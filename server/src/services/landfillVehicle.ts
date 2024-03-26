import { LandfillVehicleEntry, PrismaClient } from "@prisma/client";
import CustomError from "./CustomError";

const prisma = new PrismaClient();

const getAllLandfillVehicleEntries = async () => {
  const landfillVehicles = await prisma.landfillVehicleEntry.findMany({
    include: {
      landfill: true,
      vehicle: true,
    },
  });
  return landfillVehicles;
};

const getLandfillVehicleEntryById = async (landfillVehicleId: string) => {
  const landfillVehicle = await prisma.landfillVehicleEntry.findUnique({
    where: {
      id: landfillVehicleId,
    },
    include: {
      landfill: true,
      vehicle: true,
    },
  });

  return landfillVehicle;
};

const addLandfillVehicleEntry = async (
  landfillVehicleData: LandfillVehicleEntry
) => {
  const landfillVehicle = await prisma.landfillVehicleEntry.create({
    data: landfillVehicleData,
  });

  return landfillVehicle;
};

const updateLandfillVehicleEntry = async (
  landfillVehicleId: string,
  landfillVehicleData: LandfillVehicleEntry
) => {
  const landfillVehicleExists = await prisma.landfillVehicleEntry.findUnique({
    where: {
      id: landfillVehicleId,
    },
  });

  if (!landfillVehicleExists) {
    throw new CustomError("Landfill vehicle not found", 404);
  }

  const landfillVehicle = await prisma.landfillVehicleEntry.update({
    where: {
      id: landfillVehicleId,
    },
    data: landfillVehicleData,
  });

  return landfillVehicle;
};

const deleteLandfillVehicleEntry = async (landfillVehicleId: string) => {
  const landfillVehicleExists = await prisma.landfillVehicleEntry.findUnique({
    where: {
      id: landfillVehicleId,
    },
  });

  if (!landfillVehicleExists) {
    throw new CustomError("Landfill vehicle not found", 404);
  }

  await prisma.landfillVehicleEntry.delete({
    where: {
      id: landfillVehicleId,
    },
  });
};

export {
  addLandfillVehicleEntry,
  getAllLandfillVehicleEntries,
  getLandfillVehicleEntryById,
  updateLandfillVehicleEntry,
  deleteLandfillVehicleEntry,
};
