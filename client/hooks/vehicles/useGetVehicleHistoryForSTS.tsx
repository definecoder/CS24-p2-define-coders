import { useState } from 'react';
import axios from 'axios';
import { getCookie } from '@/lib/cookieFunctions';
import { stsId } from '@/data/cookieNames';
import { apiRoutes } from '@/data/apiRoutes';

type Vehicle = {
    vehicleNumber: string,
    exitTime: string,
    landFillName: string,    
  };

export default function useGetVehicleHistoryForSTS() {  
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]); // Initialize with an empty array of Vehicle objects  

  async function getVehicleHistory() {
    try {
      const stsID = getCookie(stsId);
      const res = await axios.get(apiRoutes.sts.vehicle.ongoing + stsID + "/get-left-vehicles");
      // Assuming the response data is an array of vehicles
      const AllVehicle: Vehicle[] = res.data.map((vehicle: any) => ({
        vehicleNumber: vehicle?.vehicle?.vehicleNumber,
        exitTime: vehicle?.exitTime,
        landFillName: vehicle?.vehicle?.landFill?.name,        
      }));      

     setVehicleList(AllVehicle);     
     
      return true;
    } catch (error: any) {
      alert(error.message?.toString() || "Error fetching vehicle list");
      return false;
    }
  }

  return { vehicleList, getVehicleHistory };
}