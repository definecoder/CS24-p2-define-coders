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
import React, { useState } from "react";
import { Trash } from "lucide-react";
import deleteUser from "@/hooks/user_data/deleteUser";
import { message } from "antd";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export const DeleteUserModal = ({ userInfo }: { userInfo: User }) => {
  const [confirmText, setConfirmText] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" title={"Remove " + userInfo.username} className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            Confirm Delete User?
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4 flex flex-col justify-center items-start text-left p-4 rounded-lg border shadow-xl text-md">
              <h1>
                <span className="font-bold">ID: </span>
                {userInfo.id}
              </h1>
              <p>
                <span className="font-bold">Username: </span>
                {userInfo.username}
              </p>
              <p>
                <span className="font-bold">Email: </span>
                {userInfo.email}
              </p>
              <p>
                <span className="font-bold">Role: </span>
                {userInfo.role}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col justify-center items-start text-left gap-4 p-8">
              <Label htmlFor="username" className="text-right">
                Type "CONFIRM" to remove {userInfo.username}
              </Label>
              <Input
                id="confirmation"
                type="text"
                placeholder="CONFIRM"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={async () => {
                if (confirmText !== "CONFIRM")
                  return message.error("Please type 'CONFIRM' to confirm");
                const result = await deleteUser(userInfo.id);
                if (result) return message.success(result);
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
