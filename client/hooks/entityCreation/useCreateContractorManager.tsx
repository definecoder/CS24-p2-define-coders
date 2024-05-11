"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { Contractor, ContractorManager, admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";

export default function useCreateContractorManager() {
//   const [stsData, setStsData] = useState<STS>();

  function isValid(contractorData: ContractorManager) {
    
    return (
        contractorData.username.length > 0 &&
        contractorData.contactNumber.length > 0 &&
        contractorData.contractorId.length !== null        
    );
  }  

  async function createContractorManager(contractorManagerData: ContractorManager) {
    if (contractorManagerData && isValid(contractorManagerData)) {
      try {
        const res = await axios.post(apiRoutes.contractor.manager.create, contractorManagerData, {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        });
        window.location.reload();
        return "Contructor Manager Aadded successfully";
      } catch (error: any) {
        message.error(error.message?.toString() || "Error creating Contructor Manager");
        return null;
      }
    }

    return null;
  }

  return { createContractorManager  };
}
