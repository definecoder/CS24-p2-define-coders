"use client";
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
import React, { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

import useGetSTSAvailableVehicles from "@/hooks/vehicles/useSTSAvailableVehicles";
import { message } from "antd";
import useGetAllArea from "@/hooks/dataQuery/useGetAllArea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { apiRoutes } from "@/data/apiRoutes";
import { stsId } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";

interface DialogWrapperProps {
  children: React.ReactNode;
}

export const AddNewRouteModal: React.FC<DialogWrapperProps> = ({ children }) => {
  const [areaId, setAreaId] = useState("");
  const [RouteName, setRouteName] = useState("");
  const [RouteDetails, setRouteDetails] = useState("");
  const { areaData, fetchAllArea } = useGetAllArea();
  const handleSaveChanges = async () => {    
    axios.post(apiRoutes.route.create, { name:RouteName, stsId:getCookie(stsId), description: RouteDetails, areaId: areaId }, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        },
        }).then((res) => {
          console.log(res.data);
          message.success("Area added successfully!");    
          window.location.reload();
        }).catch((err) => {
          console.log(err);
          message.error("Failed to add area!");
        });    
  };

  useEffect(() => {
    fetchAllArea();
  }, []);

  useEffect(() => {
    console.log(areaData);
  }, [areaData]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="w-[825px]">
        <DialogHeader>
          <DialogTitle>Add New Route</DialogTitle>
          <DialogDescription>
            Add new route here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-flow-row grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicleNumber" className="text-right col-span-1">
              Route Name
            </Label>
            <Input
              id="vehicleNumber"
              placeholder="Enter Route Name"
              value={RouteName}
              onChange={(e) => setRouteName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Select Area
              </Label>
              <Select
                value={areaId}
                onValueChange={(e) => setAreaId(e)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue
                    id="role"
                    placeholder="Select area of the route"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    {areaData?.map((area: any, index) => (
                      <SelectItem key={index} value={area.id}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-flow-row grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicleNumber" className="text-right col-span-1">
              Route Details
            </Label>
            <Input
              id="vehicleNumber"
              placeholder="Enter Route Details"
              value={RouteDetails}
              onChange={(e) => setRouteDetails(e.target.value)}
              className="col-span-3"
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
