"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";

type LandFill = {
    id: string;
    name: string;  
    capacity: string;
    latitude: string;
    longitude: string;
    manager: string[];
  };

export default function useGetAllLandfill() {
  const [landFillData, setLandfillData] = useState<LandFill[]>([]);

  async function fetchAllLandfills() {
    try {
      const res = await axios.get(apiRoutes.landfill.getAll, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      const landfillList = res.data.map((sts: any) => {
        return {
          id: sts.id,
          name: sts.name,
          capacity: sts.capacity,
          latitude: sts.latitude,
          longitude: sts.longitude,
          manager: sts.manager.map((manager: any) => manager.username),
        };
      });
      await setLandfillData(landfillList);
      console.log(landfillList);
    } catch (error: any) {
      message.error(error?.response?.data?.message + "Error fetching sts data... Are you authorized?");      
    }
  }

  useEffect(() => {
    fetchAllLandfills();
  }, []);

  return {fetchAllLandfills, landFillData};
}
