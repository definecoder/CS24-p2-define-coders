import { Button } from "@/components/ui/button";
import { Cog, UserRoundCog } from "lucide-react";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { RoleCreateModal } from "@/components/modals/userControls/RoleModal"; 

export default function AdminRolesManagementPanel() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Roles</h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <RoleCreateModal>
          <Button size="sm" className="w-full bg-black text-white">
            <UserRoundCog size={16} className="mr-2" />
            ADD NEW ROLE
          </Button>
          </RoleCreateModal>
          <Button size="sm" className="w-full">
            <Cog size={16} className="mr-2" />
            ADD NEW PERMISSON
          </Button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-7 grid-rows-9 grid-flow-row gap-2 md:gap-4 w-full md:h-full max-h-max">
          <div className="col-span-2 row-span-3 min-h-36">
            <EmptyFillContainer>Roles List</EmptyFillContainer>
          </div>
          <div className="col-span-2 md:col-span-5 row-span-9">
            <EmptyFillContainer>Permisson List</EmptyFillContainer>
          </div>
          <div className="col-span-2 row-span-3 min-h-36">
            <EmptyFillContainer>Role Distribution chart</EmptyFillContainer>
          </div>
          <div className="col-span-2 row-span-3 min-h-36">
            <EmptyFillContainer>Role Requests</EmptyFillContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
