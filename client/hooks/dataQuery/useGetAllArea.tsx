"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { Contractor, admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";

export default function useGetAllArea() {
  const [areaData, setAreaData] = useState<Contractor[]>([]);

  async function fetchAllArea() {
    try {
      const res = await axios.get(apiRoutes.area.getAll,  {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      const areaList = res.data.map((area: any) => {
        return area?.stsId === getCookie("stsId") ? area : null;
      });
      await setAreaData(areaList);
      console.log(areaList);
    } catch (error: any) {
      message.error(error?.response?.data?.message + "Error fetching area data... Are you authorized?");      
    }
  }

  useEffect(() => {
    fetchAllArea();
  }, []);

  return {fetchAllArea, areaData};
}
