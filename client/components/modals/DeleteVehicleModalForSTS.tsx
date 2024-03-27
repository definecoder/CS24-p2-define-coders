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
import deleteVehicleEntryFromSTS from "@/hooks/StsDashboard/deleteVehicleEntryFromSTS";

type Vehicle = {
  entryId: string,
  id: string,
  vehicleNumber: string,
  vehicleType: string,
  capacity: string,
  loadedFuelCostPerKm: string,
  unloadedFuelCostPerKm: string,
  landFillId: string,
  entryTime: string,
  landFillName: string,    
  stsLattitude: string,
  stsLongitude: string,
  landfillLattitude: string,
  landfillLongitude: string,
};
export const DeleteVehicleModalForSTS = ({ vehicleInfo }: { vehicleInfo: Vehicle }) => {
  const [confirmText, setConfirmText] = useState("");
  console.log(vehicleInfo);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" title={"Remove " + vehicleInfo.vehicleNumber} className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            Confirm Delete User?
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4 flex flex-col justify-center items-start text-left p-4 rounded-lg border shadow-xl text-md">
              <h1>
                <span className="font-bold">ID: </span>
                {vehicleInfo.id}
              </h1>
              <p>
                <span className="font-bold">Vehicle Number: </span>
                {vehicleInfo.vehicleNumber}
              </p>
              <p>
                <span className="font-bold">Vehicle Type: </span>
                {vehicleInfo.vehicleType}
              </p>
              <p>
                <span className="font-bold">Entry Time: </span>
                {vehicleInfo.entryTime}
              </p>              
            </div>
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col justify-center items-start text-left gap-4 p-8">
              <Label htmlFor="username" className="text-right">
                Type "CONFIRM" to remove {vehicleInfo.vehicleNumber}
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
                const result = await deleteVehicleEntryFromSTS(vehicleInfo.entryId);
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
