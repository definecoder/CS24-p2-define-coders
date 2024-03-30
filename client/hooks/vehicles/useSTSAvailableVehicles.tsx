import { useState } from "react";
import axios from "axios";
import { uri } from "@/data/constant";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";

type Vehicle = {
  entryId: string;
  id: string;
  vehicleNumber: string;
  vehicleType: string;
  capacity: string;
  loadedFuelCostPerKm: string;
  unloadedFuelCostPerKm: string;
  landFillId: string;
  entryTime: string;
  landFillName: string;
  stsLattitude: string;
  stsLongitude: string;
  landfillLattitude: string;
  landfillLongitude: string;
};

export default function useGetSTSAvailableVehicles() {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]); // Initialize with an empty array of Vehicle objects
  const [vehicleNumberList, setVehicleNumberList] = useState<string[]>([]);

  async function GetSTSAvailableVehicles() {
    try {
      const res = await axios.get(apiRoutes.vehicle.getAll, {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      });
      // Assuming the response data is an array of vehicles
      const AllVehicle: Vehicle[] = res.data.map((vehicle: any) => ({
        id: vehicle.id,
        vehicleNumber: vehicle.vehicleNumber,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity,
        loadedFuelCostPerKm: vehicle.loadedFuelCostPerKm,
        unloadedFuelCostPerKm: vehicle.unloadedFuelCostPerKm,
        landFillId: vehicle.landFillId,
        landFillName: vehicle.landFill.name,
      }));
      const vehicleNumbers = res.data.map(
        (vehicle: Vehicle) => vehicle.vehicleNumber
      );

      setVehicleList(AllVehicle);
      setVehicleNumberList(vehicleNumbers);

      return true;
    } catch (error: any) {
      alert(error.message?.toString() || "Error fetching vehicle list");
      return false;
    }
  }

  return { vehicleList, vehicleNumberList, GetSTSAvailableVehicles };
}
