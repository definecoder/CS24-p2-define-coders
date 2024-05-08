import { Button } from "@/components/ui/button";
import { UserRoundCog, Cog } from "lucide-react";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import PendingBillList from "@/components/dataTables/PendingBillList";
import CompletedBillList from "@/components/dataTables/CompletedBillList";
import { darkestColor } from "@/data/constant";

export default function LandfillManagerBillsManagementPanel() {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
        <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Bills</h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <Button size="sm" className={`w-full bg-[${darkestColor}]`}>
            <Cog size={16} className="mr-2" />
            CONFIGURE BILL RATES
          </Button>          
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-1 grid-flow-row gap-2 md:gap-4 w-full h-full max-h-max">
          <div className="min-h-40">
            <EmptyFillContainer><PendingBillList /></EmptyFillContainer>
          </div>
          <div className="min-h-40">
            <EmptyFillContainer><CompletedBillList /></EmptyFillContainer>
          </div>          
        </div>
      </div>
      </main>
    );
  }