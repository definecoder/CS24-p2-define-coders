import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
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
import React , {useState} from "react";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const VehicleCreateModal: React.FC<DialogWrapperProps> = ({
  children,
}) => {
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [vehicleType, setVehicleType] = useState("Select Type");
    const [capacity, setCapacity] = useState("");

    const handleItemClick = (text: string) => {
        setVehicleType(text);
    };

   


  const handleSaveChanges = () => {
    console.log("Vehicle Number:", vehicleNumber);
    console.log("Vehicle Type:", vehicleType);
    console.log("Capacity:", capacity);
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Vehicle Number
            </Label>
            <Input
              id="vehicleNumber"
              placeholder="X-Metro-Ka-123456"
              className="col-span-3"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicleType" className="text-right">
              Vehicle type
            </Label>
            <DropdownMenu>
            <DropdownMenuTrigger className="w-[200px]">{vehicleType}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Car Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleItemClick('Dump Truck')}>Dump Truck</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick('Compactor Truck')}>Compactor Truck</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick('Open Truck')}>Open Truck</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick('Container Carrier')}>Container Carrier</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Capacity (in Tons)
            </Label>
            <Input
              id="capacity"
              placeholder="1-100"
              className="col-span-3"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
        <DialogClose asChild>
        <Button type="button" onClick={handleSaveChanges}>Save changes</Button>
        </DialogClose>
        </DialogFooter>
      
      </DialogContent>
    </Dialog>
  );
};
