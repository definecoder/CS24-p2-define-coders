import { Button } from "@/components/ui/button";
import { Cog, UserRoundCog } from "lucide-react";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { RoleCreateModal } from "@/components/modals/userControls/RoleModal";
import PermissonList from "@/components/lists/PermissonList";
import { RoleDeleteModal } from "@/components/modals/userControls/RoleDeleteModal";
import { darkestColor } from "@/data/constant";

export default function AdminRolesManagementPanel() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl hidden lg:block">Roles</h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <RoleCreateModal>
            <Button size="sm" className={`w-full bg-black text-white bg-[${darkestColor}]`}>
              <UserRoundCog size={16} className="mr-2" />
              ADD NEW ROLE
            </Button>
          </RoleCreateModal>
          <RoleDeleteModal>
            <Button size="sm" className={`w-full bg-black text-white bg-[${darkestColor}]`}>
              <UserRoundCog size={16} className="mr-2" />
              DELETE ROLE
            </Button>
          </RoleDeleteModal>
          <Button size="sm" className={`w-full bg-[${darkestColor}]`}>
            <Cog size={16} className="mr-2" />
            ADD NEW PERMISSON
          </Button>
        </div>
      </div>
      <div className="flex max-w-[90vw] md:max-w-[100vw] items-center justify-center rounded-lg border border-dashed shadow-sm h-full">
        <EmptyFillContainer className="flex flex-col overflow-scroll">
          <h1 className="text-2xl p-4 w-full text-center mb-2">
            <b>PERMISSON LIST</b> BY ROLE
          </h1>
          <PermissonList />
        </EmptyFillContainer>
      </div>
    </main>
  );
}
