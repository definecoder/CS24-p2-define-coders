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

export type STS = {
  id: string;
  name: string;
  wardNumber: string;
  capacity: string;
  latitude: string;
  longitude: string;
  manager: string[];
};

type STSManager = {
  id: string;
  username: string;
};

export const ViewSTSInfoModal = ({ stsInfo }: { stsInfo: STS }) => {
  const [stsData, setSTSData] = useState(stsInfo);
  const [stsManagerData, setSTSManagerData] = useState<STSManager>();
  const [stsManagerList, setSTSManagerList] = useState<STSManager[]>([]);

  const getManagerList = async () => {
    const result = await getUserByRole(stsManager);
    if (result) await setSTSManagerList(result);
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
                {stsData.id}
              </h1>
              <p>
                <span className="font-bold">Name: </span>
                {stsData.name}
              </p>
              <p>
                <span className="font-bold">Capacity: </span>
                {stsData.capacity}
              </p>
              <p>
                <span className="font-bold">Ward: </span>
                {stsData.wardNumber}
              </p>              
              <p>
                <span className="font-bold">Latitude: </span>
                {stsData.latitude}
              </p>              
              <p>
                <span className="font-bold">Longitude: </span>
                {stsData.longitude}
              </p>              
              <p className="font-bold">Managers:</p>
              {stsData.manager.length === 0 ? <p className="font-bold text-red-600">&nbsp;&nbsp;&nbsp; NO MANAGER ASSGINED FOR THIS STS </p> : stsData.manager.map((manager, index) => (
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
