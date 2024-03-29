import { Button } from "@/components/ui/button";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { Cog, Download, Send, Upload, UserRoundCog } from "lucide-react";
import LanfFillUpcomingVehiclesInDashboard from "../../../dataTables/LandFillUpcomingVehicleInDashboard";

export default function LandfillManagerDashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">      
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-flow-row gap-4 grid-col-1 md:grid-cols-6 w-full h-full">
          <div className="md:col-span-4 min-h-36">
            <EmptyFillContainer><LanfFillUpcomingVehiclesInDashboard /></EmptyFillContainer>
          </div>
          <div className="md:col-span-2 min-h-36">
            <EmptyFillContainer>CURRENT STORAGE</EmptyFillContainer>
          </div>          
          <div className="md:col-span-6 min-h-36">
            <EmptyFillContainer>PENDING BILLS</EmptyFillContainer>
          </div>
          
        </div>
      </div>
    </main>
  );
}
