"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios, { AxiosError } from "axios";

export default async function deleteVehicleEntryFromSTS(entryId: string) {
  if (entryId) {
    try {
      const res = await axios.delete(apiRoutes.sts.vehicle.delete + entryId, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      window.location.reload();
      return "vehicle removed successfully";
    } catch (error: AxiosError | any) {
      return error?.response?.data.message?.toString() || "error removing vehicle";
    }
  }

  return null;
}
