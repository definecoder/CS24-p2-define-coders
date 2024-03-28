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
import React, { use, useEffect, useState } from "react";
import { EditIcon, Trash } from "lucide-react";
import deleteUser from "@/hooks/user_data/deleteUser";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../../ui/select";
import editUser from "@/hooks/user_data/editUser";
import gettAllRoles from "@/hooks/user_data/useGetAllRole";
import { number } from "prop-types";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import editSTS from "@/hooks/entityCreation/editSTS";
import getUserByRole from "@/hooks/user_data/getUserByRole";
import useGetAllLandfill from "@/hooks/dataQuery/useGetAllLandfill";
import editVehicle from "@/hooks/vehicles/editVehicle";
import { Trip } from "@/components/dataTables/PendingBillList";
import makeBill from "@/hooks/bills/makeBill";

export const BillCreationModal = ({ tripInfo }: { tripInfo: Trip }) => {
  const [allocatedCost, setAllocatedCost] = useState<number | undefined>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" title="Generate Bill" className="h-8 w-8 p-0">
          <EditIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            Generate Bill
          </DialogTitle>
          <DialogDescription>
            Give allocated cost for the trip for Trip ID : {tripInfo.id}
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="m-4 p-4 border bg-primary-foreground text-primary flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <b>STS:</b> <br /> {tripInfo.stsName}{" "}
              </div>
              <div className="text-right">
                <b>Landfill:</b> <br /> {tripInfo.landFillName}
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Vehicle Number:</b> <br /> {tripInfo.vehicleNumber}{" "}
              </div>
              <div className="text-right">
                <b>Vehicle Type:</b> <br /> {tripInfo.vehicleType}
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Capacity:</b> <br /> {tripInfo.capacity} Ton{" "}
              </div>
              <div className="text-center">
                <b>
                  Weight Trasfered: <br /> {tripInfo.weightOfWaste} Ton{" "}
                </b>
              </div>
              <div className="text-right">
                <b>Shortage:</b> <br /> {tripInfo.shortage} Ton
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Loaded Fuel Cost:</b> <br /> {tripInfo.loadedFuelCostPerKm} BDT
              </div>
              <div className="text-right">
                <b>Unloaded Fuel Cost:</b> <br /> {tripInfo.unloadedFuelCostPerKm} BDT
              </div>
            </div>
            <div className="flex justify-between">
              <div>
              <b>Actual Duration:</b> <br /> {tripInfo.estimatedDuration} min
                
              </div>
              <div className="text-right">
              <b>Estimated Duration:</b> <br /> {tripInfo.actualDuration} min
              </div>
              </div>
            <div className="flex justify-between">
              <div>
              <b>Total Distance:</b> <br /> {tripInfo.distance} km
                
              </div>
              <div className="text-right">
              <b>Estimated Fuel Cost:</b> <br /> {tripInfo.estimatedFuelCost} BDT
              </div>
              </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4 mb-6">
            <Label htmlFor="allocatedCost" className="text-right col-span-1">
              Allocated Cost
            </Label>
            <Input
              id="loadedFuelCostPerKm"
              type="number"
              value={allocatedCost}
              placeholder={tripInfo.estimatedFuelCost.toString() + " BDT"}
              onChange={(e) => setAllocatedCost(parseFloat(e.target.value))}
              className="col-span-3"
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={async () => {
                let result;
                allocatedCost ? result = await makeBill(tripInfo, allocatedCost) : result = "Please enter allocated cost";
                if (result) return alert(result);
              }}
            >
              GENERATE BILL
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
