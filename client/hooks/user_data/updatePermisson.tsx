import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios, { Axios, AxiosError } from "axios";

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
          apiRoutes.rbac.deletePermisson +
            payload.role +
            "/permissions/" +
            payload.permission,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ));
    
    return "Permisson updated successfully!";
  } catch (error: AxiosError | any) {
    message.error("Error updating permissons... Are you authorized?");    
    message.error(error?.response?.data.message?.toString() || "Error updating permissons");
  }
}
