import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import { addTrip } from "../services/trip";
import { Prisma, Trip } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import CustomError from "../services/CustomError";
import { getVehicleById } from "../services/vehicles";

const prisma = new PrismaClient();

const createTrip = errorWrapper(async (req: Request, res: Response) => {
  const {
    weightOfWaste,
    exitTime,
    stsId,
    landfillId,
    vehicleId,
    distance,
    estimatedDuration,
  } = req.body;

  const vehicle = await getVehicleById(vehicleId);

  if (!vehicle) {
    throw new CustomError("Vehicle not found", 404);
  }

  const unloadedFuelCostPerKm = Number(vehicle.unloadedFuelCostPerKm);
  const loadedFuelCostPerKm = Number(vehicle.loadedFuelCostPerKm);
  const capacity = Number(vehicle.capacity);
  const estimatedCost =
    unloadedFuelCostPerKm +
    (weightOfWaste / capacity) * (loadedFuelCostPerKm - unloadedFuelCostPerKm);

  const trip = {
    weightOfWaste,
    stsId,
    landfillId,
    vehicleId,
    distance,
    estimatedDuration,
    estimatedFuel: new Prisma.Decimal(estimatedCost),
    tripStatus: "PENDING",
  };

  const newTrip = await addTrip(trip as Trip);
  res.status(201).json(newTrip);
});

export { createTrip };
