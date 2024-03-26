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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React , {useState} from "react";
import SetZone from "../maps/SetZone";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const LandfillCreateModal: React.FC<DialogWrapperProps> = ({
  children,
}) => {
    const [landfillName, setLandfill] = useState("");
    const [capacity, setCapacity] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    
  

  

   


  const handleSaveChanges = () => {
    // console.log("Vehicle Number:", vehicleNumber);
    // console.log("Vehicle Type:", vehicleType);
    // console.log("Capacity:", capacity);
    console.log(landfillName);
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
          <DialogTitle>Add New Landfill</DialogTitle>
          <DialogDescription>
            Add new Landfill here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Landfill Name
            </Label>
            <Input
              id="landfillName"
              placeholder="X-STS"
              className="col-span-3"
              value={landfillName}
              onChange={(e) => setLandfill(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Capacity (in Tons)
            </Label>
            <Input
              id="capacity"
              placeholder="10-1000"
              className="col-span-3"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="location" className="text-right">
              Landfill Location
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
