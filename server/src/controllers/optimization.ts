import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

import {
  Client,
  DirectionsResponse,
  TravelMode,
} from "@googlemaps/google-maps-services-js";

const prisma = new PrismaClient();

const client = new Client({});

const getSortedVehicles = async () => {
  const vehicles = await prisma.$queryRaw`
    SELECT * FROM "Vehicle"
    ORDER BY ("loadedFuelCostPerKm" / "capacity") DESC
    `;
  return vehicles;
};

const getSortedSTSFromLandfill = async (landfillId: string) => {
  const landfill = await prisma.landfill.findUnique({
    where: {
      id: landfillId,
    },
  });

  const lat = 24.882116;
  const lon = 91.85636;
  const lat2 = 24.886767;
  const lon2 = 91.886949;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""; // Ensure apiKey is defined

  const response: DirectionsResponse = await client.directions({
    params: {
      origin: `${lat},${lon}`,
      destination: `${lat2},${lon2}`,
      key: apiKey,
      mode: TravelMode.driving,
    },
  });

  const duration = response.data?.routes[0]?.legs[0]?.duration?.value;

  const durationInMinutes = (duration ? duration / 60 : 0).toFixed(2);

  return durationInMinutes;
};

const getSchedule = async () => {
  //   const vehicles = await getSortedVehicles();

  //   console.log(vehicles);

  const duration = await getSortedSTSFromLandfill(
    "c4028362-6c17-4cf0-9b0e-ae20acfa2fbd"
  );

  console.log(duration);
};

getSchedule();
