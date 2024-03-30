import { User } from "@/components/dataTables/UserList";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
import { STS } from "@/components/modals/stsControl/EditSTSInfoModal";

type Vehicle = {
  id: string;
  vehicleNumber: string;
  vehicleType: string;
  capacity: string;
  loadedFuelCostPerKm: string;
  unloadedFuelCostPerKm: string;
  landFillId: string;
  landFillName: string;
  stsId: string;
};

export default async function editVehicle(vehicleData: Vehicle) {
  if (vehicleData) {
    try {
      const payload = {
        vehicleNumber: vehicleData.vehicleNumber,
        vehicleType: vehicleData.vehicleType,
        capacity: vehicleData.capacity,
        loadedFuelCostPerKm: vehicleData.loadedFuelCostPerKm,
        unloadedFuelCostPerKm: vehicleData.unloadedFuelCostPerKm,
        landFillId: vehicleData.landFillId,
        stsId: vehicleData.stsId,
      };
      const res2 = await axios.put(
        apiRoutes.vehicle.edit + vehicleData.id,
        payload,
        {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        }
      );
      return "vehicle updated successfully";
    } catch (error: any) {
      return (
        error.message?.toString() ||
        "error updating vehicle. You may not have the required permissions."
      );
    }
  }

  return null;
}
