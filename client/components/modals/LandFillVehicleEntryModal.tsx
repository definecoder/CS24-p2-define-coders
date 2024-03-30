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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { use, useEffect, useState } from "react";
import { Download, LucideArrowDownWideNarrow, Send, Trash, Truck } from "lucide-react";
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
import useUpcomingVehicle from "@/hooks/landFillDashboard/useUpcomingVehiclesList";
import useTripComplete from "@/hooks/landFillDashboard/useTripComplete";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


type Vehicle = {
  tripId: string;
  weightOfWaste: string;
  vehicleNumber: string;
  stsId: string;
  vehicleType: string;
  distance: string;
  tripStartTime: string;
  estimatedDuration: string;
  tripStatus: string;
  capacity: string;
};

export const LandfillVehicleEntryModal = ({
  vehicleInfo,
}: {
  vehicleInfo: Vehicle;
}) => {
  const [vehicleData, setVehicleData] = useState(vehicleInfo);
  const [weightOfWaste, setWeightOfWaste] = useState("");
  const [entryTime, setEntryTime] = useState(new Date().toLocaleString());
  const [stsCoordinate, setStsCoordinate] = useState("");
  const [landFillCoordinate, setLandFillCoordinate] = useState("");
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const { TripComplete } = useTripComplete();



  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());

const handleDateChange = (date: Date) => {
  setSelectedDateTime(date);
};

 

  const handleSaveChanges = async () => {
    try {
      const postEntry = await TripComplete({
        tripId: vehicleInfo.tripId,
        weightOfWaste: weightOfWaste,
        entryTime: selectedDateTime.toISOString()//entryTime,
      });
      if(postEntry) return alert(postEntry);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title={"Vehicle " + vehicleInfo.vehicleNumber + " has arrived?"} className="px-3 py-1 bg-black text-white flex gap-2">
          {/* <div className="flex gap-2 mr-4 px-2 py-1 rounded-sm bg-card shadow-md"><Truck className="h-4 w-4" /> ENTRY</div> */}
          <Truck className="h-4 w-4" /> ENTRY
        </Button>        
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            Vehicle Entry Details
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4 flex flex-col justify-center items-start text-left p-4 rounded-lg border shadow-xl text-md">
              <h1>
                <span className="font-bold">Vehicle Number: </span>
                {vehicleInfo.vehicleNumber}
              </h1>
              <p>
                <span className="font-bold">Vehicle Type: </span>
                {vehicleInfo.vehicleType}
              </p>
              <p>
                <span className="font-bold">STS Name: </span>
                {vehicleInfo.stsId}
              </p>
              <p>
                <span className="font-bold">Capacity: </span>
                {vehicleInfo.capacity}
              </p>
              <p>
                <span className="font-bold">Distance: </span>
                {vehicleInfo.distance}
              </p>
              <p>
                <span className="font-bold">Trip Start Time: </span>
                {vehicleInfo.tripStartTime}
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
              placeholder={vehicleInfo.weightOfWaste}
              className="col-span-3"
              value={weightOfWaste}
              onChange={(e) => setWeightOfWaste(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              LandFill Entry Time
            </Label>
            {/* <Input
              id="capacity"
              placeholder="1-100"
              className="col-span-3"
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
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
            <Button type="button" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
