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
import { Send, Trash, EditIcon, ArrowDown } from "lucide-react";

import useEditProfileInfo from "@/hooks/user_data/useEditProfileInfo";
import useGetUserProfile from "@/hooks/user_data/useGetUserProfile";
import useUpdateSts from "@/hooks/StsDashboard/useUpdateSts";
import { message } from "antd";
import useGetAllContractor from "@/hooks/dataQuery/useGetAllContractor";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRoutes } from "@/data/apiRoutes";
import axios from "axios";
import { getCookie } from "@/lib/cookieFunctions";
import { jwtToken } from "@/data/cookieNames";

type DumpEntry = {
  stsId: string;
  entryTime: string;
  contractorId: string;
  wasteType: string;
  wasteWeight: number;
  vehicleNumber: string;
};

export const GenerateBill = () => {
  const { user, stsDetails, landfillDetails, getUserDetails } =
    useGetUserProfile();

  const [dumpEntry, setDumpEntry] = useState<any>();

  const {contractorData, fetchAllContractors} = useGetAllContractor();

  useEffect(() => {
    fetchAllContractors();
  }, []);

  useEffect(() => {
    if (contractorData) {
      console.log(contractorData);
    }
  }, [contractorData]);

  const [wastageEntry, setWastageEntry] = useState<string>(
    stsDetails.stsCurrentTotalWaste
  );

  const { UpdateSts } = useUpdateSts();

  const handleSaveChanges = async () => {
    if (dumpEntry) {
      const data = {
        stsId: stsDetails?.stsId,        
        contractorId: dumpEntry?.contractorId,        
      };
      console.log(data);
      const response = await axios.post(apiRoutes.sts.makeBill, data, 
        {
          headers: {
            "Content-Type": "application/json",
            "Bearer": getCookie(jwtToken),
          },
        }        
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        message.success("Bill creation Successful");        
        window.location.reload();
      } else {
        message.error("Bill creation Failed");
      }
    }    
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className={`w-full bg-[#1A4D2E]`}>
          <ArrowDown strokeWidth={3} className="py-1 mr-1 ml-[-5px]" />
          MAKE BILL FOR THIS WEEK
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            Make bills for this week
          </DialogTitle>
          <DialogDescription>            
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Contractor
            </Label>
            <Select
                value={dumpEntry?.contractorId || ""}
                onValueChange={(value) => setDumpEntry({ ...dumpEntry, contractorId: (value || "") })}
                
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue id="role" placeholder="Select contractor from the list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    {contractorData.map((contractor) => (
                      <SelectItem key={contractor.id} value={contractor?.id || ""}>
                        {contractor.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
          </div>                    
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={async () => {await handleSaveChanges()}}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
