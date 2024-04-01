import { useState } from "react";
import axios from "axios";
import { uri } from "@/data/constant";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken, role } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";
import { Trip } from "@/components/dataTables/PendingBillList";
import { Bill } from "@/components/dataTables/CompletedBillList";
import { message } from "antd";
import { admin } from "@/data/roles";

export default function useGetAllCompletedBillList() {
  const [billList, setbillList] = useState<Bill[]>([]); // Initialize with an empty array of Vehicle objects  

  async function getbillList(landfillId: string) {
    try {

      let url = apiRoutes.bills.search + "?landFillId=" + landfillId;

      if(getCookie(role) === admin){
        url = apiRoutes.bills.getAll;
      }

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      });

      //message.success("Bills list fetched successfully");
      
      // Assuming the response data is an array of vehicles
      const allBills: Bill[] = res.data.map((bill: any) => ({
        id: bill.id ?? 'N/A',
        billNo: bill.billNo ?? 'N/A',
        stsName: bill.sts?.name ?? 'N/A',
        landFillName: bill.landfill?.name ?? 'N/A',
        vehicleNumber: bill.vehicle?.vehicleNumber ?? 'N/A',
        vehicleType: bill.vehicle?.vehicleType ?? 'N/A',
        weightOfWaste: bill.weightOfWaste ?? 'N/A',
        shortage: bill.trip?.shortage ?? 'N/A',
        loadedFuelCostPerKm: bill.vehicle?.loadedFuelCostPerKm ?? 'N/A',
        unloadedFuelCostPerKm: bill.vehicle?.unloadedFuelCostPerKm ?? 'N/A',
        capacity: bill.vehicle?.capacity ?? 'N/A',
        estimatedFuelCost: bill.trip?.estimatedFuelCost ?? 'N/A',
        distance: bill.trip?.distance ?? 'N/A',
        estimatedDuration: bill.trip?.estimatedDuration ?? 'N/A',
        actualDuration: bill.trip?.actualDuration ?? 'N/A',
        allocatedFuelCost: bill.allocatedFuelCost ?? 'N/A',
        tripId: bill.tripId ?? 'N/A',
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
