import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";

type EditPermisson = {
  role: string;
  permission: string;
  action: string;
};

export async function updatePermisson(payload: EditPermisson) {
  try {
    const token = getCookie(jwtToken);
    let response;
    payload.action === "ADD"
      ? (response = await axios.post(
          apiRoutes.rbac.edit +
            payload.role +
            "/permissions/" +
            payload.permission,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ))
      : (response = await axios.delete(
          apiRoutes.rbac.delete +
            payload.role +
            "/permissions/" +
            payload.permission,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ));

    //console.log(response.data);
    return "Permisson updated successfully!";
  } catch (error: any) {
    alert("Error updating permissons... Are you authorized?");
    console.log(error.message);
  }
}
