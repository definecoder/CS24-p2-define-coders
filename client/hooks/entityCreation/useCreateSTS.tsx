"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
export type STS = {
    name: string;
    wardNumber: string;
    capacity: number;
    latitude: number;
    longitude: number;
};

export default function useCreateSTS() {
//   const [stsData, setStsData] = useState<STS>();

  function isValid(stsData: STS) {
    
    return (
        stsData.name.length > 0 &&
        stsData.wardNumber.length > 0 &&
        stsData.capacity > 0 &&
        stsData.latitude !== null &&
        stsData.longitude !== null
    );
  }  

  async function createSTS(stsData: STS) {
    if (stsData && isValid(stsData)) {
      try {
        const res = await axios.post(apiRoutes.sts.create, stsData, {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        });
        return "STS Aadded successfully";
      } catch (error: any) {
        return error.message?.toString() || "Error creating STS";
      }
    }

    return null;
  }

  return { createSTS  };
}
