"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { Contractor, ContractorManager, admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";

export default function useAddNewEmployee() {
//   const [stsData, setStsData] = useState<STS>();

  function isValid(employeeData: any) {
    
    return (
        employeeData.username.length > 0 &&
        employeeData.contactNumber.length > 0 &&
        employeeData.contractorId.length !== null        
    );
  }  

  async function createEmployee(employeeData: ContractorManager) {
    if (employeeData && isValid(employeeData)) {
      try {
        const res = await axios.post(apiRoutes.employee.create, employeeData, {
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

  return { createEmployee  };
}
