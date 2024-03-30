"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
import { useState, useEffect, use } from "react";
import { set } from "react-hook-form";

type LandFill = {
  id: string;
  name: string;
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

export default function useGetLandfillDatabyID() {
  const [landfillData, setLandfillData] = useState<LandFill | null>(null);

  async function getLandfillDatabyID(landfillId: string) {
    try {
      const res = await axios.get(apiRoutes.landfill.getbyId + landfillId, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      setLandfillData({
        id: res.data.landfill.id,
        name: res.data.landfill.name,
        capacity: parseFloat(res.data.landfill.capacity),
        currentTotalWaste: parseFloat(res.data.landfill.currentTotalWaste),
        latitude: res.data.landfill.latitude,
        longitude: res.data.landfill.longitude,
        graphData: {
          empty: res.data.graphData.empty,
          full: res.data.graphData.full,
          emptyPercentage: res.data.graphData.emptyPercentage,
          fullPercentage: res.data.graphData.fullPercentage,
        },
      });
      console.log(landfillData);
      return landfillData;
    } catch (error: any) {
      alert("Error fetching landfill data... Are you authorized?");
      console.log(error.message);
    }
  }

  return { landfillData, getLandfillDatabyID };
}
