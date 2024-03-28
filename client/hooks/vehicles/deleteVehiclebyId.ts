"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";

export default async function deleteVehiclebyId(id: string) {
  if (id) {
    try {
      const res = await axios.delete(apiRoutes.vehicle.delete + id, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      return "vehicle removed successfully";
    } catch (error: any) {
      return error.message?.toString() || "error removing vehicle";
    }
  }

  return null;
}
