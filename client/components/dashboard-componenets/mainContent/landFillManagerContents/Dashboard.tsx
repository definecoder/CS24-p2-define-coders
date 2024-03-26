import { Button } from "@/components/ui/button";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { Cog, UserRoundCog } from "lucide-react";

export default function LandfillManagerDashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          Landfill Dashboard
        </h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <Button size="sm" className="w-full">
            <UserRoundCog size={16} className="mr-2" />
            NEW DUMPING ENTRY
          </Button>
          <Button size="sm" className="w-full">
            <Cog size={16} className="mr-2" />
            NEW STORAGE
          </Button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-10 lg:grid-rows-7 grid-flow-row gap-4 w-full h-full">
          <div className="lg:col-span-2 lg:row-span-3 min-h-36">
            <EmptyFillContainer>Storage Status</EmptyFillContainer>
          </div>
          <div className="lg:col-span-4 lg:row-span-3 min-h-36">
            <EmptyFillContainer>Upcoming Gari</EmptyFillContainer>
          </div>
          <div className="lg:col-span-4 lg:row-span-3 min-h-36">
            <EmptyFillContainer>Dumping History</EmptyFillContainer>
          </div>
          <div className="lg:col-span-3 lg:row-span-2 min-h-36">
            <EmptyFillContainer>Dump graph</EmptyFillContainer>
          </div>
          <div className="lg:col-span-7 lg:row-span-4 min-h-52">
            <EmptyFillContainer>MAP</EmptyFillContainer>
          </div>
          <div className="lg:col-span-3 lg:row-span-2 min-h-36">
            <EmptyFillContainer>Storage Graph</EmptyFillContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
