import { useState } from "react";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { setCookie, getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
import { jwtToken, role, uid, username, stsId } from "@/data/cookieNames";
import { uri } from "@/data/constant";
import { apiRoutes } from "@/data/apiRoutes";

export default function useVehicleReleaseFromSTS() {
  async function VehicleReleaseFromSTS(data: {
    stsVehicleId: string;
    weightOfWaste: string;
    exitTime: string;
    distance: string;
    estimatedDuration: string;
  }) {
    const userStsId = getCookie(stsId);
    // console.log(stsId);

    try {
      const isoString = new Date(data.exitTime).toISOString();

      const distanceWithoutUnit = parseFloat(data.distance.replace(" km", ""));

      const durationWithoutUnit = parseFloat(
        data.estimatedDuration.replace("mins", "")
      );

      console.log({
        stsVehicleId: data.stsVehicleId,
        weightOfWaste: data.weightOfWaste,
        exitTime: isoString,
        distance: distanceWithoutUnit,
        estimatedDuration: durationWithoutUnit,
      });

      const res = await axios.post(
        apiRoutes.trip.create,
        {
          stsVehicleId: data.stsVehicleId,
          weightOfWaste: data.weightOfWaste,
          exitTime: isoString,
          distance: distanceWithoutUnit,
          estimatedDuration: durationWithoutUnit,
        },
        {
          headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
        }
      );
      //use the response from here
      //console.log(res.data);
      window.location.reload();

      return true;
      return "Vehicle Released Successfully";
    } catch (error: any) {
      alert(error.message?.toString() || "error logging in");
      return false;
    }
  }

  return { VehicleReleaseFromSTS };
}
