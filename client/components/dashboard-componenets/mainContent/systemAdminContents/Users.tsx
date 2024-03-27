"use client";

import * as React from "react";

import useAddNewUser from "@/hooks/user_data/useAddNewUser";
import { AddNewUserModal } from "@/components/modals/userControls/AddNewUserModal";
import UserListTable from "@/components/dataTables/UserList";

export default function AdminUserManagementPanel() {
  const { createNewUser, roles, setUserData, userData } = useAddNewUser();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">User</h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <AddNewUserModal
            props={{ createNewUser, roles, setUserData, userData }}
          />
        </div>
      </div>
      <div className="flex flex-1 items-start justify-center rounded-lg border border-dashed shadow-sm px-6">
        <div className="w-full">
          <UserListTable />
        </div>
      </div>
    </main>
  );
}
