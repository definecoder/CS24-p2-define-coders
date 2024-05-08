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
import { landfillId, stsId } from "@/data/cookieNames";
import useGetLandfillDatabyID from "@/hooks/landFillDashboard/getLandFillDataById";
import { getCookie } from "@/lib/cookieFunctions";
import useGetstsDatabyID from "@/hooks/StsDashboard/getStsDataById";
import STSVehicleHistoryList from "@/components/dataTables/STSVehicleHistoryList";
import { darkestColor } from "@/data/constant";

export default function STSManagerStorageData() {

  const { getstsDatabyID, stsData } = useGetstsDatabyID();

  useEffect(() => {
    getstsDatabyID(getCookie(stsId));
  }, []);

  useEffect(() => {
    
  }, [stsData]);

    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid lg:grid-cols-3 lg:grid-rows-8 grid-flow-row gap-4 w-full h-full">
          
        <div className="lg:row-span-3 min-h-36">
            <EmptyFillContainer className="flex justify-around md:justify-center md:gap-6 items-center max-h-min">
              <div className="text-center color-black flex flex-col items-center justify-center gap-5">
                {" "}
                <div>
                  <b> STORAGE STATUS OF </b>
                  <br />
                  <b>OF {stsData?.name?.toUpperCase()} </b>
                </div>
                <div>
                  {" "}
                  <b>{stsData?.graphData?.emptyPercentage}%</b> EMPTY
                  <br />
                  <b>{stsData?.graphData?.fullPercentage}%</b> FULL
                </div>
              </div>
              {stsData?.graphData?.empty !== undefined &&
              stsData?.graphData?.full !== undefined ? (
                <PieChart
                  // labels={["30% EMPTY", "70% FULL"]}
                  data={[
                    {
                      name:
                        stsData?.graphData?.emptyPercentage + "% EMPTY",
                      value: stsData?.graphData?.empty,
                      color: darkestColor + "80",
                    },
                    {
                      name: stsData?.graphData?.fullPercentage + "% FULL",
                      value: (stsData?.graphData?.full),
                      color: darkestColor,
                    },
                  ]}
                  withTooltip
                  // background={["rgb(121, 121, 121)", "rgb(0, 0, 0)"]}
                />
              ) : (
                "loading..."
              )}
            </EmptyFillContainer>
          </div>
          <div className="lg:row-span-3 min-h-36">
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
                series={[{ name: "totalWeight", color: darkestColor }]}
                curveType="linear"
                connectNulls
                color= {darkestColor}
              />
            </EmptyFillContainer>
          </div>
          <div className="lg:row-span-3 min-h-36">
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
                  darkestColor + "95",
                  darkestColor + "75",
                  darkestColor + "45",
                  darkestColor + "65",
                  darkestColor + "55",
                  darkestColor + "65",
                  darkestColor + "70",
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
          <div className="lg:col-span-3 lg:row-span-5 min-h-36">
            <EmptyFillContainer>
              <STSVehicleHistoryList />
            </EmptyFillContainer>
          </div>
          
        </div>
      </div>
      </main>
    );
  }