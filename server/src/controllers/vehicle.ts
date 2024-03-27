import { Prisma } from "./../../node_modules/.prisma/client/index.d";
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
} from "../services/vehicleServices";

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

const getVehiclesOnQuery = errorWrapper(async (req: Request, res: Response) => {
  const { landFillId, vehicleType, vehicleNumber } = req.query;

  let where: Prisma.VehicleWhereInput | undefined = undefined;
  if (landFillId || vehicleType || vehicleNumber) {
    where = {};
    if (landFillId) {
      where.landFillId = landFillId as string;
    }

    if (vehicleType) {
      where.vehicleType = vehicleType as string;
    }

    if (vehicleNumber) {
      where.vehicleNumber = vehicleNumber as string;
    }
  }

  const vehicles = await prisma.vehicle.findMany({
    where,
  });

  res.json(vehicles);
});

export {
  createVehicle,
  fetchAllVehicles,
  fetchVehicleById,
  editVehicle,
  removeVehicle,
  getVehiclesOnQuery,
};
