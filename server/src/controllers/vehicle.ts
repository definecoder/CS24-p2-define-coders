import { PrismaClient, Vehicle } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import {
  addVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
} from "../services/vehicles";

const prisma = new PrismaClient();

const createVehicle = errorWrapper(
  async (req: Request, res: Response) => {
    const vehicleInfo: Vehicle = req.body;

    const vehicle = await addVehicle(vehicleInfo);
    res.status(201).json(vehicle);
  },
  { statusCode: 400, message: "Couldn't add vehicle" }
);

const fetchAllVehicles = errorWrapper(
  async (req: Request, res: Response) => {
    const vehicles = await getAllVehicles();
    res.json(vehicles);
  },
  { statusCode: 500, message: "Couldn't fetch vehicles" }
);

const fetchVehicleById = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleId } = req.params;
    const vehicle = await getVehicleById(vehicleId);

    res.json(vehicle);
  },
  { statusCode: 404, message: "Vehicle not found" }
);

const editVehicle = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleId } = req.params;
    const vehicleInfo: Vehicle = req.body;

    const vehicle = await updateVehicle(vehicleId, vehicleInfo);

    res.json(vehicle);
  },
  { statusCode: 500, message: "Couldn't update vehicle" }
);

const removeVehicle = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleId } = req.params;

    await deleteVehicle(vehicleId);

    res.json({ message: "Vehicle deleted successfully" });
  },
  { statusCode: 500, message: "Couldn't delete vehicle" }
);

export {
  createVehicle,
  fetchAllVehicles,
  fetchVehicleById,
  editVehicle,
  removeVehicle,
};
