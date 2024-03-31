import { Button } from "@/components/ui/button";
import { UserRoundCog, Cog } from "lucide-react";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import CompletedBillList from "@/components/dataTables/CompletedBillList";
import PendingBillList from "@/components/dataTables/PendingBillList";
import BillListAdmin from "@/components/dataTables/BillListAdmin";

export default function AdminBillsManagementPanel() {
  return (
    <main className="flex flex-1 flex-col p-4 lg:p-6 max-h-[calc(100vh-60px)] overflow-scroll items-center">
      
        <div className="flex flex-col justify-center h-full w-full">
          <BillListAdmin />
        </div>
      
    </main>
  );
}
