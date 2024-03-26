import { LandfillVehicleEntry, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import {
  addLandfillVehicleEntry,
  deleteLandfillVehicleEntry,
  getAllLandfillVehicleEntries,
  getLandfillVehicleEntryById,
  updateLandfillVehicleEntry,
} from "../services/landfillVehicle";

const prisma = new PrismaClient();

const addVehicleEntry = errorWrapper(async (req: Request, res: Response) => {
  const vehicleEntry: LandfillVehicleEntry = req.body;

  const vehicle = await addLandfillVehicleEntry(vehicleEntry);
  res.status(201).json(vehicle);
});

const getAllVehicleEntries = errorWrapper(
  async (req: Request, res: Response) => {
    const vehicles = await getAllLandfillVehicleEntries();
    res.status(200).json(vehicles);
  },
  { statusCode: 500, message: "Couldn't fetch vehicles" }
);

const getVehicleEntryById = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleEntryId } = req.params;
    const vehicle = await getLandfillVehicleEntryById(vehicleEntryId);
    res.status(200).json(vehicle);
  },
  { statusCode: 500, message: "Couldn't fetch vehicle" }
);

const updateVehicleEntry = errorWrapper(
  async (req: Request, res: Response) => {
    const { vehicleEntryId } = req.params;
    const vehicleEntry: LandfillVehicleEntry = req.body;

    const vehicle = await updateLandfillVehicleEntry(
      vehicleEntryId,
      vehicleEntry
    );

    res.status(200).json(vehicle);
  },
  { statusCode: 500, message: "Couldn't update vehicle" }
);

const deleteVehicleEntry = errorWrapper(async (req: Request, res: Response) => {
  const { vehicleEntryId } = req.params;
  await deleteLandfillVehicleEntry(vehicleEntryId);
  res.status(204).json({ message: "Vehicle deleted successfully" });
});

export {
  addVehicleEntry,
  getAllVehicleEntries,
  getVehicleEntryById,
  updateVehicleEntry,
  deleteVehicleEntry,
};
