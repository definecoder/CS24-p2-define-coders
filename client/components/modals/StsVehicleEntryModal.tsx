"use client";
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
import React, { useState, useEffect } from "react";

import { getCookie } from "@/lib/cookieFunctions";
import useVehicleEntry from "@/hooks/StsDashboard/useVehicleEntry";
import useVehicleList from "@/hooks/vehicles/useVehiclesData";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import useGetSTSAvailableVehicles from "@/hooks/vehicles/useSTSAvailableVehicles";
import { message } from "antd";


interface DialogWrapperProps {
  children: React.ReactNode;
}

type Vehicle = {
 
  id: string;
  vehicleNumber: string;
  vehicleType: string;
  capacity: string;
  currentLatitude: string,
  currentLongitude: string,
  landFillId: string;
  stsId: string;
 
};

export const StsVehicleEntryModal: React.FC<DialogWrapperProps> = ({
  children,
}) => {

  const { entryTime, setEntryTime, vehicleId, setVehicleId, VehicleEntry } =
    useVehicleEntry();
  const { vehicleList, vehicleNumberList, GetSTSAvailableVehicles } = useGetSTSAvailableVehicles();
        

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [weightOfWaste, setWeightOfWaste] = useState("");
  const callVehcilse = async () => {
    const sucess = await GetSTSAvailableVehicles();
      if(!sucess) return message.error("Wrong Vehicle Information");
  };

  useEffect(() => {
    callVehcilse();
  }, []);

  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDateTime(date);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(true);
  };
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const filteredSuggestions = vehicleNumberList.filter((suggestion) =>
    suggestion
      .toString()
      .toLowerCase()
      .includes(searchTerm.toString().toLowerCase())
  );

  const getVehicleIdByNumber = (vehicleNumber: string): string | undefined => {
    const vehicle = vehicleList.find(
      (vehicle) => vehicle.vehicleNumber === vehicleNumber
    );
    if (vehicle) {
      return vehicle.id.toString();
    }

    // If vehicle is not found, return undefined
    return "no vehicle";
  };

  const handleSaveChanges = async () => {
    setVehicleId(searchTerm);

    // console.log(vehicleId);
    //console.log(entryTime);
    const vehicleId = getVehicleIdByNumber(searchTerm);

    try {
      console.log(vehicleList);
      const postEntry = await VehicleEntry({
        vehicleIds: vehicleId,
        entryTimes: selectedDateTime.toISOString(),
      });
      if(postEntry) return message.success(postEntry);
    } catch (error) {
      console.error("Error:", error);
    }
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
          <div className="grid grid-flow-row grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicleNumber" className="text-right col-span-1">
              Vehicle Number
            </Label>
            <Select value={searchTerm} onValueChange={(e) => setSearchTerm(e)}>
              <SelectTrigger className="col-span-3">
                <SelectValue
                  id="vehicleNumber"
                  placeholder="Select number from the list"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Vehicle Number</SelectLabel>
                  {vehicleNumberList.map((type: string, index: number) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-flow-row grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Entry Time
            </Label>
            <div className="flex flex-col col-span-3">
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
