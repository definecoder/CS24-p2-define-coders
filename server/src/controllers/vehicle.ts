import { PrismaClient, Vehicle } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";

const prisma = new PrismaClient();

const addVehicle = errorWrapper(
  async (req: Request, res: Response) => {
    const vehicleInfo: Vehicle = req.body;

    const vehicle = await prisma.vehicle.create({
      data: vehicleInfo,
    });
    res.status(201).json(vehicle);
  },
  { statusCode: 400, message: "Couldn't add vehicle" }
);

const getAllVehicles = errorWrapper(
  async (req: Request, res: Response) => {
    const vehicles = await prisma.vehicle.findMany({});
    res.json(vehicles);
  },
  { statusCode: 500, message: "Couldn't fetch vehicles" }
);

const getVehicleById = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleId } = req.params;
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });

    res.json(vehicle);
  },
  { statusCode: 404, message: "Vehicle not found" }
);

const updateVehicle = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleId } = req.params;
    const vehicleInfo: Vehicle = req.body;

    const vehicleExists = await prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicleExists) {
      throw new CustomError("Vehicle not found", 404);
    }

    const vehicle = await prisma.vehicle.update({
      where: {
        id: vehicleId,
      },
      data: vehicleInfo,
    });

    res.json(vehicle);
  },
  { statusCode: 500, message: "Couldn't update vehicle" }
);

const deleteVehicle = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleId } = req.params;

    const vehicleExists = await prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicleExists) {
      throw new CustomError("Vehicle not found", 404);
    }

    await prisma.vehicle.delete({
      where: {
        id: vehicleId,
      },
    });

    res.json({ message: "Vehicle deleted successfully" });
  },
  { statusCode: 500, message: "Couldn't delete vehicle" }
);

export {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
