import { Button } from "@/components/ui/button";
import { UserRoundCog, Cog } from "lucide-react";
import EmptyFillContainer from "../../cards/EmptyFillContainer";

export default function AdminBillsManagementPanel() {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
        <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Bills</h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <Button size="sm" className="w-full">
            <Cog size={16} className="mr-2" />
            CONFIGURE BILL RATES
          </Button>          
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-7 grid-rows-5 grid-flow-row gap-2 md:gap-4 w-full md:h-full max-h-max">
          <div className="md:col-span-3 row-span-5 min-h-40">
            <EmptyFillContainer>Recent Bills</EmptyFillContainer>
          </div>
          <div className="row-span-2 md:col-span-4 min-h-40">
            <EmptyFillContainer>Search Bill</EmptyFillContainer>
          </div>
          <div className="row-span-3 md:col-span-4 min-h-40">
            <EmptyFillContainer>Bill Heatmap</EmptyFillContainer>
          </div>          
        </div>
      </div>
      </main>
    );
  }