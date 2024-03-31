import { User } from "@/components/dataTables/UserList";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
import { STS } from "@/components/modals/stsControl/EditSTSInfoModal";
import { Trip } from "@/components/dataTables/PendingBillList";
import { message } from "antd";


export default async function makeBill(tripData: Trip, allocatedCost: number) {
  if (tripData && allocatedCost) {
    try {
      const payload = {
        tripId: tripData.id,
        allocatedFuelCost: allocatedCost,
      };
      const res2 = await axios.post(
        apiRoutes.bills.makeBill,
        payload,
        {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        }
      );      
      return "bill created successfully";
    } catch (error: any) {
      message.error(
        error?.response?.data.message?.toString() ||
        "error making bill. You may not have the required permissions."
      );
      return null;
    }
  }

  return null;
}
