"use  client" 
import { Button } from "@/components/ui/button";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { Cog, Download, Send, Upload, UserRoundCog } from "lucide-react";
import LanfFillUpcomingVehiclesInDashboard from "../../../dataTables/LandFillUpcomingVehicleInDashboard";
import PendingBillList from "@/components/dataTables/PendingBillList";
import { landfillId } from "@/data/cookieNames";
import useGetLandfillDatabyID from "@/hooks/landFillDashboard/getLandFillDataById";
import { getCookie } from "@/lib/cookieFunctions";
import { useEffect } from "react";
import { AreaChart, PieChart } from "@mantine/charts";

export default function LandfillManagerDashboard() {

  const { getLandfillDatabyID, landfillData } =  useGetLandfillDatabyID();
  

  useEffect(() => {    
    getLandfillDatabyID(getCookie(landfillId))
  }, []);

  useEffect(() => {
    // alert(JSON.stringify(landfillData))
  }, [landfillData]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">      
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-flow-row gap-4 md:grid-cols-8 grid-cols-1 w-full h-full">
          <div className="md:col-span-2 min-h-36">
          <EmptyFillContainer className="flex md:flex-col justify-around md:justify-center md:gap-6 items-center max-h-min">
              <div className="text-center color-black flex flex-col items-center justify-center gap-5">
                {" "}
                <div><b> STORAGE STATUS OF </b><br /><b>OF {(landfillData?.name)?.toUpperCase()} </b></div>                
                <div>
                  {" "}
                  <b>{landfillData?.graphData?.emptyPercentage}%</b> EMPTY
                  <br />
                  <b>{landfillData?.graphData?.fullPercentage}%</b> FULL
                </div>              
              </div>
              {(landfillData?.graphData?.empty !== undefined && landfillData?.graphData?.full !== undefined) ? <PieChart
                // labels={["30% EMPTY", "70% FULL"]}
                data={[
                  { name: "30% EMPTY", value: (landfillData?.graphData?.empty), color: "rgb(121, 121, 121)" },
                  { name: "70% FULL", value: (landfillData?.graphData?.full) , color: "rgb(0, 0, 0)" },
                ]}
                withTooltip
                // background={["rgb(121, 121, 121)", "rgb(0, 0, 0)"]}
              /> : "loading..."}
            </EmptyFillContainer>
          </div>          
          <div className="md:col-span-6 min-h-36">
            <EmptyFillContainer><LanfFillUpcomingVehiclesInDashboard /></EmptyFillContainer>
          </div>
          <div className="md:col-span-8 min-h-36">
            <EmptyFillContainer><PendingBillList /></EmptyFillContainer>
          </div>
          
        </div>
      </div>
    </main>
  );
}
