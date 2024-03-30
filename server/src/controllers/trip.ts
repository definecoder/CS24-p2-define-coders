import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import { addTrip, getTripById } from "../services/tripServices";
import { Prisma, Trip } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import CustomError from "../services/CustomError";
import { getVehicleById } from "../services/vehicleServices";
import { updateLandfillVehicleEntry } from "../services/landfillVehicle";
import {
  getStsVehicleEntryById,
  updateStsVehicleEntry,
} from "../services/stsVehicle";
import { TripStatus } from "../types/tripStatus";

const prisma = new PrismaClient();

const createTrip = errorWrapper(async (req: Request, res: Response) => {
  const { stsVehicleId, weightOfWaste, exitTime, distance, estimatedDuration } =
    req.body;

  const stsVehicleInfo = await getStsVehicleEntryById(stsVehicleId);

  if (!stsVehicleInfo) {
    throw new CustomError("No such Vehicle entry found", 404);
  }

  await prisma.sTSVehicleEntry.update({
    where: {
      id: stsVehicleId,
    },
    data: {
      exitTime,
      weightOfWaste,
    },
  });

  const vehicle = stsVehicleInfo.vehicle;
  const sts = stsVehicleInfo.sts;

  const unloadedFuelCostPerKm = Number(vehicle.unloadedFuelCostPerKm);
  const loadedFuelCostPerKm = Number(vehicle.loadedFuelCostPerKm);
  const capacity = Number(vehicle.capacity);
  const estimatedCost =
    unloadedFuelCostPerKm +
    (weightOfWaste / capacity) * (loadedFuelCostPerKm - unloadedFuelCostPerKm);

  const trip = {
    stsId: sts.id,
    landfillId: vehicle.landFillId as string,
    vehicleId: vehicle.id,
    weightOfWaste,
    distance,
    estimatedDuration,
    tripStartTime: exitTime,
    estimatedFuelCost: new Prisma.Decimal(estimatedCost),
    tripStatus: TripStatus.PENDING,
  };

  const newTrip = await addTrip(trip as Trip);
  res.status(201).json(newTrip);
});

const getListOfTrips = errorWrapper(async (req: Request, res: Response) => {

  const { tripStatus, landfillId } = req.query;

  let where: Prisma.TripWhereInput | undefined = undefined;


  if (tripStatus || landfillId) {
    where = {};
    if (tripStatus) {
      where.tripStatus = tripStatus as string;
    }
    if (landfillId) {
      where.landfillId = landfillId as string;
    }
  }

  const trips = await prisma.trip.findMany({
    where,
    include: {
      sts: true,
      landfill: true,
      vehicle: true,
    },
  });
  res.json(trips);
});

const completeTrip = errorWrapper(async (req: Request, res: Response) => {
  const { tripId, weightOfWaste, entryTime } = req.body;

  const trip = await getTripById(tripId);

  if (!trip) {
    throw new CustomError("No such trip found", 404);
  }

  const landfillId = trip.landfillId;
  const vehicleId = trip.vehicleId;

  prisma.landfillVehicleEntry.create({
    data: {
      landfillId,
      vehicleId,
      weightOfWaste,
      entryTime,
    },
  });

  const shortage = Number(trip.weightOfWaste) - weightOfWaste;

  const tripStartTime = new Date(trip.tripStartTime as Date);

  const entryTimeConverted = new Date(entryTime);

  let duration =
    (entryTimeConverted.getTime() - tripStartTime.getTime()) / (1000 * 60);

  const completedTrip = await prisma.trip.update({
    where: {
      id: tripId,
    },
    data: {
      tripStatus: TripStatus.DELIVERED,
      weightOfWaste,
      shortage,
      tripEndTime: entryTime,
      actualDuration: duration,
    },
  });

  res.json(completedTrip);
});

export { createTrip, getListOfTrips, completeTrip };
