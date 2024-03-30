import { useState } from "react";
import axios from "axios";
import { uri } from "@/data/constant";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken, stsId } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";

type Vehicle = {
 
  id: string;
  vehicleNumber: string;
  vehicleType: string;
  capacity: string;
  currentLatitude: string,
  currentLongitude: string,
  landFillId: string;
  stsId: string;
 
};

export default function useGetSTSAvailableVehicles() {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]); // Initialize with an empty array of Vehicle objects
  const [vehicleNumberList, setVehicleNumberList] = useState<string[]>([]);

  async function GetSTSAvailableVehicles() {
    try {
      const res = await axios.get(`${apiRoutes.sts.vehicle.current}/${getCookie(stsId)}/get-available-vehicles`, {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      });
      // Assuming the response data is an array of vehicles
      const AllVehicle: Vehicle[] = res.data.map((vehicle: any) => ({
        id: vehicle.id,
        vehicleNumber: vehicle.vehicleNumber,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity,
        landFillId: vehicle.landFillId,
        stsId: vehicle.stsId,
        currentLatitude: vehicle.currentLatitude,
        currentLongitude: vehicle.currentLongitude
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
