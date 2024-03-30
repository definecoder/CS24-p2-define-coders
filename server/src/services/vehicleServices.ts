import { PrismaClient, Vehicle } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "./CustomError";

const prisma = new PrismaClient();

const addVehicle = async (vehicleInfo: Vehicle) => {
  const vehicle = await prisma.vehicle.create({
    data: vehicleInfo,
  });
  return vehicle;
};

const getAllVehicles = async () => {
  const vehicles = await prisma.vehicle.findMany({
    include: {
      landFill: true,
    },
  });
  return vehicles;
};

const getVehicleById = async (vehicleId: string) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
  });
  return vehicle;
};

const updateVehicle = async (vehicleId: string, vehicleInfo: Vehicle) => {
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

  return vehicle;
};

const deleteVehicle = async (vehicleId: string) => {
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

  return;
};

export {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
