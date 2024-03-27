import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";

export default async function deleteLandFill(landFillId: string) {
  if (landFillId) {
    try {
      const res = await axios.delete(apiRoutes.landfill.delete + landFillId, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      return "landfills deleted successfully";
    } catch (error: any) {
      return error.message?.toString() || "error deleteing landfill";
    }
  }

  return null;
}
