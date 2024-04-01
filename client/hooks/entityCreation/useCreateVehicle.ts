"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
export type Vehicle = {
    vehicleNumber: string;
    vehicleType: string;
    capacity: number;
    loadedFuelCostPerKm: number;
    unloadedFuelCostPerKm: number;
    landFillId: string;
    stsId: string;
};

export default function useCreateVehicle() {
//   const [stsData, setStsData] = useState<STS>();

  function isValid(vehicleData: Vehicle) {
    
    return (
        vehicleData.vehicleNumber.length > 0 &&
        vehicleData.vehicleType.length > 0 &&
        vehicleData.capacity > 0 &&
        vehicleData.loadedFuelCostPerKm !== null &&
        vehicleData.unloadedFuelCostPerKm !== null &&
        vehicleData.landFillId.length > 0 &&
        vehicleData.stsId.length > 0
    );
  }  

  async function createVehicle(vehicleData: Vehicle) {
    // const {stsId, ...paylod} = vehicleData;
    if (vehicleData && isValid(vehicleData)) {
      try {
        const res = await axios.post(apiRoutes.vehicle.create, vehicleData, {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        });
        window.location.reload();
        return "Vehicle Aadded successfully";
      } catch (error: any) {
        message.error(error?.response?.data.message?.toString() || "Error creating Vehicle. Do you have permisson?.");
        return null;
      }
    }

    return null;
  }

  return { createVehicle  };
}
