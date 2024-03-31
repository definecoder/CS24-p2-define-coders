import { useState } from 'react';
import axios from 'axios';
import { uri } from '@/data/constant';
import { jwtToken,stsId } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";
import { apiRoutes } from '@/data/apiRoutes';
import { message } from 'antd';


interface StsEntryDataType {
    id: string;
    stsId: string;
    vehicleId: string;
    weightOfWaste: number | null;
    entryTime: string;
    exitTime: string | null;
    createdAt: string;
    updatedAt: string;
    sts: {
      id: string;
      name: string;
      wardNumber: string;
      capacity: string;
      currentTotalWaste: number | null;
      latitude: string;
      longitude: string;
      createdAt: string;
      updatedAt: string;
    };
    vehicle: {
      id: string;
      vehicleNumber: string;
      vehicleType: string;
      capacity: string;
      loadedFuelCostPerKm: string;
      unloadedFuelCostPerKm: string;
      landFillId: string | null;
      createdAt: string;
      updatedAt: string;
    };
  }


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

export default function useGetStsVehicles() {  
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]); // Initialize with an empty array of Vehicle objects

  async function getVehicleList() {
    try {
      const res = await axios.get(`${apiRoutes.sts.vehicle.current}/${getCookie(stsId)}/get-current-vehicles`, {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      });
     
      const StsVehicles = res.data.map((vehicle: StsEntryDataType) => vehicle.vehicle);

     //setVehicleList(AllVehicle);
     setVehicleList(StsVehicles);
     console.log(vehicleList);
     
      return true;
    } catch (error: any) {
      message.error(error?.response?.data?.message?.toString() || "Error fetching vehicle list");
      return false;
    }
  }

  return { vehicleList, useGetStsVehicles };
}
