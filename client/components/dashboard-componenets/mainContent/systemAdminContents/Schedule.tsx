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
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { BillBySTSId } from "@/components/dataTables/BillBySTSId";
import useGetAllSTS from "@/hooks/dataQuery/useGetAllSTS";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AdminSchedulePanel() {
  const { stsData } = useGetAllSTS();
  const [selectedSTS, setSelectedSTS] = useState<string | null>();
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
    <main className="flex flex-1 flex-col p-4 lg:p-6 max-h-[calc(100vh-60px)] overflow-scroll items-center">
      <div className="flex justify-center gap-4 items-center mb-5 flex-wrap content-center">
        SEE SCHEDULE FOR :
        <Select
          value={selectedSTS || ""}
          onValueChange={(e) => {
            setSelectedSTS(e);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a STS" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>STS</SelectLabel>
              {stsData.map((sts) => (
                <SelectItem key={sts.id} value={sts.id}>
                  {sts.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>        
        AND DATE :
        <Popover>
          <PopoverTrigger asChild>          
            <Button variant={"outline"} className="flex gap-2">
              <CalendarSearchIcon /> {formatDate(date?.toDateString()) || "Select a Date" }
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

      <div className="flex flex-col items-center justify-center w-full">
        <BillBySTSId
          stsId={selectedSTS || ""}
          date={formatDate(date?.toDateString()) || ""}
        />
      </div>
    </main>
  );
}
