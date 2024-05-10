"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { jwtToken, role } from "@/data/cookieNames";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import EmptyFillContainer from "../dashboard-componenets/cards/EmptyFillContainer";
import { getCookie } from "@/lib/cookieFunctions";
import { admin } from "@/data/roles";
import { Button } from "../ui/button";
import { baseUrl } from "@/data/apiRoutes";

const dummyDataArray: ScheduleEntry[] = [
  {
    time: "10:00 AM",
    vehicleNumber: "MH12AB1234",
    vehicleType: "Truck",
    landFillName: "Landfill 1",
    amount: "50 tons",
    duration: "2 hours",
  },
  {
    time: "12:00 PM",
    vehicleNumber: "MH12AB1235",
    vehicleType: "Van",
    landFillName: "Landfill 2",
    amount: "30 tons",
    duration: "1.5 hours",
  },
  {
    time: "02:00 PM",
    vehicleNumber: "MH12AB1236",
    vehicleType: "Truck",
    landFillName: "Landfill 3",
    amount: "60 tons",
    duration: "2.5 hours",
  },
  {
    time: "04:00 PM",
    vehicleNumber: "MH12AB1237",
    vehicleType: "Van",
    landFillName: "Landfill 4",
    amount: "40 tons",
    duration: "2 hours",
  },
  {
    time: "06:00 PM",
    vehicleNumber: "MH12AB1238",
    vehicleType: "Truck",
    landFillName: "Landfill 5",
    amount: "70 tons",
    duration: "3 hours",
  },
  {
    time: "08:00 PM",
    vehicleNumber: "MH12AB1239",
    vehicleType: "Van",
    landFillName: "Landfill 6",
    amount: "35 tons",
    duration: "1.5 hours",
  },
  {
    time: "10:00 PM",
    vehicleNumber: "MH12AB1240",
    vehicleType: "Truck",
    landFillName: "Landfill 7",
    amount: "55 tons",
    duration: "2.5 hours",
  },
];

type ScheduleEntry = {
  time: string;
  vehicleNumber: string;
  vehicleType: string;
  landFillName: string;
  amount: string;
  duration: string;
};

export function BillBySTSId({ stsId, date }: { stsId: string; date: string }) {
  const [scheduleData, setSchedulData] = useState<ScheduleEntry[]>([]);
  const [stsName, setStsName] = useState<string>("");

  async function fetchStsScheduleData() {
    if (!date || !stsId || stsId === "") {
      return;
    }
    try {
      // fetch data from api
      const res: any = await axios.get(
        baseUrl + "/schedules/search?date=" +
          date +
          "&stsId=" +
          stsId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(jwtToken)}`,
          },
        }
      );
      const data = res.data.map((d: any) => ({
        time: d.scheduleTime,
        vehicleNumber: d.vehicle?.vehicleNumber ?? "N/A",
        vehicleType: d.vehicle?.vehicleType ?? "N/A",
        landFillName: d.vehicle?.landFill?.name ?? "N/A",
        amount: d.wasteAmount ?? "N/A",
        duration: d.vehicle?.duration ?? "N/A",
      }));
      setStsName(res.data[0].sts?.name);
      setSchedulData(data);
    } catch (error: any) {
      message.error(error?.response?.data?.message || error);
    }
  }

  async function generateSchedule() {
    try {
      // fetch data from api
      const res: any = await axios.post(
        baseUrl + "/schedules/create/" + date,        
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(jwtToken)}`,
          },
        }
      );
      message.success("schedule generated successfully");
      fetchStsScheduleData();
    } catch (error: any) {
      message.error(error?.response?.data?.message || error);
    }
  }

  useEffect(() => {
    setSchedulData([]);
    fetchStsScheduleData();
  }, []);

  useEffect(() => {}, [scheduleData]);

  useEffect(() => {
    setSchedulData([]);
    fetchStsScheduleData();
  }, [date, stsId]);

  return (
    <>
      {scheduleData[0] ? (
        <div className="flex flex-col items-center justify-center w-full text-center">
          <h1 className={`font-bold text-2xl text-[#1A4D2E] mb-[-7px]`}>EcoSync</h1>
          <h6 className="italic text-md mt-2">Date: {date} </h6>
          <h2 className="font-bold text-2xl"> SCHEDULE FOR WASTE TRANSFER </h2>
          <h3 className="font-semibold text-lg mb-4"> {stsName} </h3>
          <Table>
            <TableCaption>
              Schedule of {stsName} for {date}.
            </TableCaption>
            <TableHeader className="bg-slate-100 font-bold text-black text-md">
              <TableRow>
                <TableHead className="text-center">Time</TableHead>
                <TableHead className="text-center">Vehicle Number</TableHead>
                <TableHead className="text-center">Vehicle Type</TableHead>
                <TableHead className="text-center">Landfill Name</TableHead>
                <TableHead className="text-center">Duration</TableHead>
                <TableHead className="text-center">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduleData.map((data, i) => (
                <TableRow key={i} className="text-center">
                  <TableCell>{data.time}</TableCell>
                  <TableCell>{data.vehicleNumber}</TableCell>
                  <TableCell>{data.vehicleType}</TableCell>
                  <TableCell>{data.landFillName}</TableCell>
                  <TableCell>{data.duration} minutes</TableCell>
                  <TableCell>{data.amount} tons</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} className="text-right font-bold">
                  Total Waste :{" "}
                </TableCell>
                <TableCell>
                  {scheduleData.reduce(
                    (total, data) => total + parseInt(data.amount),
                    0
                  )}{" "}
                  tons
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <EmptyFillContainer className="flex justify-center items-center text-2xl font-bold text-center flex-col gap-5 min-h-96 bg">
          No schedule generated by Admin for {stsId} on {date}.
          {getCookie(role) === admin && (
            <Button 
              onClick={generateSchedule}
              className={`bg-[#1A4D2E]`}
            >
              {" "}
              Generate Schedule{" "}
            </Button>
          )}
        </EmptyFillContainer>
      )}
    </>
  );
}
