"use client";

import { useContext } from "react";
import { NavContext } from "@/hooks/contexts/useNavCtx";
import { getSidebarElements } from "@/data/sidebarElements/getSidebarByRole";
import SidebarHeader from "./sidebarHeader";
import { SidebarItem } from "./SidebarItem";
import { SidbarFooter } from "./SidbarFooter";

function SideBar({role}: {role: string}) {
  const { currentActive, setCurrentActive } = useContext(NavContext);

  const SidebarItemList = getSidebarElements(role);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        
        <SidebarHeader role={role}/>

        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {SidebarItemList.map((item, index) => (
              <SidebarItem
                key={index}
                Icon={item.Icon}
                title={item.title}
                active={currentActive.endsWith(item.title)}
                onclick={() => setCurrentActive(role + "-" + item.title)}
              />
            ))}
          </nav>
        </div>

        <SidbarFooter />        
      </div>
    </div>
  );
}
export default SideBar;
