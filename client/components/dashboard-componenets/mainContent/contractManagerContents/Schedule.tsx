import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { ChakraProvider, theme } from "@chakra-ui/react";
import OptimizedRouteMap from "@/components/maps/OptimizedRoute";
import RouteMap from "@/components/maps/RouteMap";
import STSVehicleList from "@/components/dataTables/StsVehicleList";
import GetStsCoordinateForRoute from "@/components/maps/getStsCoordinateForRoute";
import STSVehicleHistoryList from "@/components/dataTables/STSVehicleHistoryList";
import { BillBySTSId } from "@/components/dataTables/BillBySTSId";
import { getCookie } from "@/lib/cookieFunctions";
import { stsId } from "@/data/cookieNames";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarSearchIcon } from "lucide-react";
import useGetAllSTS from "@/hooks/dataQuery/useGetAllSTS";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScheduleByContractor } from "@/components/dataTables/ScheduleByContractor";

export default function ContractorManagerSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  function formatDate(dateString: string | undefined) {
    if (!dateString) return undefined;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so +1 and pad with 0
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <EmptyFillContainer>
        <div className="flex justify-center gap-4 items-center mb-5 flex-wrap content-center">
          SELECT DATE OF SCHEDULE :
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className="flex gap-2">
                <CalendarSearchIcon />{" "}
                {formatDate(date?.toDateString()) || "Select a Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>
        <EmptyFillContainer>
          <ScheduleByContractor date={formatDate(date?.toDateString()) || ""} />            
        </EmptyFillContainer>
      </EmptyFillContainer>
    </main>
  );
}
