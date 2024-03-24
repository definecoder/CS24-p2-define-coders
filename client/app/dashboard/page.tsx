"use client";
import Sidebar from "./sidebar";
import MainContent from "./mainContent";

import { NavContext } from "@/hooks/contexts/useNavCtx";
import { useState } from "react";

export default function Dashboard() {
  const [currentActive, setCurrentActive] = useState(0);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavContext.Provider value={{currentActive, setCurrentActive}}>
        <Sidebar role="admin"/>
        <MainContent role="admin"/>
      </ NavContext.Provider>
    </div>
  );
}
