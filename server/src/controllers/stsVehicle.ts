import { PrismaClient, STSVehicleEntry } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";

const prisma = new PrismaClient();

const addVehicleEntry = errorWrapper(
  async (req: Request, res: Response) => {
    const vehicleEntry: STSVehicleEntry = req.body;

    const vehicle = await prisma.sTSVehicleEntry.create({
      data: vehicleEntry,
      include: {
        sts: true,
        vehicle: true,
      },
    });
    res.status(201).json(vehicle);
  },
  { statusCode: 400, message: "Couldn't add sts" }
);

const getAllVehicleEntries = errorWrapper(
  async (req: Request, res: Response) => {
    const vehicles = await prisma.sTSVehicleEntry.findMany({
      include: {
        sts: true,
        vehicle: true,
      },
    });
    res.status(200).json(vehicles);
  },
  { statusCode: 500, message: "Couldn't fetch vehicles" }
);

const getVehicleEntryById = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleEntryId } = req.params;
    const vehicle = await prisma.sTSVehicleEntry.findUnique({
      where: {
        id: vehicleEntryId,
      },
      include: {
        sts: true,
        vehicle: true,
      },
    });

    res.status(200).json(vehicle);
  },
  { statusCode: 500, message: "Couldn't fetch vehicle" }
);

const updateVehicleEntry = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleEntryId } = req.params;
    const vehicleEntry: STSVehicleEntry = req.body;

    const vehicleExists = await prisma.sTSVehicleEntry.findUnique({
      where: {
        id: vehicleEntryId,
      },
      include: {
        sts: true,
        vehicle: true,
      },
    });

    if (!vehicleExists) {
      throw new CustomError("Vehicle not found", 404);
    }

    const vehicle = await prisma.sTSVehicleEntry.update({
      where: {
        id: vehicleEntryId,
      },
      data: vehicleEntry,
    });

    res.status(200).json(vehicle);
  },
  { statusCode: 500, message: "Couldn't update vehicle" }
);

const deleteVehicleEntry = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleEntryId } = req.params;

    const vehicleExists = await prisma.sTSVehicleEntry.findUnique({
      where: {
        id: vehicleEntryId,
      },
    });

    if (!vehicleExists) {
      throw new CustomError("Vehicle not found", 404);
    }

    await prisma.sTSVehicleEntry.delete({
      where: {
        id: vehicleEntryId,
      },
    });

    res.status(204).json({ message: "Vehicle deleted successfully" });
  },
  { statusCode: 500, message: "Couldn't delete vehicle" }
);

export {
  addVehicleEntry,
  getAllVehicleEntries,
  getVehicleEntryById,
  updateVehicleEntry,
  deleteVehicleEntry,
};
