import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

import pq from "js-priority-queue";

import { Vehicle } from "../types/vehicle";
import {
  getSortedSTSFromLandfill,
  getSortedVehicles,
} from "../services/optmization";

const prisma = new PrismaClient();

const getSchedule = async () => {
  const vehicles: Vehicle[] = await getSortedVehicles();

  //   console.log(vehicles);

  const stsList = await getSortedSTSFromLandfill(
    "c4028362-6c17-4cf0-9b0e-ae20acfa2fbd"
  );

  const queue = new pq({
    comparator: (a: Vehicle, b: Vehicle) => {
      if (a.busyTime && b.busyTime) {
        return a.busyTime - b.busyTime;
      }
      return 0; // Return a default value of 0 when a.busyTime or b.busyTime is undefined
    },
  });
  // enter all vehicles in the queue, with the priority being the emergency factor

  vehicles.forEach((vehicle: Vehicle) => {
    queue.queue(vehicle);
  });

  for (let i = 0; i < queue.length; i++) {
    console.log(queue.dequeue());
  }

  //   console.log(stsList);
};

getSchedule();
