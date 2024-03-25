import { Button } from "@/components/ui/button";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { ArrowUpRight } from "lucide-react";

export default function AdminSystemDataPanel() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">SYSTEM DATA</h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <Button size="sm" className="w-full">
            ADD NEW STS
          </Button>
          <Button size="sm" className="w-full">
            ADD NEW VEHICLE
          </Button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 grid-flow-row gap-2 md:gap-4 w-full md:h-full max-h-max">
          <div className="col-span-1 row-span-1 min-h-48">
            <EmptyFillContainer>STS Heatmap</EmptyFillContainer>
          </div>
          <div className="col-span-1 row-span-2 min-h-48">
            <EmptyFillContainer>STS data</EmptyFillContainer>
          </div>
          <div className="col-span-1 row-span-1 min-h-48">
            <EmptyFillContainer>Available Veicles</EmptyFillContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
