import { Button } from "@/components/ui/button";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { Plus, Trash, Truck, Warehouse } from "lucide-react";
import { StsCreateModal } from "../../../modals/stsControl/StsModal";
import { VehicleCreateModal } from "@/components/modals/VehicleModal";
import { LandfillCreateModal } from "@/components/modals/landfillControl/LandfillModal";
import UserListTable from "@/components/dataTables/UserList";
import STSListTable from "@/components/dataTables/STSList";
import LandFillListTable from "@/components/dataTables/LandFillList";
import AllVehicleList from "@/components/dataTables/AllVehicleList";
import ContractLists from "@/components/dataTables/ContractLists";
import ContractorLogTable from "@/components/dataTables/ContractorLogs";
import { AddNewContractor } from "@/components/modals/ContractorControl/AddNewContractor";
import { AddNewContractorManager } from "@/components/modals/ContractorControl/AddNewContractorManager";


export default function AdminContractsPanel() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl hidden md:block">SYSTEM DATA</h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <AddNewContractor>
            <Button
              variant="outline"
              size="sm"
              className={`w-full bg-[#1A4D2E] text-white flex item-center`}
            >              
              <Trash size={14} strokeWidth={3} className="mr-2" />
              ADD NEW COMPANY
            </Button>
          </AddNewContractor>
          <AddNewContractorManager>
            <Button
              variant="outline"
              size="sm"
              className={`w-full bg-[#1A4D2E] text-white flex item-center`}
            >
              <Warehouse size={16} className="mr-2" />
              ADD NEW CONTRACTOR MANAGER
            </Button>
          </AddNewContractorManager>          
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 grid-flow-row gap-2 md:gap-4 w-full md:h-full max-h-max">
          <div className="md:col-span-3 min-h-48">
            <EmptyFillContainer className={`bg-[#F5EFE6]`}><ContractLists /></EmptyFillContainer>
          </div>
          <div className="md:col-span-2 min-h-48">
            <EmptyFillContainer><ContractorLogTable /></EmptyFillContainer>
          </div>                    
        </div>
      </div>
    </main>
  );
}
