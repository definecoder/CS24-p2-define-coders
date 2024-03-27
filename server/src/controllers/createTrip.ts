import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import { addTrip } from "../services/tripServices";
import CustomError from "../services/CustomError";
import { getStsVehicleEntryById } from "../services/stsVehicle";

const createTrip = errorWrapper(async (req: Request, res: Response) => {
  const { stsVehicleId, weightOfWaste, exitTime, distance, estimatedDuration } =
    req.body;

  const stsVehicleInfo = await getStsVehicleEntryById(stsVehicleId);

  if (!stsVehicleInfo) {
    throw new CustomError("No such Vehicle entry found", 404);
  }

  const vehicle = stsVehicleInfo.vehicle;
  const sts = stsVehicleInfo.sts;

  const unloadedFuelCostPerKm = Number(vehicle.unloadedFuelCostPerKm);
  const loadedFuelCostPerKm = Number(vehicle.loadedFuelCostPerKm);
  const capacity = Number(vehicle.capacity);
  const estimatedCost =
    unloadedFuelCostPerKm +
    (weightOfWaste / capacity) * (loadedFuelCostPerKm - unloadedFuelCostPerKm);

  // const trip = {
  //   weightOfWaste,
  //   distance,
  //   estimatedDuration,
  //   estimatedFuelCost: new Prisma.Decimal(estimatedCost),
  //   tripStatus: "PENDING",
  // };
  const newTrip = await addTrip(trip);
  // res.status(201).json(newTrip);
});
