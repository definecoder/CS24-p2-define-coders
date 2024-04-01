
import { useState } from "react";
import axios from "axios";

import { apiRoutes } from "@/data/apiRoutes";


import { jwtToken } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";

type Vehicle = {
  tripId: string;
  weightOfWaste: string;
  shortage: string;
  vehicleNumber: string;
  stsName: string;
  vehicleType: string;
  distance: string;
  actualDuration: string;
  estimatedFuelCost: string;
  tripStartTime: string;
  tripEndTime: string;
  estimatedDuration: string;
  tripStatus: string;
  capacity: string;
};

export default function useVehicleTripCompleteList(data: { landFillId: string }) {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]); // Initialize with an empty array of Vehicle objects
  const [vehicleNumberList, setVehicleNumberList] = useState<string[]>([]);

  async function VehcileTripCompleteList() {
    try {

      let Id: string = data.landFillId;
      if(Id === ''){
        Id = 'landfillId';
      }

      const res = await axios.get(
        apiRoutes.landfill.getAllRecievedVechicleHistory + Id, {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      }
      );

      // Assuming the response data is an array of vehicles
      const AllVehicle: Vehicle[] = res.data.map((vehicle: any) => ({
        tripId: vehicle.id,
        weightOfWaste: `${vehicle.weightOfWaste} Tons`,
        shortage: vehicle.shortage,
        vehicleNumber: vehicle.vehicle.vehicleNumber,
        stsName: vehicle.sts.name,
        vehicleType: vehicle.vehicle.vehicleType,
        distance: `${vehicle.distance} km`,
        tripStartTime: vehicle.tripStartTime,
        estimatedDuration: `${vehicle.estimatedDuration} mins`,
        estimatedFuelCost: `${parseFloat(vehicle.estimatedFuelCost).toFixed(2)} tk`,
        actualDuration: `${parseFloat(vehicle.actualDuration).toFixed(2)} mins`,
        tripStatus: vehicle.tripStatus,
        capacity: vehicle.vehicle.capacity,
      }));

      setVehicleList(AllVehicle);

      return true;
    } catch (error: any) {
      message.error(error?.response?.data?.message?.toString() || "Error fetching vehicle list");
      return false;
    }
  }

  return { vehicleList, VehcileTripCompleteList };
}
