"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";
import { set } from "react-hook-form";

type sts = {
  id: string;
  name: string;
  wardNumber: string;
  capacity: number;
  currentTotalWaste: number;
  latitude: string;
  longitude: string;
  graphData: {
    empty: number;
    full: number;
    emptyPercentage: number;
    fullPercentage: number;
  };
};

export default function useGetstsDatabyID() {
  const [stsData, setStsData] = useState<sts | null>(null);

  async function getstsDatabyID(stsId: string) {
    try {
      const res = await axios.get(apiRoutes.sts.getById + stsId, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      setStsData({
        id: res.data.sts.id,
        name: res.data.sts.name,
        wardNumber: res.data.sts.wardNumber,
        capacity: parseFloat(res.data.sts.capacity),
        currentTotalWaste: parseFloat(res.data.sts.currentTotalWaste),
        latitude: res.data.sts.latitude,
        longitude: res.data.sts.longitude,
        graphData: {
          empty: res.data.graphData.empty,
          full: res.data.graphData.full,
          emptyPercentage: res.data.graphData.emptyPercentage,
          fullPercentage: res.data.graphData.fullPercentage,
        },        
      });
      console.log(stsData);
      return stsData;
    } catch (error: any) {
      message.error(error?.response?.data?.message + "Error fetching sts data... Are you authorized?");      
    }
  }

  return { stsData, getstsDatabyID };
}
