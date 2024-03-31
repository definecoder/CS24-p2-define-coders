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
import React, { Children, use, useEffect, useState } from "react";
import { Send, Trash,EditIcon, LogOut  } from "lucide-react";

import useEditProfileInfo from "@/hooks/user_data/useEditProfileInfo";
import useGetUserProfile from "@/hooks/user_data/useGetUserProfile";
import useUpdateSts from "@/hooks/StsDashboard/useUpdateSts";
import useLandFillStorageEdit from "@/hooks/landFillDashboard/useLandFillStorageEdit";
import { message } from "antd";


type User = {
  id: string;
  username: string;
  email: string;
  profileName: string;
   roleName: string;
  roleDescription: string;
 
};


export const UpdateLandfillStorageModal = () => {
  

  const { user, landfillDetails, getUserDetails} = useGetUserProfile(); 
 

  const [username , setUsername] = useState<string>(user.username);
  const [profilename , setProfilename] = useState<string>(user.profileName);
  const [wastageEntry , setWastageEntry] = useState<string>(landfillDetails.landFillCurrentWaste);
  
  const { UpdateLandfillStorage } = useLandFillStorageEdit();



 
  const handleSaveChanges = async () => {
    try {
        const remainingCapacity = parseInt(landfillDetails.landFillCurrentWaste) - parseInt(wastageEntry);
        const postEntry = await UpdateLandfillStorage({
          storedData: remainingCapacity,
          landfillId: landfillDetails.landfillId
        });

        if(postEntry) return message.success(postEntry);
      } catch (error: any) {
        message.error(error?.response?.data?.message || "An error occurred");
        // console.error("Error:", error);
      }
    
  
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  

  return (
    <Dialog>
      <DialogTrigger asChild>        
        <Button variant="ghost" size="sm" className="text-md border shadow-lg">            
            OUTGOING DUMP ENTRY
            <LogOut size={20} className="ml-4" />
          </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
           Release Dump From Landfill
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4 flex flex-col justify-center items-start text-left p-4 rounded-lg border shadow-xl text-md">
              <h1>
                <span className="font-bold">Landfill ID: </span>
                {landfillDetails.landfillId}
              </h1>
              <p>
                <span className="font-bold">Name: </span>
                {landfillDetails.landFillName}
              </p>
              <p>
              
              <span className="font-bold">Capacity: </span>
                {landfillDetails.landFillCapacity}
              </p>
              <p>
                <span className="font-bold">Current Total Waste: </span>
                {landfillDetails.landFillCurrentWaste}
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
