"use client";
import { ContractorLog } from "@/components/dataTables/ContractorLogs";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { Contractor, admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";

export default function useGetAllLogs() {
  const [contractorLog, setContractorLog] = useState<ContractorLog[]>([]);

  async function fetchAllContractorLog() {
    try {
      const res = await axios.get(apiRoutes.contractor.getAll, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      const logList = res.data.map((sts: any) => {
        return {
          id: sts.id,
          name: sts.name,
          wardNumber: sts.wardNumber,
          capacity: sts.capacity,
          latitude: sts.latitude,
          longitude: sts.longitude,
          manager: sts.manager.map((manager: any) => manager.username),
        };
      });
      await setContractorLog(logList);
      console.log(logList);
    } catch (error: any) {
      message.error(error?.response?.data?.message + "Error fetching contractor log... Are you authorized?");      
    }
  }

  useEffect(() => {
    fetchAllContractorLog();
  }, []);

  return {fetchAllContractorLog, contractorLog};
}
