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
import useGetAllSTS from "@/hooks/stsdata/useGetAllSTS";
import { message } from "antd";

type Vehicle = {
  id: string,
  vehicleNumber: string,
  vehicleType: string,
  capacity: string,
  loadedFuelCostPerKm: string,
  unloadedFuelCostPerKm: string,
  landFillId: string,
  landFillName: string,  
  stsId: string,
};

export const EditVehicleInfoModal = ({ vehicleInfo }: { vehicleInfo: Vehicle }) => {
  const [vehicleData, setvehicleData] = useState(vehicleInfo);
  const [selectedLandfill, setSelectedLandfill] = useState(vehicleInfo.landFillId);
  const [selectedSTS, setSelectedSTS] = useState(vehicleInfo.stsId);
  const vehicleTypeList = [
    "Open Truck",
    "Dump Truck",
    "Compactor Truck",
    "Container Carrier",
  ];
  const {landFillData} = useGetAllLandfill();
  const  {stsList} = useGetAllSTS();
  
  useEffect(() => {}, [landFillData]);
  useEffect(() => {}, [stsList]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" title="Edit STS Info" className="h-8 w-8 p-0">
          <EditIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            Edit Vehicle Details
          </DialogTitle>
          <DialogDescription>
            Update Vehicle information by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="vehicleNumber" className="text-right col-span-2">
                Vehicle Number
              </Label>
              <Input
                id="vehicleNumber"
                type="text"
                value={vehicleData.vehicleNumber}
                onChange={(e) =>
                  setvehicleData({ ...vehicleData, vehicleNumber: e.target.value })
                }
                className="col-span-4"
                required
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="vehicleType" className="text-right col-span-2">
              Vehicle Type
            </Label>
            <Select
              value={vehicleData.vehicleType}
              onValueChange={(e) => setvehicleData({ ...vehicleData, vehicleType: e })}
            >
              <SelectTrigger className="col-span-4">
                <SelectValue
                  id="vehicleType"
                  placeholder="Select vehicle type from the list"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Vehicle Type</SelectLabel>
                  {vehicleTypeList.map((type: string, index: number) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="capacity" className="text-right col-span-2">
                Capacity (in Ton)
              </Label>
              <Input
                id="capacity"
                type="number"
                value={vehicleData.capacity}
                onChange={(e) =>
                  setvehicleData({ ...vehicleData, capacity: e.target.value })
                }
                className="col-span-4"
                required
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="loadedFuelCostPerKm" className="text-right col-span-2">
                Loaded Fuel Cost per Km (in BDT)
              </Label>
              <Input
                id="loadedFuelCostPerKm"
                type="number"
                value={vehicleData.loadedFuelCostPerKm}
                onChange={(e) =>
                  setvehicleData({ ...vehicleData, loadedFuelCostPerKm: e.target.value })
                }
                className="col-span-4"
                required
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="unloadedFuelCostPerKm" className="text-right col-span-2">
                Unloaded Fuel Cost per Km (in BDT)
              </Label>
              <Input
                id="unloadedFuelCostPerKm"
                type="number"
                value={vehicleData.unloadedFuelCostPerKm}
                onChange={(e) =>
                  setvehicleData({ ...vehicleData, unloadedFuelCostPerKm: e.target.value })
                }
                className="col-span-4"
                required
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="assignedLandfill" className="text-right col-span-2">
                Assigned Landfill
              </Label>
              <Select
                value={selectedLandfill || ""}
                onValueChange={(e) => setSelectedLandfill(landFillData.filter((landfill) => landfill.id === e)[0].id)}
              >
                <SelectTrigger className="col-span-4">
                  <SelectValue id="assignedLandfill" placeholder="Select Landfill from the list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Landfill</SelectLabel>
                    {landFillData.map((landfill) => (
                      <SelectItem key={landfill.id} value={landfill.id}>
                        {landfill.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="assignedSTS" className="text-right col-span-2">
                Assigned STS
              </Label>
              <Select
                value={selectedSTS || ""}
                onValueChange={(e) => setSelectedSTS(stsList.filter((sts) => sts.id === e)[0].id)}
              >
                <SelectTrigger className="col-span-4">
                  <SelectValue id="assignedLandfill" placeholder="Select STS from the list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>STS</SelectLabel>
                    {stsList.map((sts) => (
                      <SelectItem key={sts.id} value={sts.id}>
                        {sts.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={async () => {
                const result = await editVehicle(vehicleData);
                if (result) return message.success(result);
              }}
            >
              Update Vehicle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
