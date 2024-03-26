"use client";

import { NavContext } from "@/hooks/contexts/useNavCtx";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/dashboard-componenets/sidebar/Sidebar";
import { admin , landfillManager, stsManager, unassigned } from "@/data/roles";
import MainSection from "../../components/dashboard-componenets/mainContent/mainSection";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/cookieFunctions";

export default function Dashboard() {

  const curRole = getCookie('role') || "";
  const [currentActive, setCurrentActive] = useState(curRole === unassigned ? unassigned + "-My Profile" : curRole + "-Dashboard");  
  const router = useRouter();

  if(curRole === ""){
    alert('Please login first');
    router.push('/auth/login');
  }

  console.log('Role: ' + curRole + ' Current Active: ' + currentActive);
        
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">      
      <NavContext.Provider value={{currentActive, setCurrentActive}}>
        <Sidebar role={curRole}/>
        <MainSection role={curRole}/>
      </ NavContext.Provider>
    </div>
  );
}
