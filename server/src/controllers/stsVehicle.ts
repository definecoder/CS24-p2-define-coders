import { PrismaClient, STSVehicleEntry } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import {
  addStsVehicleEntry,
  deleteStsVehicleEntry,
  getAllStsVehicleEntries,
  getStsVehicleEntryById,
  updateStsVehicleEntry,
} from "../services/stsVehicle";

const prisma = new PrismaClient();

const addVehicleEntry = errorWrapper(
  async (req: Request, res: Response) => {
    const vehicleEntry: STSVehicleEntry = req.body;

    const vehicle = await addStsVehicleEntry(vehicleEntry);
    res.status(201).json(vehicle);
  },
  { statusCode: 400, message: "Couldn't add sts" }
);

const getAllVehicleEntries = errorWrapper(
  async (req: Request, res: Response) => {
    const vehicles = await getAllStsVehicleEntries();
    res.status(200).json(vehicles);
  },
  { statusCode: 500, message: "Couldn't fetch vehicles" }
);

const getVehicleEntryById = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleEntryId } = req.params;
    const vehicle = await getStsVehicleEntryById(vehicleEntryId);
    res.status(200).json(vehicle);
  },
  { statusCode: 500, message: "Couldn't fetch vehicle" }
);

const updateVehicleEntry = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleEntryId } = req.params;
    const vehicleEntry: STSVehicleEntry = req.body;

    const vehicle = await updateStsVehicleEntry(vehicleEntryId, vehicleEntry);
    res.status(200).json(vehicle);
  },
  { statusCode: 500, message: "Couldn't update vehicle" }
);

const deleteVehicleEntry = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleEntryId } = req.params;

    await deleteStsVehicleEntry(vehicleEntryId);

    res.status(204).json({ message: "Vehicle deleted successfully" });
  },
  { statusCode: 500, message: "Couldn't delete vehicle" }
);

const getCurrentVehiclesInSTS = errorWrapper(
  async (req: Request, res: Response) => {
    const { stsId } = req.params;

    const vehicles = await prisma.sTSVehicleEntry.findMany({
      where: {
        stsId,
        exitTime: null,
      },
      include: {
        sts: true,
        vehicle: true,
      },
    });

    res.status(200).json(vehicles);
  },
  { statusCode: 500, message: "Couldn't fetch vehicles" }
);

export {
  addVehicleEntry,
  getAllVehicleEntries,
  getVehicleEntryById,
  updateVehicleEntry,
  deleteVehicleEntry,
  getCurrentVehiclesInSTS,
};
