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
import { Contractor } from "@/data/roles";
import useCreateContractor from "@/hooks/entityCreation/useCreateContractor";
import useGetAllSTS from "@/hooks/stsdata/useGetAllSTS";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const AddNewContractor: React.FC<DialogWrapperProps> = ({
  children,
}) => {
  const [name, setName] = useState("");
  const [registrationId, setRegId] = useState("");
  const [tinNumber, setTinNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [workforceSize, setWorkForceSize] = useState(0);
  const [paymentPerTon, setPaymentPerTon] = useState(0);
  const [requiredWastePerDay, setRequiredWastePerDay] = useState(0);
  const [contractDuration, setContractDuration] = useState("");
  const [area, setArea] = useState("");
  const [stsId, setStsId] = useState("");
  const { createContractor } = useCreateContractor();

  const { stsList } = useGetAllSTS();
  useEffect(() => {}, [stsList]);

  const handleSaveChanges = async () => {
    const data: Contractor = {
      name,
      registrationId,
      tinNumber,
      contactNumber,
      workforceSize,
      paymentPerTon,
      requiredWastePerDay,
      contractDuration,
      area,
      stsId,
    };

    console.log(data);
    (await createContractor(data))
      ? message.success("Contractor added successfully")
      : message.error("Contractor data invalid");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[825px]">
        <DialogHeader>
          <DialogTitle>ADD NEW CONTRACTOR</DialogTitle>
          <DialogDescription>
            Add new Contractor here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Company Name
            </Label>
            <Input
              id="name"
              placeholder="Company Name here"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="registrationNumber" className="text-right">
              Registration Number
            </Label>
            <Input
              id="registrationNumber"
              placeholder="Add Registration Number here"
              className="col-span-3"
              value={registrationId}
              onChange={(e) => setRegId(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tinNumber" className="text-right">
              TIN Number
            </Label>
            <Input
              id="tinNumber"
              placeholder="Add TIN Number here"
              className="col-span-3"
              value={tinNumber}
              onChange={(e) => setTinNumber(e.target.value)}
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
              Workforce Size
            </Label>
            <Input
              id="workforceSize"
              placeholder="Add Workforcesize here"
              className="col-span-3"
              type="number"
              value={workforceSize}
              onChange={(e) => setWorkForceSize(parseInt(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="paymentPerTon" className="text-right">
              Payment (Per Ton)
            </Label>
            <Input
              id="paymentPerTon"
              placeholder="Add Workforcesize here"
              className="col-span-3"
              type="number"
              value={paymentPerTon}
              onChange={(e) => setPaymentPerTon(parseInt(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="requiredWastePerDay" className="text-right">
              Required Waste Per Day
            </Label>
            <Input
              id="requiredWastePerDay"
              placeholder="Add Workforcesize here"
              className="col-span-3"
              type="number"
              value={requiredWastePerDay}
              onChange={(e) => setRequiredWastePerDay(parseInt(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contractDuration" className="text-right">
              Contract Duration
            </Label>
            <Input
              id="workforceSize"
              placeholder="Add Workforcesize here"
              className="col-span-3"              
              value={contractDuration}
              onChange={(e) => setContractDuration(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              Area
            </Label>
            <Input
              id="area"
              placeholder="Add Workforcesize here"
              className="col-span-3"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="assignedSTS" className="text-right ">
              Assigned STS
            </Label>
            <Select
              value={stsId}
              onValueChange={(e) => setStsId(e)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue
                  id="assignedSTS"
                  placeholder="Select assigned STS from the list"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>STS</SelectLabel>
                  {stsList.map((sts, index: number) => (
                    <SelectItem key={index} value={sts.id}>
                      {sts.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
