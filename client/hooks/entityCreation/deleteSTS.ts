import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";

export default async function deleteSTS(stsId: string) {
  if (stsId) {
    try {
      const res = await axios.delete(apiRoutes.sts.delete + stsId, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      return "sts deleted successfully";
    } catch (error: any) {
      message.error(error?.response?.data.message?.toString() || "error deleteing sts");
      return null;
    }
  }

  return null;
}
