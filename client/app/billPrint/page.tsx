"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Bill } from "@/components/dataTables/CompletedBillList";
import { Button } from "@/components/ui/button";

const BillPrintComponent = () => {
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState({
    id: "",
    billNo: "",
    stsName: "",
    landFillName: "",
    vehicleNumber: "",
    vehicleType: "",
    weightOfWaste: 0,
    shortage: 0,
    loadedFuelCostPerKm: 0,
    unloadedFuelCostPerKm: 0,
    capacity: 0,
    estimatedFuelCost: 0,
    distance: 0,
    estimatedDuration: 0,
    actualDuration: 0,
    allocatedFuelCost: 0,
    tripId: "",
  });

  useEffect(() => {
    setQueryParams({
      id: searchParams.get("id") || "",
      billNo: searchParams.get("billNo") || "",
      stsName: searchParams.get("stsName") || "",
      landFillName: searchParams.get("landFillName") || "",
      vehicleNumber: searchParams.get("vehicleNumber") || "",
      vehicleType: searchParams.get("vehicleType") || "",
      weightOfWaste: Number(searchParams.get("weightOfWaste")) || 0,
      shortage: Number(searchParams.get("shortage")) || 0,
      loadedFuelCostPerKm: Number(searchParams.get("loadedFuelCostPerKm")) || 0,
      unloadedFuelCostPerKm:
        Number(searchParams.get("unloadedFuelCostPerKm")) || 0,
      capacity: Number(searchParams.get("capacity")) || 0,
      estimatedFuelCost: Number(searchParams.get("estimatedFuelCost")) || 0,
      distance: Number(searchParams.get("distance")) || 0,
      estimatedDuration: Number(searchParams.get("estimatedDuration")) || 0,
      actualDuration: Number(searchParams.get("actualDuration")) || 0,
      allocatedFuelCost: Number(searchParams.get("allocatedFuelCost")) || 0,
      tripId: searchParams.get("tripId") || "",
    });
  }, [searchParams]);

return (
    <>
        <div className="flex  justify-center items-center mt-4 print:mt-0 w-screen print:h-[99vh]">
            <div className="m-4 p-10 border rounded-xl bg-primary-foreground text-primary flex flex-col gap-4 min-w-[500px] max-w-min">
                <div className="flex justify-between items-center mb-2">
                    <span>
                        <b>Bill number:</b>&nbsp; {queryParams.billNo}
                    </span>
                    <img src="logoBlack.png" alt="logo" className="w-16 h-16" />
                </div>
                <div className="flex justify-between">
                    <div>
                        <b>STS:</b> <br /> {queryParams.stsName}{" "}
                    </div>
                    <div className="text-right">
                        <b>Landfill:</b> <br /> {queryParams.landFillName}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <b>Vehicle Number:</b> <br /> {queryParams.vehicleNumber}{" "}
                    </div>
                    <div className="text-right">
                        <b>Vehicle Type:</b> <br /> {queryParams.vehicleType}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <b>Capacity:</b> <br /> {queryParams.capacity} Ton{" "}
                    </div>
                    <div className="text-center">
                        <b>
                            Weight Trasfered: <br /> {queryParams.weightOfWaste} Ton{" "}
                        </b>
                    </div>
                    <div className="text-right">
                        <b>Shortage:</b> <br /> {queryParams.shortage} Ton
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <b>Loaded Fuel Cost:</b> <br /> {queryParams.loadedFuelCostPerKm}{" "}
                        BDT
                    </div>
                    <div className="text-right">
                        <b>Unloaded Fuel Cost:</b> <br />{" "}
                        {queryParams.unloadedFuelCostPerKm} BDT
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <b>Actual Duration:</b> <br /> {queryParams.estimatedDuration} min
                    </div>
                    <div className="text-right">
                        <b>Estimated Duration:</b> <br /> {queryParams.actualDuration} min
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <b>Total Distance:</b> <br /> {queryParams.distance} km
                    </div>
                    <div className="text-right">
                        <b>Estimated Fuel Cost:</b> <br /> {queryParams.estimatedFuelCost}{" "}
                        BDT
                    </div>
                </div>
                <div className="flex justify-center text-lg m-2">
                    <span>
                        <b>ALLOCATED BILL:&nbsp; {queryParams.allocatedFuelCost} BDT </b>
                    </span>
                </div>
            </div>
        </div>
        <div className="flex justify-center mt-4 print:hidden">
            <Button
                onClick={() => window.print()}
                className="bg-primary text-primary-foreground"
            >
                Print
            </Button>
        </div>
    </>
);
};

export default BillPrintComponent;
