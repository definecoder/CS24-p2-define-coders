"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import {
  Contractor,
  admin,
  landfillManager,
  stsManager,
  unassigned,
} from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";

export default function useGetAllRoutes() {
  const [routesData, setRoutesData] = useState<
    {
      id: string;
      name: string;
      description: string;
      areaId: string;
      stsId: string;
      areaName: string;
    }[]
  >([]);

  async function fetchAllRoutes() {
    try {
      const res = await axios.get(apiRoutes.route.getAll, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      const routesList = res.data.map((route: any) => {
        return {
          id: route?.id,
          name: route?.name || "No Name",
          areaName: route?.area?.name || "No Area",
          description: route?.description || "No Description",
      };
      });
      await setRoutesData(routesList);
      console.log(routesList);
    } catch (error: any) {
      message.error(
        error?.response?.data?.message +
          "Error fetching routes data... Are you authorized?"
      );
    }
  }

  useEffect(() => {
    fetchAllRoutes();
  }, []);

  return { fetchAllRoutes, routesData };
}
