import { User } from "@/components/dataTables/UserList";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
import { STS } from "@/components/modals/EditSTSInfoModal";

export default async function editSTS(stsData: STS, managerId: string) {
  if (stsData && managerId) {
    try {
      const res1 = await axios.put(
        apiRoutes.user.edit + managerId,
        {          
          stsId: stsData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        }
      );
      const {manager, ...payload} = {...stsData};
      const res2 = await axios.put(
        apiRoutes.sts.edit + stsData.id,
        {
          ...payload,
        },
        {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        }
      );
      return "sts updated successfully";
    } catch (error: any) {
      return (
        error.message?.toString() ||
        "error updating sts. You may not have the required permissions."
      );
    }
  }

  return null;
}
