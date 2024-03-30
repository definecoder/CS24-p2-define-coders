import { User } from "@/components/dataTables/UserList";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
import { STS } from "@/components/modals/stsControl/EditSTSInfoModal";
import { Trip } from "@/components/dataTables/PendingBillList";


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
      console.log(res2.data);
      return "bill created successfully";
    } catch (error: any) {
      return (
        error.message?.toString() ||
        "error making bill. You may not have the required permissions."
      );
    }
  }

  return null;
}
