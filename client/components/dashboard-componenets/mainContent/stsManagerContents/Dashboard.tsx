import { Button } from "@/components/ui/button";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { ArrowDown, Cog, Truck, UserRoundCog } from "lucide-react";
import { StsVehicleEntryModal } from "@/components/modals/StsVehicleEntryModal";
import { stsId } from "@/data/cookieNames";
import useGetstsDatabyID from "@/hooks/StsDashboard/getStsDataById";
import { useEffect } from "react";
import { getCookie } from "@/lib/cookieFunctions";
import { PieChart } from "@mantine/charts";
import LanfFillUpcomingVehiclesInDashboard from "@/components/dataTables/LandFillUpcomingVehicleInDashboard";
import STSVehicleList from "@/components/dataTables/StsVehicleList";
import STSVehicleHistoryList from "@/components/dataTables/STSVehicleHistoryList";
import { UpdateStsStorage } from "@/components/modals/stsControl/updateSTSStorage";

export default function STSManagerDashboard() {
  const { getstsDatabyID, stsData } = useGetstsDatabyID();

  useEffect(() => {
    getstsDatabyID(getCookie(stsId));
  }, []);

  useEffect(() => {    
  }, [stsData]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-xl hidden md:block">STS DASHBOARD</h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
        <StsVehicleEntryModal>
            <Button size="sm" className={`w-full bg-black text-white bg-[#1A4D2E]`}>
              <Truck size={16} className="mr-2 " />
              OUTGOING DUMP ENTRY
            </Button>
          </StsVehicleEntryModal>
          <UpdateStsStorage />          
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-flow-row gap-4 md:grid-cols-8 grid-cols-1 w-full h-full">
          <div className="md:col-span-2 min-h-36">
            <EmptyFillContainer className="flex md:flex-col justify-around md:justify-center md:gap-6 items-center max-h-min">
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
                      color: "#1A4D2E" + "80",
                    },
                    {
                      name: stsData?.graphData?.fullPercentage + "% FULL",
                      value: (stsData?.graphData?.full),
                      color: "#1A4D2E",
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
          <div className="md:col-span-6 min-h-36">
            <EmptyFillContainer>
              <STSVehicleList />
            </EmptyFillContainer>
          </div>
          <div className="md:col-span-8 min-h-36">
            <EmptyFillContainer>
              <STSVehicleHistoryList />
            </EmptyFillContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
