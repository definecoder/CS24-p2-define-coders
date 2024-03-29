import { useState } from 'react';
import axios from 'axios';
import { uri } from '@/data/constant';
import { apiRoutes } from '@/data/apiRoutes';

type Vehicle = {
  tripId: string,
  weightOfWaste: string,
  vehicleNumber: string,
  stsId: string,
  vehicleType: string,
  distance: string,
  tripStartTime: string,
  estimatedDuration: string
  tripStatus: string
  capacity: string,
  
};

export default function useUpcomingVehicle() {  
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]); // Initialize with an empty array of Vehicle objects
  const [vehicleNumberList, setVehicleNumberList] = useState<string[]>([]); 

  async function UpcomingVehicle(landFillId: string) {
    try {
      const res = await axios.get(apiRoutes.landfill.getAllIncomingVehicles + landFillId);
      // Assuming the response data is an array of vehicles
      const AllVehicle: Vehicle[] = res.data.map((vehicle: any) => ({
        tripId: vehicle.id,
  weightOfWaste: `${vehicle.weightOfWaste} tons`,
  vehicleNumber: vehicle.vehicle.vehicleNumber,
  stsId: vehicle.sts.name,
  vehicleType: vehicle.vehicle.vehicleType,
  distance: `${vehicle.distance} km`,
  tripStartTime: vehicle.tripStartTime,
  estimatedDuration: `${vehicle.estimatedDuration} mins`,
  tripStatus: vehicle.tripStatus,
  capacity: vehicle.vehicle.capacity
      }));
     

     setVehicleList(AllVehicle);
     
     
      return true;
    } catch (error: any) {
      alert(error.message?.toString() || "Error fetching vehicle list");
      return false;
    }
  }

  return { vehicleList, UpcomingVehicle };
}
