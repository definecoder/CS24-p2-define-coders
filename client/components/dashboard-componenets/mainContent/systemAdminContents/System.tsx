import { Button } from "@/components/ui/button";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { Plus, Truck } from "lucide-react";
import { StsCreateModal } from "../../../modals/stsControl/StsModal";
import { VehicleCreateModal } from "@/components/modals/VehicleModal";
import { LandfillCreateModal } from "@/components/modals/landfillControl/LandfillModal";
import UserListTable from "@/components/dataTables/UserList";
import STSListTable from "@/components/dataTables/STSList";
import LandFillListTable from "@/components/dataTables/LandFillList";
import AllVehicleList from "@/components/dataTables/AllVehicleList";

export default function AdminSystemDataPanel() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">SYSTEM DATA</h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <StsCreateModal>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-black text-white"
            >
              <Plus size={16} className="mr-2" />
              ADD NEW STS
            </Button>
          </StsCreateModal>
          <LandfillCreateModal>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-black text-white"
            >
              <Plus size={16} className="mr-2" />
              ADD NEW LANDFILL
            </Button>
          </LandfillCreateModal>
          <VehicleCreateModal>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-black text-white"
            >
              <Truck size={16} className="mr-2" />
              ADD NEW VEHICLE
            </Button>
          </VehicleCreateModal>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-2 md:gap-4 w-full md:h-full max-h-max">
          <div className="col-span-1 min-h-48">
            <EmptyFillContainer><STSListTable /></EmptyFillContainer>
          </div>
          <div className="col-span-1 min-h-48">
            <EmptyFillContainer><LandFillListTable /></EmptyFillContainer>
          </div>          
          <div className="md:col-span-2 min-h-48">
            <EmptyFillContainer><AllVehicleList /></EmptyFillContainer>
          </div>        
        </div>
      </div>
    </main>
  );
}
