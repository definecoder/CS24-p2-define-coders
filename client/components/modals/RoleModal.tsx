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
import React , {useState} from "react";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const RoleCreateModal: React.FC<DialogWrapperProps> = ({
  children,
}) => {
    const [description, setDescription] = useState("");
    const [roleName, setRoleName] = useState("");
    
  const handleSaveChanges = () => {
    console.log("Vehicle Number:", description);
    console.log("Vehicle Number:", roleName);
   
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="w-[825px]">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
          <DialogDescription>
            Add new role here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Role Name
            </Label>
            <Input
              id="name"
              placeholder="Vehicle Manager"
              className="col-span-3"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Role Description
            </Label>
            <Input
              id="capacity"
              placeholder="1-100"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
