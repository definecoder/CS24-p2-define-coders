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
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

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
    try {
      // fetch data from api
      const res: any = await axios.get(
        "http://localhost:8585/schedules/search?date=2024-01-5&stsId=sts1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data.map((d: any) => ({
        time: d.scheduleTime,
        vehicleNumber: d.vehicle?.vehicleNumber ?? 'N/A',
        vehicleType: d.vehicle?.vehicleType ?? 'N/A',
        landFillName: d.vehicle?.landFill?.name ?? 'N/A',
        amount: d.wasteAmount ?? 'N/A',
        duration: d.vehicle?.duration ?? 'N/A',
      }));
      setStsName(res.data[0].sts?.name);
      setSchedulData(data);
    } catch (error: any) {
      message.error(error?.response?.data?.message || error);
    }
  }

  useEffect(() => {
    fetchStsScheduleData();
  }, []);

  return (
    <Table>
      <TableCaption>Schedule of {stsName} for 12/12/2020.</TableCaption>
      <TableHeader className="bg-slate-100 font-bold text-black text-md">
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Vehicle Number</TableHead>
          <TableHead>Vehicle Type</TableHead>
          <TableHead>Landfill Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scheduleData.map((data, i) => (
          <TableRow key={i}>
            <TableCell>{data.time}</TableCell>
            <TableCell>{data.vehicleNumber}</TableCell>
            <TableCell>{data.vehicleType}</TableCell>
            <TableCell>{data.landFillName}</TableCell>
            <TableCell>{data.duration}</TableCell>
            <TableCell>{data.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell>500 tons</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
