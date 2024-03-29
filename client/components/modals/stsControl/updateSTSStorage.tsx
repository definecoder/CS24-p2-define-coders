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
import { Send, Trash,EditIcon  } from "lucide-react";

import useEditProfileInfo from "@/hooks/user_data/useEditProfileInfo";
import useGetUserProfile from "@/hooks/user_data/useGetUserProfile";
import useUpdateSts from "@/hooks/StsDashboard/useUpdateSts";


type User = {
  id: string;
  username: string;
  email: string;
  profileName: string;
   roleName: string;
  roleDescription: string;
 
};


export const UpdateStsStorage = () => {
  

  const { user, stsDetails, landfillDetails, getUserDetails} = useGetUserProfile(); 
 

  const [username , setUsername] = useState<string>(user.username);
  const [profilename , setProfilename] = useState<string>(user.profileName);
  const [wastageEntry , setWastageEntry] = useState<string>(stsDetails.stsCurrentTotalWaste);
  
  const { UpdateSts } = useUpdateSts();



 
  const handleSaveChanges = async () => {
    try {
        const remainingCapacity = parseInt(stsDetails.stsCurrentTotalWaste) + parseInt(wastageEntry);
        const postEntry = await UpdateSts({
          storedData: remainingCapacity,
          stsId: stsDetails.stsId
        });

        window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
    
  
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" title="Edit STS Info" className="h-8 w-24 p-0">
        <EditIcon className="h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
           Entry Dump In STS
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4 flex flex-col justify-center items-start text-left p-4 rounded-lg border shadow-xl text-md">
              <h1>
                <span className="font-bold">STS ID: </span>
                {stsDetails.stsId}
              </h1>
              <p>
                <span className="font-bold">Name: </span>
                {stsDetails.stsName}
              </p>
              <p>
              <p>
                <span className="font-bold">Ward Number: </span>
                {stsDetails.stsWardNumber}
              </p>
              <span className="font-bold">Capacity: </span>
                {stsDetails.stsCapacity}
              </p>
              <p>
                <span className="font-bold">Current Total Waste: </span>
                {stsDetails.stsCurrentTotalWaste}
              </p>
             
            
              
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
             Release Wastage
            </Label>
            <Input
              id="weight of waste"
              placeholder="Wastage (in Tons)"
              className="col-span-3"
              value={wastageEntry}
              onChange={(e) => setWastageEntry(e.target.value)}
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
