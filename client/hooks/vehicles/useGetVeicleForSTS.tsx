import { useState } from 'react';
import axios from 'axios';
import { uri } from '@/data/constant';
import { jwtToken } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";

type Vehicle = {
  entryId: string,
  id: string,
  vehicleNumber: string,
  vehicleType: string,
  capacity: string,
  loadedFuelCostPerKm: string,
  unloadedFuelCostPerKm: string,
  landFillId: string,
  entryTime: string,
  landFillName: string,    
  stsLattitude: string,
  stsLongitude: string,
  landfillLattitude: string,
  landfillLongitude: string,
};

export default function useVehicleListForSTS() {  
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]); // Initialize with an empty array of Vehicle objects
  const [vehicleNumberList, setVehicleNumberList] = useState<string[]>([]); 

  async function getVehicleList() {
    try {
      //'http://localhost:8585/sts-entry/sts1/get-current-vehicles'
      const res = await axios.get('http://localhost:8585/sts-entry/sts1/get-current-vehicles', {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      });
      // Assuming the response data is an array of vehicles
      const AllVehicle: Vehicle[] = res.data.map((vehicle: any) => ({
        entryId: vehicle.id,
        id: vehicle.vehicleId,
        vehicleNumber: vehicle.vehicle.vehicleNumber,
        vehicleType: vehicle.vehicle.vehicleType,
        capacity: vehicle.vehicle.capacity,
        loadedFuelCostPerKm: vehicle.vehicle.loadedFuelCostPerKm,
        unloadedFuelCostPerKm: vehicle.vehicle.unloadedFuelCostPerKm,
        landFillId: vehicle.landFillId,
        entryTime: vehicle.entryTime,
        landFillName: vehicle.vehicle.landFill.name,    
        stsLattitude: vehicle.sts.latitude,
        stsLongitude: vehicle.sts.longitude,
        landfillLattitude: vehicle.vehicle.landFill.latitude,
        landfillLongitude: vehicle.vehicle.landFill.longitude,
      }));
      const vehicleNumbers = res.data.map((vehicle: Vehicle) => vehicle.vehicleNumber);

     setVehicleList(AllVehicle);
     setVehicleNumberList(vehicleNumbers);
     
      return true;
    } catch (error: any) {
      alert(error.message?.toString() || "Error fetching vehicle list");
      return false;
    }
  }

  return { vehicleList, vehicleNumberList, getVehicleList };
}
