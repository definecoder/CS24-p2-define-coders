"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { Contractor, admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";

export default function useGetAllContractor() {
  const [contractorData, setContractorData] = useState<Contractor[]>([]);

  async function fetchAllContractors() {
    try {
      const res = await axios.get(apiRoutes.contractor.getAll, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      const contractorList = res.data.map((contractor: any) => {
        return {...contractor, assignedSTS: contractor.assignedSTS.name || "Not Assigned"};
      });
      await setContractorData(contractorList);
      console.log(contractorList);
    } catch (error: any) {
      message.error(error?.response?.data?.message + "Error fetching contractor data... Are you authorized?");      
    }
  }

  useEffect(() => {
    fetchAllContractors();
  }, []);

  return {fetchAllContractors, contractorData};
}
