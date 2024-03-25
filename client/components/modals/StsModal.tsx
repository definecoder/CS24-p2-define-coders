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
import SetZone from "../maps/SetZone";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const StsCreateModal: React.FC<DialogWrapperProps> = ({
  children,
}) => {
    const [stsName, setStsName] = useState("");
    const [wardNumber, setWardNumber] = useState("");
    const [capacity, setCapacity] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    
  

  

   


  const handleSaveChanges = () => {
    // console.log("Vehicle Number:", vehicleNumber);
    // console.log("Vehicle Type:", vehicleType);
    // console.log("Capacity:", capacity);
    console.log(stsName);
    console.log(wardNumber);
    console.log(capacity);
    console.log(latitude);
    console.log(longitude);
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="w-[825px]">
        <DialogHeader>
          <DialogTitle>Add New STS</DialogTitle>
          <DialogDescription>
            Add new STS here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              STS Name
            </Label>
            <Input
              id="stsName"
              placeholder="X-STS"
              className="col-span-3"
              value={stsName}
              onChange={(e) => setStsName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
             Ward Number
            </Label>
            <Input
              id="wardNumber"
              placeholder="1-54"
              className="col-span-3"
              value={wardNumber}
              onChange={(e) => setWardNumber(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
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
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
              STS Location
            </Label>
            <SetZone setLatitude={setLatitude} setLongitude={setLongitude}></SetZone>
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