import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { use, useEffect, useState } from "react";
import { EditIcon, Eye, Trash } from "lucide-react";
import deleteUser from "@/hooks/user_data/deleteUser";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../../ui/select";
import editUser from "@/hooks/user_data/editUser";
import gettAllRoles from "@/hooks/user_data/useGetAllRole";
import { number } from "prop-types";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import editSTS from "@/hooks/entityCreation/editSTS";
import getUserByRole from "@/hooks/user_data/getUserByRole";

type LandFill = {
  id: string;
  name: string;
  capacity: string;
  latitude: string;
  longitude: string;
  manager: string[];
};

type LandFillManager = {
  id: string;
  username: string;
};

export const ViewLandFIllInfoModal = ({ landfillInfo }: { landfillInfo: LandFill }) => {
  const [landFillData, setLanfillData] = useState(landfillInfo);
  const [landfillManagerData, setLandfillManagerData] = useState<LandFillManager>();
  const [landfillManagerList, setLandfillManagerList] = useState<LandFillManager[]>([]);

  const getManagerList = async () => {
    const result = await getUserByRole(landfillManager);
    if (result) await setLandfillManagerList(result);
  };

  useEffect(() => {
    getManagerList();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" title="View STS Info" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            View STS Details
          </DialogTitle>
          <DialogDescription>
            <h1>Here are the description of the STS</h1>
            <div className="mt-4 flex flex-col justify-center items-start text-left p-6 rounded-lg border shadow-xl text-md gap-2">
              <h1>
                <span className="font-bold">ID: </span>
                {landFillData.id}
              </h1>
              <p>
                <span className="font-bold">Name: </span>
                {landFillData.name}
              </p>
              <p>
                <span className="font-bold">Capacity: </span>
                {landFillData.capacity}
              </p>                     
              <p>
                <span className="font-bold">Latitude: </span>
                {landFillData.latitude}
              </p>              
              <p>
                <span className="font-bold">Longitude: </span>
                {landFillData.longitude}
              </p>              
              <p className="font-bold">Managers:</p>
              {landFillData.manager.length === 0 ? <p className="font-bold text-red-600">&nbsp;&nbsp;&nbsp; NO MANAGER ASSGINED FOR THIS LandFill </p> : landFillData.manager.map((manager, index) => (
                <p key={manager}>                  
                  &nbsp;&nbsp;&nbsp;&nbsp;{index + 1 + "."}&nbsp;{manager}
                </p>
              ))}              
            </div>
          </DialogDescription>
        </DialogHeader>      
      </DialogContent>
    </Dialog>
  );
};
