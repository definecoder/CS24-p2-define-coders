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
  DialogClose
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React , {useState, useEffect} from "react";

import { getCookie } from '@/lib/cookieFunctions';
import useVehicleEntry from "@/hooks/StsDashboard/useVehicleEntry";
import useVehicleList from "@/hooks/vehicles/useVehiclesData";


interface DialogWrapperProps {
  children: React.ReactNode;
}

export const StsVehicleEntryModal: React.FC<DialogWrapperProps> = ({
  children,
}) => {
    const { entryTime,setEntryTime, vehicleId, setVehicleId, VehicleEntry } = useVehicleEntry();
    const { vehicleList, vehicleNumberList, getVehicleList } = useVehicleList();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
   
    const [weightOfWaste, setWeightOfWaste] = useState("");
    const callVehcilse = async () => {
      const sucess = await getVehicleList();
    };
    
    useEffect(() => {
      callVehcilse();
    }, []);

   
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setShowSuggestions(true);
    };
    const handleSuggestionClick = (suggestion: string) => {
      setSearchTerm(suggestion);
      setShowSuggestions(false);
    };

    const filteredSuggestions = vehicleNumberList.filter((suggestion) =>
    suggestion.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
  );

  const getVehicleIdByNumber = (vehicleNumber: string): string | undefined => {
    const vehicle = vehicleList.find(vehicle => vehicle.vehicleNumber === vehicleNumber);
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
        entryTimes: entryTime,
      });
      
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
        <div>
          <Label htmlFor="description" className="text-right">
              Vehicle Number
            </Label>
                <input
                  type="text"
                  placeholder="Search by Vehicle Number"
                  value={searchTerm}
                  onChange={handleInputChange}
                  className="border border-gray-300 mx-4 px-1 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
                {showSuggestions && (
                  <ul className="absolute z-10 mt-1 mx-[120px] w-2/5 bg-white rounded-md shadow-lg">
                    {filteredSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
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
