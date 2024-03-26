import { PrismaClient, Trip } from "@prisma/client";
import CustomError from "./CustomError";

const prisma = new PrismaClient();

const addTrip = async (tripInfo: Trip) => {
  const trip = await prisma.trip.create({
    data: tripInfo,
  });

  return trip;
};

const getAllTrips = async () => {
  const trips = await prisma.trip.findMany({});
  return trips;
};

const getTripById = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  return trip;
};

const updateTrip = async (tripId: string, tripInfo: Trip) => {
  const tripExists = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!tripExists) {
    throw new CustomError("Trip not found", 404);
  }

  const trip = await prisma.trip.update({
    where: {
      id: tripId,
    },
    data: tripInfo,
  });

  return trip;
};

const deleteTrip = async (tripId: string) => {
  const tripExists = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!tripExists) {
    throw new CustomError("Trip not found", 404);
  }

  await prisma.trip.delete({
    where: {
      id: tripId,
    },
  });

  return tripExists;
};

export { addTrip, getAllTrips, getTripById, updateTrip, deleteTrip };
