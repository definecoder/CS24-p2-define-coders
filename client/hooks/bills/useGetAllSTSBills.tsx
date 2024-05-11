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

export default function useGetAllSTSBills() {
  const [billList, setbillList] = useState<Bill[]>([]); // Initialize with an empty array of Vehicle objects  

  async function getbillList(landfillId: string) {
    try {

      let url = apiRoutes.sts.getAllBills;      

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      });

      //message.success("Bills list fetched successfully");
      
      // Assuming the response data is an array of vehicles
      const allBills: any = res.data.map((bill: any) => ({
        contractorName: bill.contractor.name,
        weightRequired: bill.weightRequired,
        weightCollected: bill.weightCollected,
        paymentAmount: bill.paymentAmount,
        fine: bill.fine,
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
