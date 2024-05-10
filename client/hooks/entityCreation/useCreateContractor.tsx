"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { Contractor, admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";

export default function useCreateContractor() {
//   const [stsData, setStsData] = useState<STS>();

  function isValid(contractorData: Contractor) {
    
    return (
        contractorData.name.length > 0 &&
        contractorData.contactNumber.length > 0 &&
        contractorData.contactNumber.length > 0 &&
        contractorData.tinNumber.length !== null        
    );
  }  

  async function createContractor(contractorData: Contractor) {
    if (contractorData && isValid(contractorData)) {
      try {
        const res = await axios.post(apiRoutes.contractor.create, contractorData, {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        });
        window.location.reload();
        return "Contructor Aadded successfully";
      } catch (error: any) {
        message.error(error.message?.toString() || "Error creating Contructor");
        return null;
      }
    }

    return null;
  }

  return { createContractor  };
}
