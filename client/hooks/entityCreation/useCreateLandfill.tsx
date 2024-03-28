"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
export type LandFill = {
    name: string;
    capacity: number;
    latitude: number;
    longitude: number;
};

export default function useCreateLandFill() {
//   const [landfillData, setlandfillData] = useState<STS>();

  function isValid(landfillData: LandFill) {
    
    return (
        landfillData.name.length > 0 &&        
        landfillData.capacity > 0 &&
        landfillData.latitude !== null &&
        landfillData.longitude !== null
    );
  }  

  async function createLandfill(landfillData: LandFill) {
    if (landfillData && isValid(landfillData)) {
      try {
        const res = await axios.post(apiRoutes.landfill.create, landfillData, {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        });
        window.location.reload();
        return "Landfill Aadded successfully";
      } catch (error: any) {
        return error.message?.toString() || "Error creating Landfill";
      }
    }

    return null;
  }

  return { createLandfill  };
}
