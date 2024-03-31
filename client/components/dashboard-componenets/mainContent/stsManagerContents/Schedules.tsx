import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { ChakraProvider, theme } from "@chakra-ui/react";
import OptimizedRouteMap from "@/components/maps/OptimizedRoute";
import RouteMap from "@/components/maps/RouteMap";
import STSVehicleList from "@/components/dataTables/StsVehicleList";
import GetStsCoordinateForRoute from "@/components/maps/getStsCoordinateForRoute";
import STSVehicleHistoryList from "@/components/dataTables/STSVehicleHistoryList";

export default function STSManagerSchedules() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-10 grid-flow-row gap-2 lg:gap-4 w-full lg:h-full max-h-max">          
          {/* <div className="col-span-1 row-span-1 min-h-48">
            <EmptyFillContainer>DISPATCH HISTORY</EmptyFillContainer>
          </div> */}
          <div className="col-span-1 lg:row-span-2 lg:col-span-4 min-h-[500px]">
            <EmptyFillContainer>
              <GetStsCoordinateForRoute />
            </EmptyFillContainer>
          </div>
          <div className="lg:col-span-6 min-h-48">
            <EmptyFillContainer>
              <STSVehicleList />
            </EmptyFillContainer>
          </div>
          <div className="lg:col-span-6 min-h-48">
            <EmptyFillContainer>
              <STSVehicleHistoryList />
            </EmptyFillContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
