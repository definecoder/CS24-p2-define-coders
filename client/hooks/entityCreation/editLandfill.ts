import { User } from "@/components/dataTables/UserList";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
import { STS } from "@/components/modals/stsControl/EditSTSInfoModal";
import { LandFill } from "@/components/dataTables/LandFillList";
import { message } from "antd";

export default async function editLandfill(landfillData: LandFill, managerId: string) {
  if (landfillData && managerId) {
    try {
      const res1 = await axios.put(
        apiRoutes.user.edit + managerId,
        {          
            landfillId: landfillData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        }
      );
      const {manager, ...payload} = {...landfillData};
      const res2 = await axios.put(
        apiRoutes.landfill.edit + landfillData.id,
        {
          ...payload,
        },
        {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        }
      );
      return "landfill updated successfully";
    } catch (error: any) {
      message.error(
        error.message?.toString() ||
        "error updating landfill. You may not have the required permissions."
      );
      return null;
    }
  }

  return null;
}
