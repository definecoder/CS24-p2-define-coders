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
import addNewRole from "@/hooks/user_data/addNewRole";
import deleteRole from "@/hooks/user_data/deleteRole";
import React , {useState} from "react";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const RoleDeleteModal: React.FC<DialogWrapperProps> = ({
  children,
}) => {
    const [roleName, setRoleName] = useState("");
    
  const handleSaveChanges = async () => {
    await deleteRole(roleName);
    window.location.reload();
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="w-[825px]">
        <DialogHeader>
          <DialogTitle>Delete Role</DialogTitle>
          <DialogDescription>
            Select a role to delete. Click delete when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Select Role
            </Label>
            <Input
              id="name"
              placeholder="Vehicle Manager"
              className="col-span-3"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>          
        </div>
        <DialogFooter>
        <DialogClose asChild>
        <div><Button type="button" className="mr-3">Cancel</Button>
        <Button type="button" onClick={handleSaveChanges}>DELETE</Button>        
        </div>
        </DialogClose>
        </DialogFooter>
      
      </DialogContent>
    </Dialog>
  );
};
