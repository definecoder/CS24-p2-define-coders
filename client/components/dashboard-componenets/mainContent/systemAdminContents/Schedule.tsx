import { Button } from "@/components/ui/button";
import { Plus, Truck } from "lucide-react";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { BillBySTSId } from "@/components/dataTables/BillBySTSId";

export default function AdminSchedulePanel() {
  return (
    <main className="flex flex-1 flex-col p-4 lg:p-6 max-h-[calc(100vh-60px)] overflow-scroll items-center">
      
        <div>
          SEE SCHEDULE FOR STS 1
        </div>

        <div className="flex flex-col items-center justify-center h-full w-full">
          <BillBySTSId stsId="sts-1" />
        </div>
      
    </main>
  );
}
