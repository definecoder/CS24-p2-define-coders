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
} from "../../ui/select";
import editUser from "@/hooks/user_data/editUser";
import gettAllRoles from "@/hooks/user_data/useGetAllRole";
import { number } from "prop-types";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import editSTS from "@/hooks/entityCreation/editSTS";
import getUserByRole from "@/hooks/user_data/getUserByRole";
import editLandfill from "@/hooks/entityCreation/editLandfill";

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

export const EditLandfillInfoModal = ({ landfillInfo }: { landfillInfo: LandFill }) => {
  const [landfillData, setLandfillData] = useState(landfillInfo);
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
        <Button variant="ghost" title="Edit Landfill Info" className="h-8 w-8 p-0">
          <EditIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            Edit Landfill Details
          </DialogTitle>
          <DialogDescription>
            Update Landfill information by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stsName" className="text-right">
                Landfill Name
              </Label>
              <Input
                id="stsName"
                type="text"
                value={landfillData.name}
                onChange={(e) =>
                  setLandfillData({ ...landfillData, name: e.target.value })
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
                value={landfillData.capacity}
                onChange={(e) =>
                  setLandfillData({ ...landfillData, capacity: e.target.value })
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
                value={landfillManagerData?.id || ""}
                onValueChange={(e) => setLandfillManagerData(landfillManagerList.filter((user) => user.id === e)[0])}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue id="role" placeholder="Select manager from the list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    {landfillManagerList.map((user) => (
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
                const result = await editLandfill(landfillData, landfillManagerData?.id || "");
                if (result) return alert(result);
              }}
            >
              Update Landfill
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
