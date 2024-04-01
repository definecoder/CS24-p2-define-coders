"use client";

import { useContext, useEffect } from "react";
import { NavContext } from "@/hooks/contexts/useNavCtx";
import MainSectionHeader from "./mainSectionHeader";
import getDashboardFor from "@/data/mainContentElements/getDashboardFor";



function MainSection({ role = "unassigned" }: { role: string }) {
  const currentState = useContext(NavContext)?.currentActive;

  return (
    <div className="flex flex-col max-w-[100vw]">
      <MainSectionHeader role={role} subsection={currentState} />

      {getDashboardFor(currentState)}
    </div>
  );
}
export default MainSection;
