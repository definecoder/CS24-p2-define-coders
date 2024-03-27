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
import React , {useState, useEffect} from "react";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const StsVehicleEntryModal: React.FC<DialogWrapperProps> = ({
  children,
}) => {
    const [weightOfWaste, setWeightOfWaste] = useState("");
    const [entryTime, setEntryTime] = useState(new Date().toLocaleString());
    
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setEntryTime(new Date().toLocaleString());
    //     }, 1000);
    //     return () => clearInterval(intervalId);
    // }, []);

    
  const handleSaveChanges = () => {
    console.log("Vehicle Number:", weightOfWaste);
    console.log("Vehicle Number:", entryTime);
   
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="w-[825px]">
        <DialogHeader>
          <DialogTitle>Add Vehicle Entry</DialogTitle>
          <DialogDescription>
            Add new entry here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
            Weight of Waste
            </Label>
            <Input
              id="weightOfWaste"
              placeholder="Waste Volume (in Tons)"
              className="col-span-3"
              value={weightOfWaste}
              onChange={(e) => setWeightOfWaste(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Entry Time
            </Label>
            <Input
              id="entryTime"
              placeholder="hh:mm dd:mm:yy"
              className="col-span-3"
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
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
