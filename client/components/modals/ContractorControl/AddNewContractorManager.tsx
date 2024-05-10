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
import React, { useState } from "react";
import SetZone from "../../maps/SetZone";
import useCreateSTS, { STS } from "@/hooks/entityCreation/useCreateSTS";
import { message } from "antd";
import { Contractor, ContractorManager } from "@/data/roles";
import useCreateContractor from "@/hooks/entityCreation/useCreateContractor";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const AddNewContractorManager: React.FC<DialogWrapperProps> = ({
  children,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");  
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [contractorId, setContractorId] = useState("");
  const { createContractor } = useCreateContractor();

  const handleSaveChanges = async () => {
    const data: ContractorManager = {
        username, 
        email,
        contactNumber,
        password,
        contractorId        
    };

    console.log(data);
    // (await createContractor(data))
    //   ? message.success("Contractor added successfully")
    //   : message.error("Contractor data invalid");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[825px]">
        <DialogHeader>
          <DialogTitle>ADD NEW CONTRACTOR MANAGER</DialogTitle>
          <DialogDescription>
            Add new Contractor Manager here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Manager Name
            </Label>
            <Input
              id="name"
              placeholder="Company Name here"
              className="col-span-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="registrationNumber" className="text-right">
              Email
            </Label>
            <Input
              id="registrationNumber"
              placeholder="Add email here"
              className="col-span-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tinNumber" className="text-right">
              Password
            </Label>
            <Input
              id="tinNumber"
              placeholder="Type your password"
              className="col-span-3"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactNumber" className="text-right">
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              placeholder="Add Contact Number here"
              className="col-span-3"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="workforceSize" className="text-right">
              Contractor Company
            </Label>
            <Input
              id="workforceSize"
              placeholder="Add contractor company here"
              className="col-span-3"
              type="number"
              value={contractorId}
              onChange={(e) => setContractorId(e.target.value)}
            />
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
