"use client";

import { NavContext } from "@/hooks/contexts/useNavCtx";
import { useState } from "react";
import Sidebar from "../../components/dashboard-componenets/sidebar/Sidebar";
import { admin , landfillManager, stsManager, unassigned } from "@/data/roles";
import MainSection from "../../components/dashboard-componenets/mainContent/mainSection";

export default function Dashboard() {
  const curRole = admin;
  const [currentActive, setCurrentActive] = useState(curRole + "-Dashboard");
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavContext.Provider value={{currentActive, setCurrentActive}}>
        <Sidebar role={curRole}/>
        <MainSection role={curRole}/>
      </ NavContext.Provider>
    </div>
  );
}
