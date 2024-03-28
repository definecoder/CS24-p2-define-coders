import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Trash } from "lucide-react";
import deleteUser from "@/hooks/user_data/deleteUser";
import deleteSTS from "@/hooks/entityCreation/deleteSTS";

export type STS = {
    id: string;
    name: string;
    wardNumber: string;
    capacity: string;
    latitude: string;
    longitude: string;
    manager: string[];
  };

export const DeleteSTSModal = ({ stsInfo }: { stsInfo: STS }) => {
  const [confirmText, setConfirmText] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" title={"Remove " + stsInfo.name} className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            Confirm Delete STS?
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4 flex flex-col justify-center items-start text-left p-4 rounded-lg border shadow-xl text-md">
              <h1>
                <span className="font-bold">ID: </span>
                {stsInfo.id}
              </h1>
              <p>
                <span className="font-bold">Name: </span>
                {stsInfo.name}
              </p>
              <p>
                <span className="font-bold">Ward: </span>
                {stsInfo.wardNumber}
              </p>
              <p>
                <span className="font-bold">Capacity: </span>
                {stsInfo.capacity}
              </p>
              <p className="font-bold">Managers:</p>
              {stsInfo.manager.length === 0 ? <p className="font-bold text-red-600">&nbsp;&nbsp;&nbsp; NO MANAGER ASSGINED FOR THIS LandFill </p> : stsInfo.manager.map((manager, index) => (
                <p key={manager}>                  
                  &nbsp;&nbsp;&nbsp;&nbsp;{index + 1 + "."}&nbsp;{manager}
                </p>
              ))}  
            </div>
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col justify-center items-start text-left gap-4 p-8">
              <Label htmlFor="username" className="text-right">
                Type "CONFIRM" to remove {stsInfo.name}
              </Label>
              <Input
                id="confirmation"
                type="text"
                placeholder="CONFIRM"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={async () => {
                if (confirmText !== "CONFIRM")
                  return alert("Please type 'CONFIRM' to confirm");
                const result = await deleteSTS(stsInfo.id);
                if (result) return alert(result);
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
