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
import React, { useEffect, useState } from "react";
import SetZone from "../../maps/SetZone";
import useCreateSTS, { STS } from "@/hooks/entityCreation/useCreateSTS";
import { message } from "antd";
import { Contractor, ContractorManager } from "@/data/roles";
import useCreateContractor from "@/hooks/entityCreation/useCreateContractor";
import useCreateContractorManager from "@/hooks/entityCreation/useCreateContractorManager";
import useGetAllContractor from "@/hooks/dataQuery/useGetAllContractor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCookie } from "@/lib/cookieFunctions";
import { contractorId } from "@/data/cookieNames";
import useAddNewEmployee from "@/hooks/entityCreation/useAddNewEmployee";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const AddNewEmployee: React.FC<DialogWrapperProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");  
  const [jobTitle, setJobTitle] = useState("");
  const [paymentRate, setPaymentRate] = useState("");  
  const {createEmployee} = useAddNewEmployee();
//   const [routeId, setRouteId] = useState("");

  

  const handleSaveChanges = async () => {
    const data: any = {
        username: username,
        email: email,
        contactNumber: contactNumber,
        password: password,
        jobTitle: jobTitle,
        paymentRatePerHour: paymentRate,
        contractorId: getCookie(contractorId),
    };

    console.log(data);
    (await createEmployee(data))
      ? message.success("Employee added successfully")
      : message.error("Contractor Manager data invalid");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[825px]">
        <DialogHeader>
          <DialogTitle>ADD NEW EMPLOYEE</DialogTitle>
          <DialogDescription>
            Add new Employee here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Employee name here"
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
              Job Title
            </Label>
            <Input
              id="contactNumber"
              placeholder="Add Contact Number here"
              className="col-span-3"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactNumber" className="text-right">
              Contact Information
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
            <Label htmlFor="contactNumber" className="text-right">
              Hourly Payment Rate
            </Label>
            <Input
              id="contactNumber"
              placeholder="Enter hourly payment rate here"
              className="col-span-3"
              value={paymentRate}
              onChange={(e) => setPaymentRate(e.target.value)}
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
