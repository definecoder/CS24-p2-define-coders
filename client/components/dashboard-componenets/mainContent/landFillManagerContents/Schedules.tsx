"use client";
import GoogleMapComponent from '@/components/maps/GoogleMap'
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import LanfFillUpcomingVehicles from "../../../dataTables/LandFillUpcomingVehicle";
import LandFillDeliveredVehicles from "../../../dataTables/LandFillDeliveredVehicles"
import { AllStsMapShow } from '@/components/maps/AllStsShow';

export default function LandfillManagerSchedules() {
  // const coordinates = [
  //   { lat: 23.7031879, lng: 90.35564201 },
  //   { lat: 23.6856870, lng: 90.44630134 },
  //   { lat: 23.6843407, lng: 90.56538359 },
  //   { lat: 23.7588160, lng: 90.52911986 },
  //   { lat: 23.7592645, lng: 90.42032866 },
  //   { lat: 23.7615071, lng: 90.38945549 },
  //   { lat: 23.7888633, lng: 90.36152261 }
  // ];

  // const dumpFills = [30, 25, 81, 45, 70, 50, 90, 60];
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 grid-flow-row gap-2 md:gap-4 w-full md:h-full max-h-max">
        <div className="col-span-2 row-span-1 min-h-48">
            <EmptyFillContainer>UPCOMING - CRITICAL FIRST SCHEDULES

            <LanfFillUpcomingVehicles />
            </EmptyFillContainer>
            
          </div>
          <div className="col-span-1 row-span-1 min-h-48">
            <EmptyFillContainer>DISPATCH HISTORY
              <LandFillDeliveredVehicles />
              
            </EmptyFillContainer>
          </div>
          <div className="col-span-1 row-span-1 min-h-48">
            <EmptyFillContainer>MAP TRACKING
            <AllStsMapShow />
            </EmptyFillContainer>
          </div>          
        </div>
      </div>
    </main>
  );
}
