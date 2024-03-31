import { Button } from "@/components/ui/button";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { ArrowDown, Cog, Send, Truck, UserRoundCog } from "lucide-react";
import { StsVehicleEntryModal } from "@/components/modals/StsVehicleEntryModal";
import { stsId } from "@/data/cookieNames";
import useGetstsDatabyID from "@/hooks/StsDashboard/getStsDataById";
import { useEffect } from "react";
import { getCookie } from "@/lib/cookieFunctions";
import { PieChart } from "@mantine/charts";
import LanfFillUpcomingVehiclesInDashboard from "@/components/dataTables/LandFillUpcomingVehicleInDashboard";
import STSVehicleList from "@/components/dataTables/StsVehicleList";
import STSVehicleHistoryList from "@/components/dataTables/STSVehicleHistoryList";
import GetStsCoordinateForRoute from "@/components/maps/getStsCoordinateForRoute";

export default function STSManagerDumpEntries() {
  const { getstsDatabyID, stsData } = useGetstsDatabyID();

  useEffect(() => {
    getstsDatabyID(getCookie(stsId));
  }, []);

  useEffect(() => {
    
  }, [stsData]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-xl hidden md:block">DUMP ENTRIES</h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <StsVehicleEntryModal>
            <Button size="sm" className="w-full bg-black text-white">
              <Truck size={16} className="mr-2" />
              OUTGOING DUMP ENTRY
            </Button>
          </StsVehicleEntryModal>
          <Button size="sm" className="w-full">
            <ArrowDown strokeWidth={3} className="py-1 mr-1 ml-[-5px]" />
            INCOMING DUMP ENTRY
          </Button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-10 grid-flow-row gap-2 lg:gap-4 w-full lg:h-full max-h-max">          
          {/* <div className="col-span-1 row-span-1 min-h-48">
            <EmptyFillContainer>DISPATCH HISTORY</EmptyFillContainer>
          </div> */}
          <div className="col-span-1 lg:row-span-2 lg:col-span-4 min-h-[500px]">
            <EmptyFillContainer>
              <GetStsCoordinateForRoute />
            </EmptyFillContainer>
          </div>
          <div className="lg:col-span-6 min-h-48">
            <EmptyFillContainer>
              <STSVehicleList />
            </EmptyFillContainer>
          </div>
          <div className="lg:col-span-6 min-h-48">
            <EmptyFillContainer>
              <STSVehicleHistoryList />
            </EmptyFillContainer>
          </div>
        </div>
      </div>
    </main>
  );
  }