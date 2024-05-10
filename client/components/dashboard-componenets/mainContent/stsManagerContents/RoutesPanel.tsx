import { Button } from "@/components/ui/button";
import EmptyFillContainer from "../../cards/EmptyFillContainer";
import { ArrowDown, Cog, Map, Send, Truck, UserRoundCog } from "lucide-react";
import { stsId } from "@/data/cookieNames";
import useGetstsDatabyID from "@/hooks/StsDashboard/getStsDataById";
import { useEffect } from "react";
import { getCookie } from "@/lib/cookieFunctions";

import { AddNewAreaModal } from "@/components/modals/stsControl/addNewArea";
import { AddNewRouteModal } from "@/components/modals/stsControl/AddNewRoute";
import useGetAllArea from "@/hooks/dataQuery/useGetAllArea";

export default function RoutesPanel() {
  const { areaData, fetchAllArea } = useGetAllArea();
  const areas = [
    "akhalia",
    "akhalia",
    "akhalia",
    "akhalia",
    "akhalia",
    "akhalia",
    "akhalia",
  ];
  const routes = [
    {
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    },
    {
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    },
    {
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    },
    {
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    },{
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    },
    {
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    },
    {
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    },
    {
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    },
    {
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    },
    {
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    },
    {
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    },
    {
      area: "akhalia",
      description: "akhalia to akhalia to akhalia",
      name: "Route 1",
    }        
  ];

  useEffect(() => {
    fetchAllArea();
  }, []);

  useEffect(() => {}, [areaData]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-xl hidden md:block">
          AREA AND ROUTES
        </h1>
        <div className="flex-grow-1"></div>
        <div className="flex gap-2">
          <AddNewAreaModal>
            <Button size="sm" className={`w-full text-white bg-[#1A4D2E]`}>
              <Map size={16} className="mr-2" />
              ADD NEW AREA
            </Button>
          </AddNewAreaModal>
          <AddNewRouteModal>
            <Button size="sm" className={`w-full text-white bg-[#1A4D2E]`}>
              <Truck size={16} className="mr-2" />
              ADD NEW ROUTE
            </Button>
          </AddNewRouteModal>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-10 grid-flow-row gap-2 lg:gap-4 w-full lg:h-full max-h-max">
          <div className="col-span-1 lg:col-span-3 min-h-[200px]">
            <EmptyFillContainer>
              <h1 className="pl-6 pt-6 text-2xl font-bold">AREA LISTS</h1>
              <br />
              <div className="flex flex-wrap gap-4 mt-4 ml-4 pb-6">
                {areaData.map((area, index) => (
                  <div className="bg-slate-200 px-6 py-2 rounded-xl shadow-lg">
                    <p className="text-sm font-semibold">{area.name}</p>
                  </div>
                ))}
              </div>
            </EmptyFillContainer>
          </div>
          <div className="lg:col-span-7 min-h-48">
            <EmptyFillContainer>
              <h1 className="pl-6 pt-6 text-2xl font-bold">ROUTES LIST</h1>
              <br />
              <div className="flex flex-wrap gap-4 mt-4 ml-4">
                {routes.map((route, index) => (
                  <div className="bg-slate-100 px-4 py-2 rounded-lg shadow-md w-full md:w-auto">
                    <p className="text-2xl font-bold text-blue-800">{route.name}</p>
                    <p className="text-lg text-slate-500 font-semibold">{route.area}</p>
                    <p className="text-md">{route.description}</p>
                  </div>
                ))}
              </div>
            </EmptyFillContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
