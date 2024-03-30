import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

import { Vehicle } from "../types/vehicle";
import {
  Client,
  DirectionsResponse,
  TravelMode,
} from "@googlemaps/google-maps-services-js";
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const prisma = new PrismaClient();

const getSortedVehicles = async () => {
  const vehicles: Vehicle[] = await prisma.$queryRaw`
    SELECT * FROM "Vehicle"
    ORDER BY ("loadedFuelCostPerKm" / "capacity") DESC
    `;

  vehicles.forEach((vehicle) => {
    vehicle.busyTime = 0;
    vehicle.count = 0;
  });

  return vehicles;
};

const getSortedSTSFromLandfill = async (landfillId: string) => {
  const landfill = await prisma.landfill.findUnique({
    where: {
      id: landfillId,
    },
  });

  const sts = await prisma.sTS.findMany({});

  const stsLocations = sts.map((stsObject) => {
    return `${stsObject.latitude},${stsObject.longitude}`;
  });

  const lat = landfill?.latitude;
  const lon = landfill?.longitude;

  const durations = await Promise.all(
    stsLocations.map(async (location) => {
      const duration = await getDuration(`${lat},${lon}`, location);
      return duration;
    })
  );

  const stsWithDurations = sts.map((stsObject, index) => {
    return {
      ...stsObject,
      duration: parseFloat(durations[index]),
      emergencyFactor:
        Number(stsObject.currentTotalWaste) / Number(durations[index]),
    };
  });

  const sorted = stsWithDurations.sort((a, b) => {
    return b.emergencyFactor - a.emergencyFactor;
  });

  return sorted;
};

const getDuration = async (origin: string, destination: string) => {
  const client = new Client({});
  const response: DirectionsResponse = await client.directions({
    params: {
      origin,
      destination,
      key: apiKey,
      mode: TravelMode.driving,
    },
  });

  const duration = response.data?.routes[0]?.legs[0]?.duration?.value;

  const durationInMinutes = (duration ? duration / 60 : 0).toFixed(2);

  return durationInMinutes;
};

export { getSortedVehicles, getSortedSTSFromLandfill, getDuration };
