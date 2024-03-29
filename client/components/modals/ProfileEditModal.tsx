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
import { profile } from "console";
import useEditProfileInfo from "@/hooks/user_data/useEditProfileInfo";
import useGetUserProfile from "@/hooks/user_data/useGetUserProfile";


type User = {
  id: string;
  username: string;
  email: string;
  profileName: string;
   roleName: string;
  roleDescription: string;
 
};


export const ProfileEditModal = ({ profileInfo }: { profileInfo: User }) => {
  const [profileData, setProfileData] = useState<User>(profileInfo);

  const { user, stsDetails, landfillDetails, getUserDetails} = useGetUserProfile(); 
 

  const [username , setUsername] = useState<string>(user.username);
  const [profilename , setProfilename] = useState<string>(user.profileName);
  
  const { EditProfileInfo } = useEditProfileInfo();



 
  const handleSaveChanges = async () => {
    try {
      
     
      const postEntry = await EditProfileInfo({
        username : username,
        profileName: profilename
      });

      if(postEntry) return alert(postEntry);
      
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
            Edit Profile
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4 flex flex-col justify-center items-start text-left p-4 rounded-lg border shadow-xl text-md">
              <h1>
                <span className="font-bold">Role Name: </span>
                {user.roleName}
              </h1>
              <p>
                <span className="font-bold">Email: </span>
                {user.email}
              </p>
              <p>
              <span className="font-bold">Username: </span>
                {user.username}
              </p>
              <p>
                <span className="font-bold">Profile Name: </span>
                {user.profileName}
              </p>
             
            
              
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
             Username
            </Label>
            <Input
              id="weightOfWaste"
              placeholder={username}
              className="col-span-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Profile Name
            </Label>
            <Input
              id="capacity"
              placeholder={profilename}
              className="col-span-3"
              value={profilename}
              onChange={(e) => setProfilename(e.target.value)}
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
