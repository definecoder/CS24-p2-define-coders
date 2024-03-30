import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useGetAllLandfill from "@/hooks/dataQuery/useGetAllLandfill";
import useCreateVehicle from "@/hooks/entityCreation/useCreateVehicle";
import useGetAllSTS from "@/hooks/stsdata/useGetAllSTS";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const VehicleCreateModal: React.FC<DialogWrapperProps> = ({
  children,
}) => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Open Truck");
  const [capacity, setCapacity] = useState<number>(3);
  const [loadedFuelCostPerKm, setLoadedFuelCostPerKm] = useState<number>();
  const [unloadedFuelCostPerKm, setUnloadedFuelCostPerKm] = useState<number>();
  const [assignedLandfill, setAssignedLandfill] = useState<string>("");
  const [assignedSTS, setAssignedSTS] = useState<string>("");
  const {createVehicle} = useCreateVehicle();
  const vehicleTypeList = [
    "Open Truck",
    "Dump Truck",
    "Compactor Truck",
    "Container Carrier",
  ];
  const { landFillData } = useGetAllLandfill();
  const { stsList } = useGetAllSTS();

  useEffect(() => {}, [landFillData]);
  useEffect(() => {}, [stsList]);

  const handleSaveChanges = async () => {
    console.log("Vehicle Number:", vehicleNumber);
    console.log("Vehicle Type:", vehicleType);
    console.log("Capacity:", capacity);
    //alert(assignedLandfill);
    const res = await createVehicle({
      vehicleNumber,
      vehicleType,
      capacity: capacity || 0,
      loadedFuelCostPerKm: loadedFuelCostPerKm || 0,
      unloadedFuelCostPerKm: unloadedFuelCostPerKm || 0,
      landFillId: assignedLandfill,
      stsId: assignedSTS,
    })
    if(res) return alert(res);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="w-[825px]">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>
            Add new vehicle here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-2">
              Vehicle Number
            </Label>
            <Input
              id="vehicleNumber"
              placeholder="Dhaka-Metro-Ka-123456"
              className="col-span-4"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="vehicleType" className="text-right col-span-2">
              Vehicle Type
            </Label>
            <Select
              value={vehicleType}
              onValueChange={(e) => {
                setVehicleType(e)
                if(e === "Dump Truck") setCapacity(5)
                else if(e === "Compactor Truck") setCapacity(7)
                else if(e === "Open Truck") setCapacity(3)
                else if(e === "Container Carrier") setCapacity(15)
              }}
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
              Capacity (in Tons)
            </Label>
            <Input
              id="capacity"
              placeholder="1-100"
              className="col-span-4"
              type="number"
              value={capacity}              
              disabled = {true}
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label
              htmlFor="loadedFuelCostPerKm"
              className="text-right col-span-2"
            >
              Loaded fuel cost <br /> per km (in BDT)
            </Label>
            <Input
              id="loadedFuelCostPerKm"
              placeholder="5000"
              type="number"
              className="col-span-4"
              value={loadedFuelCostPerKm}
              onChange={(e) =>
                setLoadedFuelCostPerKm(parseFloat(e.target.value) || undefined)
              }
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label
              htmlFor="unloadedFuelCostPerKm"
              className="text-right col-span-2"
            >
              Loaded fuel cost <br /> per km (in BDT)
            </Label>
            <Input
              id="unloadedFuelCostPerKm"
              type="number"
              placeholder="2000"
              className="col-span-4"
              value={unloadedFuelCostPerKm}
              onChange={(e) =>
                setUnloadedFuelCostPerKm(parseFloat(e.target.value) || undefined)
              }
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="assignedLandfill" className="text-right col-span-2">
              Assigned Landfill
            </Label>
            <Select
              value={assignedLandfill}
              onValueChange={(e) => setAssignedLandfill(e)}
            >
              <SelectTrigger className="col-span-4">
                <SelectValue
                  id="assignedLandfill"
                  placeholder="Select assigned landfill from the list"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Landfills</SelectLabel>
                  {landFillData.map((landfill, index: number) => (
                    <SelectItem key={index} value={landfill.id}>
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
              value={assignedSTS}
              onValueChange={(e) => setAssignedSTS(e)}
            >
              <SelectTrigger className="col-span-4">
                <SelectValue
                  id="assignedSTS"
                  placeholder="Select assigned STS from the list"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>STS</SelectLabel>
                  {stsList.map((sts, index: number) => (
                    <SelectItem key={index} value={sts.id}>
                      {sts.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
