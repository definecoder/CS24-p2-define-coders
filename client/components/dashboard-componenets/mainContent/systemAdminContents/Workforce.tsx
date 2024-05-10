import { Button } from "@/components/ui/button";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { Plus, Trash, Truck, Warehouse } from "lucide-react";
import ContractLists from "@/components/dataTables/ContractLists";
import ContractorLogTable from "@/components/dataTables/ContractorLogs";
import { AddNewContractor } from "@/components/modals/ContractorControl/AddNewContractor";
import { AddNewContractorManager } from "@/components/modals/ContractorControl/AddNewContractorManager";
import CleanerLists from "@/components/dataTables/CleanerList";
import { AddNewCleaner } from "@/components/modals/cleanerControl/AddNewCleaner";
import CleanerLog from "@/components/dataTables/CleanerLog";

export default function AdminWorkforcePanel() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl hidden md:block">
          WORKFORCE DATA
        </h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <AddNewCleaner>
            <Button
              variant="outline"
              size="sm"
              className={`w-full bg-[#1A4D2E] text-white flex item-center`}
            >
              <Plus size={14} strokeWidth={3} className="mr-2" />
              ADD NEW CLEANER
            </Button>
          </AddNewCleaner>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 grid-flow-row gap-2 md:gap-4 w-full md:h-full max-h-max">
          <div className="md:col-span-3 min-h-48">
            <EmptyFillContainer className={`bg-[#F5EFE6]`}>
              <CleanerLists />
            </EmptyFillContainer>
          </div>
          <div className="md:col-span-2 min-h-48">
            <EmptyFillContainer>
              <CleanerLog />
            </EmptyFillContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
