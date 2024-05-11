"use client";
import { Button } from "@/components/ui/button";
import "@mantine/charts/styles.css";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { AllStsMapShow } from "@/components/maps/AllStsShow";
import useGetAllSTS from "@/hooks/stsdata/useGetAllSTS";
import { use, useEffect, useState } from "react";
import GoogleMapComponent from "@/components/maps/GoogleMap";
// import PieChart from "@/components/graphs/PieChart";
import BarChart from "@/components/graphs/BarChart";
import { AreaChart, PieChart } from "@mantine/charts";
import { landfillId } from "@/data/cookieNames";
import useGetLandfillDatabyID from "@/hooks/landFillDashboard/getLandFillDataById";
import { getCookie } from "@/lib/cookieFunctions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllArea from "@/hooks/dataQuery/useGetAllArea";
import { Input } from "@/components/ui/input";
import { DatePicker, message } from "antd";
import useGetAllRoutes from "@/hooks/dataQuery/useGetAllRoutes";
import useGetAllEmployees from "@/hooks/dataQuery/useGetAllEmployee";
import axios from "axios";
import { apiRoutes } from "@/data/apiRoutes";
import EmployeeLogs from "@/components/dataTables/EmployeeLogs";

export default function ContractManagerDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [finalState, setFinalState] = useState(false);
  const { areaData, fetchAllArea } = useGetAllArea();
  const { fetchAllRoutes, routesData } = useGetAllRoutes();
  const { fetchAllEmployees, employeeData } = useGetAllEmployees();
  const [planData, setPlanData] = useState<{
    areaId?: string;
    collectionStartTime?: string;
    durationForCollection?: number;
    numberOfLaborers?: number;
    numberOfVans?: number;
    expectedWaste?: number;
    assignments?: { routeId: string; employeeId: string }[];
  }>();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);

  useEffect(() => {
    fetchAllArea();
    fetchAllRoutes();
    fetchAllEmployees();
  }, []);
  useEffect(() => {
    console.log(areaData);
  }, [areaData]);
  useEffect(() => {
    console.log(routesData);
  }, [routesData]);
  useEffect(() => {
    console.log(employeeData);
  }, [employeeData]);
  useEffect(() => {
    console.log(selectedEmployees);
  }, [selectedEmployees]);
  useEffect(() => {
    console.log(selectedRoutes);
  }, [selectedRoutes]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid lg:grid-cols-7 lg:grid-rows-3 grid-flow-row gap-4 w-full h-full">
          <div className="lg:col-span-5 lg:row-span-3 min-h-36">
            <br /><br />          
          <EmployeeLogs />
          </div>
          <div className="lg:col-span-2 min-h-36">
            <EmptyFillContainer className="flex justify-around items-center">
              <div className="text-center color-black flex flex-col items-center justify-center">
                {" "}
                <div>
                  <b> YOUR TARGET </b>
                </div>
                <div>
                  <b> PROGRESS </b>{" "}
                </div>
                <div>
                  {" "}
                  <b>65%</b> DONE
                </div>
                <div>
                  {" "}
                  <b>35%</b> PENDING{" "}
                </div>
              </div>
              <PieChart
                // labels={["30% EMPTY", "70% FULL"]}
                data={[
                  { name: "65% DONE", value: 650, color: "#1A4D2E" },
                  { name: "35% PENDING", value: 350, color: "#4F6F52" + "80" },
                ]}
                withTooltip
                // background={["rgb(121, 121, 121)", "rgb(0, 0, 0)"]}
              />
            </EmptyFillContainer>
          </div>
          <div className="lg:col-span-2 min-h-36">
            <EmptyFillContainer className="flex flex-col justify-center gap-4 text-center font-bold">
              COLLECTION HISTORY (LAST 7 DAY)
              <AreaChart
                className="m-2 ml-[-10px]"
                h="70%"
                w="95%"
                data={[
                  {
                    date: "May 4",
                    totalWeight: 110,
                  },
                  {
                    date: "May 5",
                    totalWeight: 60,
                  },
                  {
                    date: "May 6",
                    totalWeight: 80,
                  },
                  {
                    date: "May 7",
                    totalWeight: null,
                  },
                  {
                    date: "May 8",
                    totalWeight: 90,
                  },
                  {
                    date: "May 9",
                    totalWeight: 40,
                  },
                  {
                    date: "May 10",
                    totalWeight: 110,
                  },
                  {
                    date: "May 11",
                    totalWeight: 80,
                  },
                ]}
                dataKey="date"
                series={[{ name: "totalWeight", color: "#1A4D2E" }]}
                curveType="linear"
                connectNulls
                color={"#1A4D2E"}
              />
            </EmptyFillContainer>
          </div>
          <div className="lg:col-span-2 min-h-36">
            <EmptyFillContainer className="flex flex-col justify-center items-center">
              <p className="text-xl font-bold">EMPLOYEE STATUS</p>
              <p className="pt-8 font-bold">
                <span className="text-5xl text-green-800">
                  12{" "}
                  <span className="text-3xl text-red-800 font-bold">/25</span>
                </span>{" "}
                AVAILABLE
              </p>
            </EmptyFillContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
