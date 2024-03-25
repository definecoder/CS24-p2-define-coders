import { LandfillVehicleEntry, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";

const prisma = new PrismaClient();

const addVehicleEntry = errorWrapper(async (req: Request, res: Response) => {
  const vehicleEntry: LandfillVehicleEntry = req.body;

  const vehicle = await prisma.landfillVehicleEntry.create({
    data: vehicleEntry,
    include: {
      vehicle: true,
      landfill: true,
    },
  });
  res.status(201).json(vehicle);
});

export { addVehicleEntry };
