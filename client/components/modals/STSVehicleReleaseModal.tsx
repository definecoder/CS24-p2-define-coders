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
import React, { use, useEffect, useState } from "react";
import { Send, Trash } from "lucide-react";
import deleteUser from "@/hooks/user_data/deleteUser";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import editUser from "@/hooks/user_data/editUser";
import gettAllRoles from "@/hooks/user_data/useGetAllRole";
import { number } from "prop-types";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import editSTS from "@/hooks/entityCreation/editSTS";
import getUserByRole from "@/hooks/user_data/getUserByRole";
import VehicleRelaseRoute from "../maps/VehicleReleaseRoute";
import useVehicleReleaseFromSTS from "@/hooks/StsDashboard/useVehicleReleaseFromSTS";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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

export const STSVehicleRelease = ({ vehicleInfo }: { vehicleInfo: Vehicle }) => {
  const [vehicleData, setVehicleData] = useState(vehicleInfo);
  const [weightOfWaste , setWeightOfWaste] = useState("");
  const [exitTime, setExitTime] = useState(new Date().toLocaleString());
  const [stsCoordinate, setStsCoordinate] = useState("");
  const [landFillCoordinate, setLandFillCoordinate] = useState("");
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const { VehicleReleaseFromSTS } = useVehicleReleaseFromSTS();

  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDateTime(date);
  };
  

 
  const handleSaveChanges = async () => {
    try {
     
      const postEntry = await VehicleReleaseFromSTS({
        stsVehicleId: vehicleInfo.entryId,
    weightOfWaste: weightOfWaste,
    exitTime: selectedDateTime.toISOString(),
    distance: distance,
    estimatedDuration: duration
      });
      // window.location.reload();
      if(postEntry) return alert(postEntry);
      
    } catch (error) {
      console.error("Error:", error);
    }
    
  
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" title="Edit STS Info" className="h-8 w-8 p-0">
          <Send className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            Vehicle Release Details
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4 flex flex-col justify-center items-start text-left p-4 rounded-lg border shadow-xl text-md">
              <h1>
                <span className="font-bold">Vehicle Number: </span>
                {vehicleInfo.vehicleNumber}
              </h1>
              <p>
              <span className="font-bold">Entry Time: </span>
                {vehicleInfo.entryTime}
              </p>
              <p>
                <span className="font-bold">Capacity: </span>
                {vehicleInfo.capacity}
              </p>
              <p>
                <span className="font-bold">Landfill Name: </span>
                {vehicleInfo.landFillName}
              </p>
              <p>
                <span className="font-bold">Optimized Route: </span>
                <VehicleRelaseRoute 
                vehicleOriginLatitude={vehicleInfo.stsLattitude}
                vehicleOriginLongitude={vehicleInfo.stsLongitude}
                vehicleDestinationLatitude={vehicleInfo.landfillLattitude}
                vehicleDestinationLongitude={vehicleInfo.landfillLongitude}
                setDistance={setDistance}
                setDuration={setDuration}
                distance={distance}
                duration={duration}
                />
              </p>
              
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Weight of Waste
            </Label>
            <Input
              id="weightOfWaste"
              placeholder="Volume (in tons)"
              className="col-span-3"
              value={weightOfWaste}
              onChange={(e) => setWeightOfWaste(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Deparature Time
            </Label>
            {/* <Input
              id="capacity"
              placeholder="1-100"
              className="col-span-3"
              value={exitTime}
              onChange={(e) => setExitTime(e.target.value)}
            /> */}
            <div className="flex flex-col">
    {/* Other component content */}
    <DatePicker
      selected={selectedDateTime}
      onChange={handleDateChange}
      showTimeSelect
      timeFormat="hh:mm aa"
      dateFormat="dd/MM/yy hh:mm aa" // Set desired date format
      locale="en-GB"
    />
  </div>
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
