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
import { EditIcon, Trash } from "lucide-react";
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

export const EditSTSInfoModal = ({ stsInfo }: { stsInfo: STS }) => {
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
        <Button variant="ghost" title="Edit STS Info" className="h-8 w-8 p-0">
          <EditIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            Edit STS Details
          </DialogTitle>
          <DialogDescription>
            Update STS information by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stsName" className="text-right">
                STS Name
              </Label>
              <Input
                id="stsName"
                type="text"
                value={stsData.name}
                onChange={(e) =>
                  setSTSData({ ...stsData, name: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                type="number"
                value={stsData.capacity}
                onChange={(e) =>
                  setSTSData({ ...stsData, capacity: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ward" className="text-right">
                Ward No
              </Label>
              <Input
                id="capacity"
                type="number"
                value={stsData.wardNumber}
                onChange={(e) =>
                  setSTSData({ ...stsData, wardNumber: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Manager" className="text-right">
                Add Manager
              </Label>
              <Select
                value={stsManagerData?.id || ""}
                onValueChange={(e) => setSTSManagerData(stsManagerList.filter((user) => user.id === e)[0])}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue id="role" placeholder="Select manager from the list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    {stsManagerList.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.username}
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
                const result = await editSTS(stsData, stsManagerData?.id || "");
                if (result) return alert(result);
              }}
            >
              Update STS
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
