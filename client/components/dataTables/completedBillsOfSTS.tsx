"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllVehicleList from "@/hooks/vehicles/useGetAllVehicleList";
import { DeleteVehicleModal } from "../modals/vehicleControl/DeleteVehicleModal";
import { EditVehicleInfoModal } from "../modals/vehicleControl/EditVehicleInfoModal";
import useGetAllPendingBillList from "@/hooks/bills/useGetAllPendingBillList";
import { Package, PackageCheck, PackageX } from "lucide-react";
import { getCookie } from "@/lib/cookieFunctions";
import { landfillId, landfillName, stsName } from "@/data/cookieNames";
import { BillCreationModal } from "../modals/billControl/BillCreationModal";
import useGetAllCompletedBillList from "@/hooks/bills/useGetAllCompletedBillList";
import { BillViewModal } from "../modals/billControl/BillViewModal";
import useGetAllSTSBills from "@/hooks/bills/useGetAllSTSBills";

export type Bill = {
  id: string;
  billNo: string;
  stsName: string;
  landFillName: string;
  vehicleNumber: string;
  vehicleType: string;
  weightOfWaste: number;
  shortage: number;
  loadedFuelCostPerKm: number;
  unloadedFuelCostPerKm: number;
  capacity: number;
  estimatedFuelCost: number;
  distance: number;
  estimatedDuration: number;
  actualDuration: number;
  allocatedFuelCost: number;
  tripId: string;
};

export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: "contractorName",
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            className="text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Contractor
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("contractorName")}</div>
    ),
  },
  {
    accessorKey: "weightRequired",
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            className="text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Required Weight
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("weightRequired")}
      </div>
    ),
  },
  {
    accessorKey: "weightCollected",
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            className="text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Collected Weight
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("weightCollected")}</div>
    ),
  },
  {
    accessorKey: "paymentAmount",
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            className="text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Payment amount
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("paymentAmount")}
      </div>
    ),
  },
  {
    accessorKey: "fine",
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            className="text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fine Charged
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("fine")}
      </div>
    ),
  },    
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const bill: any = row.original;

      return (
        <div>
          {/* <DeleteVehicleModal vehicleInfo={vehicle} />          
            <EditVehicleInfoModal vehicleInfo={vehicle} /> */}
          <BillViewModal billInfo={
            {
                "id": "cebc478f-27b5-4b87-9077-e113cd0d8786",
                "billNo": "B123",
                "stsName": getCookie(stsName) || "",
                "landFillName": bill.contractorName,
                "vehicleNumber": "V123",
                "vehicleType": "Type1",
                "weightOfWaste": bill.weightCollected,
                "shortage": bill.weightRequired - bill.weightCollected,
                "loadedFuelCostPerKm": 1000,
                "unloadedFuelCostPerKm": 500,
                "capacity": 1000,
                "estimatedFuelCost": 200,
                "distance": 20,
                "estimatedDuration": 30,
                "actualDuration": 35,
                "allocatedFuelCost": bill.paymentAmount,
                "tripId": "T123"
              }
          } />
          
        </div>
      );
    },
  },
];

export default function CompletedBillListOfSTS() {
  const [data, setData] = React.useState<Bill[]>([]);
  const { billList, getbillList } = useGetAllSTSBills();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    getbillList(
      getCookie(landfillId) || "",
    );
  }, []);

  React.useEffect(() => {
    setData(billList);
  }, [billList]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <>
      <div className="font-bold text-2xl w-full text-center">
        COMPLETED BILL LIST
      </div>
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Search by vehicle number..."
          value={
            (table.getColumn("vehicleNumber")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("vehicleNumber")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter Vehicles <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {billList.length > 0 ? (
                    <div className="flex items-center justify-center text-muted-foreground gap-3 text-lg">
                      <PackageX />
                      No bills include this vehicle number.
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-muted-foreground gap-3 text-lg">
                      <PackageCheck />
                      No pending bills.
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total {table.getFilteredRowModel().rows.length} row(s) rendered.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
