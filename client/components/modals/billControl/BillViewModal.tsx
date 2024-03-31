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
import ReactToPrint from 'react-to-print';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { use, useEffect, useState } from "react";
import { EditIcon, PrinterIcon, Trash } from "lucide-react";
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
import useGetAllLandfill from "@/hooks/dataQuery/useGetAllLandfill";
import editVehicle from "@/hooks/vehicles/editVehicle";
import makeBill from "@/hooks/bills/makeBill";
import { Bill } from "@/components/dataTables/CompletedBillList";
import Link from "next/link";

export const BillViewModal = ({ billInfo }: { billInfo: Bill }) => {
    const componentRef = React.useRef();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          title="Print or Download Bill"
          className="h-8 w-8 p-0"
        >
          <PrinterIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="mt-4 text-xl sm:text-2xl">
            Print Bill
          </DialogTitle>
          <DialogDescription>
            This is the bill for the trip {billInfo.tripId}
          </DialogDescription>
        </DialogHeader>
        <form>
        
          <div className="m-4 p-4 border bg-primary-foreground text-primary flex flex-col gap-4 max-w-[525px]">          
          <div className="flex justify-between items-center mb-2">              
          
                <span><b>Bill number:</b>&nbsp; {billInfo.billNo}</span>              
                <img src="logoBlack.png" alt="logo" className="w-16 h-16" />
            </div>
            <div className="flex justify-between">
              <div>
                <b>STS:</b> <br /> {billInfo.stsName}{" "}
              </div>
              <div className="text-right">
                <b>Landfill:</b> <br /> {billInfo.landFillName}
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Vehicle Number:</b> <br /> {billInfo.vehicleNumber}{" "}
              </div>
              <div className="text-right">
                <b>Vehicle Type:</b> <br /> {billInfo.vehicleType}
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Capacity:</b> <br /> {billInfo.capacity} Ton{" "}
              </div>
              <div className="text-center">
                <b>
                  Weight Trasfered: <br /> {billInfo.weightOfWaste} Ton{" "}
                </b>
              </div>
              <div className="text-right">
                <b>Shortage:</b> <br /> {billInfo.shortage} Ton
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Loaded Fuel Cost:</b> <br /> {billInfo.loadedFuelCostPerKm}{" "}
                BDT
              </div>
              <div className="text-right">
                <b>Unloaded Fuel Cost:</b> <br />{" "}
                {billInfo.unloadedFuelCostPerKm} BDT
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Actual Duration:</b> <br /> {billInfo.estimatedDuration} min
              </div>
              <div className="text-right">
                <b>Estimated Duration:</b> <br /> {billInfo.actualDuration} min
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Total Distance:</b> <br /> {billInfo.distance} km
              </div>
              <div className="text-right">
                <b>Estimated Fuel Cost:</b> <br /> {billInfo.estimatedFuelCost}{" "}
                BDT
              </div>
            </div>
            <div className="flex justify-center text-lg m-2">
            <span><b>ALLOCATED BILL:&nbsp; {billInfo.allocatedFuelCost} BDT </b></span>
            </div>
          </div>
          
        
          <DialogFooter>
            <div className="w-full flex justify-center mt-2">

            <Link href={{ pathname: '/billPrint', query: { ...billInfo } }}>
            <Button
              type="submit"              
            >
              PRINT BILL
            </Button>
            </Link>    
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
