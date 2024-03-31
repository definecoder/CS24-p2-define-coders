import { useState } from 'react';
import axios from 'axios';
import { uri } from '@/data/constant';
import { jwtToken, stsId } from '@/data/cookieNames';
import { setCookie, getCookie } from '@/lib/cookieFunctions';
import { apiRoutes } from '@/data/apiRoutes';
import { message } from 'antd';
type Vehicle = {
  id: string;
  vehicleNumber: string;
  vehicleType: string;
  capacity: number;
  loadedFuelCostPerKm: number;
  unloadedFuelCostPerKm: number;
  landFillId: string;
  createdAt: string;
  updatedAt: string;
};

export default function useVehicleList() {  
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]); // Initialize with an empty array of Vehicle objects
  const [vehicleNumberList, setVehicleNumberList] = useState<string[]>([]); 

  async function getVehicleList() {
    try {
      const res = await axios.get(apiRoutes.vehicle.getAll ,
      {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      }
      );
      // Assuming the response data is an array of vehicles
      const AllVehicle: Vehicle[] = res.data.map((vehicle: any) => ({
        id: vehicle.id,
        vehicleNumber: vehicle.vehicleNumber,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity,
        loadedFuelCostPerKm: vehicle.loadedFuelCostPerKm,
        unloadedFuelCostPerKm: vehicle.unloadedFuelCostPerKm,
        landFillId: vehicle.landFillId,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt
      }));
      const vehicleNumbers = res.data.map((vehicle: Vehicle) => vehicle.vehicleNumber);

     setVehicleList(AllVehicle);
     setVehicleNumberList(vehicleNumbers);
     
      return true;
    } catch (error: any) {
      message.error(error?.response?.data?.message?.toString() || "Error fetching vehicle list");
      return false;
    }
  }

  return { vehicleList, vehicleNumberList, getVehicleList };
}
