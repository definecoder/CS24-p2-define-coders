import { useState } from "react";
import axios from "axios";
import { uri } from "@/data/constant";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";
import { Trip } from "@/components/dataTables/PendingBillList";
import { Bill } from "@/components/dataTables/CompletedBillList";
import { message } from "antd";

export default function useGetAllCompletedBillList() {
  const [billList, setbillList] = useState<Bill[]>([]); // Initialize with an empty array of Vehicle objects  

  async function getbillList(landfillId: string) {
    try {

      var url = apiRoutes.bills.search + "?landFillId=" + landfillId;

      if(landfillId == "rootSecretKey") {
        url = apiRoutes.bills.getAll;
      }

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      });
      
      // Assuming the response data is an array of vehicles
      const allBills: Bill[] = res.data.map((bill: any) => ({
        id: bill.id,
        billNo: bill.billNo,
        stsName: bill.sts.name,
        landFillName: bill.landfill.name,
        vehicleNumber: bill.vehicle.vehicleNumber,
        vehicleType: bill.vehicle.vehicleType,
        weightOfWaste: bill.weightOfWaste,
        shortage: bill.trip.shortage,
        loadedFuelCostPerKm: bill.vehicle.loadedFuelCostPerKm,
        unloadedFuelCostPerKm: bill.vehicle.unloadedFuelCostPerKm,
        capacity: bill.vehicle.capacity,
        estimatedFuelCost: bill.trip.estimatedFuelCost,
        distance: bill.trip.distance,
        estimatedDuration: bill.trip.estimatedDuration,
        actualDuration: bill.trip.actualDuration,
        allocatedFuelCost: bill.allocatedFuelCost,
        tripId: bill.tripId,
      }));

      console.log(allBills);

      setbillList(allBills);      

      return true;
    } catch (error: any) {
      message.error(error?.response?.data.message?.toString() || "Error fetching pending bills list");
      return false;
    }
  }

  return { billList, getbillList };
}
