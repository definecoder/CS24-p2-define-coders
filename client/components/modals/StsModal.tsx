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
import useCreateSTS, { STS } from "@/hooks/entityCreation/useCreateSTS";

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
    const {createSTS } = useCreateSTS();

  const handleSaveChanges = async () => {
    const data:STS = {name: stsName, wardNumber , capacity: parseInt(capacity), latitude: parseFloat(latitude), longitude: parseFloat(longitude)};
    console.log(data);    
    alert(await createSTS(data) || "STS data invalid");    
  };


  return (
    <Dialog>
      <DialogTrigger asChild>        
        {children}
      </DialogTrigger>
      <DialogContent className="w-[825px]">
        <DialogHeader>
          <DialogTitle>ADD NEW STS</DialogTitle>
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
              placeholder="STS Name here"
              className="col-span-3"
              value={stsName}
              onChange={(e) => setStsName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wardNumber" className="text-right">
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
            
            
            <SetZone setLatitude={setLatitude} setLongitude={setLongitude}/>
            
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
