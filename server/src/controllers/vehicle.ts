import { Prisma } from "@prisma/client";
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
import { getDistance, getDuration } from "../services/optmization";

const prisma = new PrismaClient();

const createVehicle = errorWrapper(
  async (req: Request, res: Response) => {
    const vehicleInfo: Vehicle = req.body;

    const stsId = vehicleInfo.stsId;

    const sts = await prisma.sTS.findUnique({
      where: {
        id: stsId,
      },
    });

    if (!sts) {
      throw new CustomError("STS not found", 404);
    }

    const landfill = await prisma.landfill.findUnique({
      where: {
        id: vehicleInfo.landFillId,
      },
    });

    if (!landfill) {
      throw new CustomError("Landfill not found", 404);
    }

    const stsLocation = `${sts.latitude},${sts.longitude}`;

    const landfillLocation = `${landfill.latitude},${landfill.longitude}`;

    const duration = await getDuration(stsLocation, landfillLocation);
    const distance = await getDistance(stsLocation, landfillLocation);

    vehicleInfo.duration = new Prisma.Decimal(duration);
    vehicleInfo.distance = new Prisma.Decimal(distance);

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

    const sts = await prisma.sTS.findUnique({
      where: {
        id: vehicle.stsId,
      },
    });

    if (!sts) {
      throw new CustomError("STS not found", 404);
    }

    const landfill = await prisma.landfill.findUnique({
      where: {
        id: vehicle.landFillId,
      },
    });

    if (!landfill) {
      throw new CustomError("Landfill not found", 404);
    }

    const stsLocation = `${sts.latitude},${sts.longitude}`;

    const landfillLocation = `${landfill.latitude},${landfill.longitude}`;

    const duration = await getDuration(stsLocation, landfillLocation);

    const distance = await getDistance(stsLocation, landfillLocation);

    const updatedVehicle = await prisma.vehicle.update({
      where: {
        id: vehicleId,
      },
      data: {
        ...vehicleInfo,
        duration: new Prisma.Decimal(duration),
        distance: new Prisma.Decimal(distance),
      },
    });

    res.json(updatedVehicle);
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
