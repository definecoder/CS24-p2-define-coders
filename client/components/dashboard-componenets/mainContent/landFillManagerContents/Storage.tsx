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

export default function LandfillManagerStorageData() {
  const { getAllSTS, stsCoordinate, storagePercentage } = useGetAllSTS();
  const { getLandfillDatabyID, landfillData } =  useGetLandfillDatabyID();
  

  useEffect(() => {
    getAllSTS();
    getLandfillDatabyID(getCookie(landfillId))
  }, []);

  useEffect(() => {    
  }, [landfillData]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid lg:grid-cols-7 lg:grid-rows-3 grid-flow-row gap-4 w-full h-full">
          <div className="lg:col-span-5 lg:row-span-3 min-h-36">
            <EmptyFillContainer>
              <GoogleMapComponent
                coordinates={stsCoordinate}
                dumpFills={storagePercentage}
              />
            </EmptyFillContainer>
          </div>
          <div className="lg:col-span-2 min-h-36">
            <EmptyFillContainer className="flex justify-around items-center">
              <div className="text-center color-black flex flex-col items-center justify-center">
                {" "}
                <div><b> STORAGE STATUS OF </b></div>
                <div><b> OF {(landfillData?.name)?.toUpperCase()} </b>{" "}</div>
                <div>
                  {" "}
                  <b>{landfillData?.graphData?.emptyPercentage}%</b> EMPTY
                </div>
                <div>
                  {" "}
                  <b>{landfillData?.graphData?.fullPercentage}%</b> FULL{" "}
                </div>
              </div>
              {(landfillData?.graphData?.empty !== undefined && landfillData?.graphData?.full !== undefined) ? <PieChart
                // labels={["30% EMPTY", "70% FULL"]}
                data={[
                  { name: (landfillData?.graphData?.emptyPercentage + "% EMPTY"), value: (landfillData?.graphData?.empty), color: "#4F6F52" + "80"},
                  { name: (landfillData?.graphData?.fullPercentage + "% FULL") , value: (landfillData?.graphData?.full) , color: "#1A4D2E" },
                ]}
                withTooltip
                // background={["rgb(121, 121, 121)", "rgb(0, 0, 0)"]}
              /> : "loading..."}
            </EmptyFillContainer>
          </div>
          <div className="lg:col-span-2 min-h-36">
            <EmptyFillContainer className="flex flex-col justify-center gap-4 text-center font-bold">
              TOTAL WEIGHT HISTOTY
              <AreaChart
                className="m-2 ml-[-10px]"
                h="70%"
                w="95%"
                data={[
                  {
                    date: "Mar 22",
                    totalWeight: 110,
                  },
                  {
                    date: "Mar 23",
                    totalWeight: 60,
                  },
                  {
                    date: "Mar 24",
                    totalWeight: 80,
                  },
                  {
                    date: "Mar 25",
                    totalWeight: null,
                  },
                  {
                    date: "Mar 26",
                    totalWeight: 90,
                  },
                  {
                    date: "Mar 27",
                    totalWeight: 40,
                  },
                  {
                    date: "Mar 28",
                    totalWeight: 110,
                  },
                  {
                    date: "Mar 29",
                    totalWeight: 80,
                  },
                ]}
                dataKey="date"
                series={[{ name: "totalWeight", color: "#1A4D2E"}]}
                curveType="linear"
                connectNulls
                color= {"#1A4D2E"}
              />
            </EmptyFillContainer>
          </div>
          <div className="lg:col-span-2 min-h-36">
            <EmptyFillContainer className="flex flex-col justify-center items-center">
              WEEKLY INCOMING WASTE HISTORY
              <BarChart
                label="Waste amount in tons"
                labels={[
                  "25/3",
                  "26/3",
                  "27/3",
                  "28/3",
                  "29/3",
                  "30/3",
                  "31/3",
                ]}
                data={[90, 65, 45, 85, 50, 80, 85]}
                backgroundColor={[
                  "#1A4D2E" + "95",
                  "#1A4D2E" + "75",
                  "#1A4D2E" + "45",
                  "#1A4D2E" + "65",
                  "#1A4D2E" + "55",
                  "#1A4D2E" + "65",
                  "#1A4D2E" + "70",
                ]}
                borderColor={[
                  "rgb(0, 0, 0)",
                  "rgb(0, 0, 0)",
                  "rgb(0, 0, 0)",
                  "rgb(0, 0, 0)",
                  "rgb(0, 0, 0)",
                  "rgb(0, 0, 0)",
                  "rgb(0, 0, 0)",
                ]}
              />
            </EmptyFillContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
