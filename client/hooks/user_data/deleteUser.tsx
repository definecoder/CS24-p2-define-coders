"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";

export default async function deleteUser(userId: string) {
  if (userId) {
    try {
      const res = await axios.delete(apiRoutes.user.delete + userId, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      return "user deleted successfully";
    } catch (error: any) {
      return error.message?.toString() || "error deleteing user";
    }
  }

  return null;
}
