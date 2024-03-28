import { useState } from "react";
import axios from "axios";
import { uri } from "@/data/constant";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";
import { Trip } from "@/components/dataTables/PendingBillList";

export default function useGetAllPendingBillList() {
  const [tripList, setTripList] = useState<Trip[]>([]); // Initialize with an empty array of Vehicle objects  

  async function getTripList(landfillId: string) {
    try {
      const res = await axios.get(apiRoutes.trip.search + "?tripStatus=COMPLETED&landFillId=" + landfillId, {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      });
      // Assuming the response data is an array of vehicles
      const allTrips: Trip[] = res.data.map((trip: any) => ({
        id: trip.id,
        stsName: trip.sts.name,
        landFillName: trip.landfill.name,
        vehicleNumber: trip.vehicle.vehicleNumber,
        vehicleType: trip.vehicle.vehicleType,
        weightOfWaste: trip.weightOfWaste,
        shortage: trip.shortage,
        loadedFuelCostPerKm: trip.vehicle.loadedFuelCostPerKm,
        unloadedFuelCostPerKm: trip.vehicle.unloadedFuelCostPerKm,
        capacity: trip.vehicle.capacity,
        estimatedFuelCost: trip.estimatedFuelCost,
        distance: trip.distance,
        estimatedDuration: trip.estimatedDuration,
        actualDuration: trip.actualDuration
      }));

      console.log(allTrips);

      setTripList(allTrips);      

      return true;
    } catch (error: any) {
      alert(error.message?.toString() || "Error fetching pending bills list");
      return false;
    }
  }

  return { tripList, getTripList };
}
