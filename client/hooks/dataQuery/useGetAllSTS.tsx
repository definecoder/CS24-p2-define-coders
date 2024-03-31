"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";

export type STS = {
    id: string;
    name: string;
    wardNumber: string;
    capacity: string;
    latitude: string;
    longitude: string;
    manager: string[];
  };

export default function useGetAllSTS() {
  const [stsData, setSTSData] = useState<STS[]>([]);

  async function fetchAllSTS() {
    try {
      const res = await axios.get(apiRoutes.sts.getAll, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      const stsList = res.data.map((sts: any) => {
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
      await setSTSData(stsList);
      console.log(stsList);
    } catch (error: any) {
      message.error(error?.response?.data?.message + "Error fetching sts data... Are you authorized?");      
    }
  }

  useEffect(() => {
    fetchAllSTS();
  }, []);

  return {fetchAllSTS, stsData};
}
