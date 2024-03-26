import { LandfillVehicleEntry, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";

const prisma = new PrismaClient();

const addVehicleEntry = errorWrapper(async (req: Request, res: Response) => {
  const vehicleEntry: LandfillVehicleEntry = req.body;

  const vehicle = await prisma.landfillVehicleEntry.create({
    data: vehicleEntry,
    include: {
      vehicle: true,
      landfill: true,
    },
  });
  res.status(201).json(vehicle);
});

const getAllVehicleEntries = errorWrapper(
  async (req: Request, res: Response) => {
    const vehicles = await prisma.landfillVehicleEntry.findMany({
      include: {
        vehicle: true,
        landfill: true,
      },
    });
    res.status(200).json(vehicles);
  },
  { statusCode: 500, message: "Couldn't fetch vehicles" }
);

const getVehicleEntryById = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleEntryId } = req.params;
    const vehicle = await prisma.landfillVehicleEntry.findUnique({
      where: {
        id: vehicleEntryId,
      },
      include: {
        vehicle: true,
        landfill: true,
      },
    });

    res.status(200).json(vehicle);
  },
  { statusCode: 500, message: "Couldn't fetch vehicle" }
);

const updateVehicleEntry = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleEntryId } = req.params;
    const vehicleEntry: LandfillVehicleEntry = req.body;

    const vehicleExists = await prisma.landfillVehicleEntry.findUnique({
      where: {
        id: vehicleEntryId,
      },
      include: {
        vehicle: true,
        landfill: true,
      },
    });

    if (!vehicleExists) {
      throw new CustomError("Vehicle not found", 404);
    }

    const vehicle = await prisma.landfillVehicleEntry.update({
      where: {
        id: vehicleEntryId,
      },
      data: vehicleEntry,
      include: {
        vehicle: true,
        landfill: true,
      },
    });

    res.status(200).json(vehicle);
  },
  { statusCode: 500, message: "Couldn't update vehicle" }
);

const deleteVehicleEntry = errorWrapper(async (req: Request, res: Response) => {
  const { vehicleEntryId } = req.params;

  const vehicleExists = await prisma.landfillVehicleEntry.findUnique({
    where: {
      id: vehicleEntryId,
    },
  });

  if (!vehicleExists) {
    throw new CustomError("Vehicle not found", 404);
  }

  await prisma.landfillVehicleEntry.delete({
    where: {
      id: vehicleEntryId,
    },
  });

  res.status(204).json({ message: "Vehicle deleted successfully" });
});

export {
  addVehicleEntry,
  getAllVehicleEntries,
  getVehicleEntryById,
  updateVehicleEntry,
  deleteVehicleEntry,
};
