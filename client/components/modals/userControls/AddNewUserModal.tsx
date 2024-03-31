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
import { UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { message } from "antd";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const AddNewUserModal = ({ props }: { props: any }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full">
          <UserPlus size={16} className="mr-2" />
          ADD NEW USER
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ADD NEW USER</DialogTitle>
          <DialogDescription>
            Enter the details of the new user and set his/her role.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={props.userData.username}
                onChange={(e) =>
                  props.setUserData({
                    ...props.userData,
                    username: e.target.value,
                  })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={props.userData.email}
                onChange={(e) =>
                  props.setUserData({
                    ...props.userData,
                    email: e.target.value,
                  })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={props.userData.password}
                onChange={(e) =>
                  props.setUserData({
                    ...props.userData,
                    password: e.target.value,
                  })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={props.userData.roleName}
                onValueChange={(e) =>
                  props.setUserData({ ...props.userData, roleName: e })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue
                    id="role"
                    placeholder="Select role for the user"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    {props.roles?.map((role: string) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={async () => {
                const result = await props.createNewUser();
                if (result) return message.success(result);
              }}
            >
              Create User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
