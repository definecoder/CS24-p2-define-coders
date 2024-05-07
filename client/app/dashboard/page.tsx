"use client";

import { NavContext } from "@/hooks/contexts/useNavCtx";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/dashboard-componenets/sidebar/Sidebar";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import MainSection from "../../components/dashboard-componenets/mainContent/mainSection";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/cookieFunctions";
import { curActive, role, stsId, username, landfillId } from "@/data/cookieNames";
import { set } from "react-hook-form";
import AppLogo from "../auth/login/AppLogo";
import { darkestColor } from "@/data/constant";

export default function Dashboard() {
  const [curRole, setCurrentRole] = useState("");
  const [currentActive, setCurrentActive] = useState("");
  const router = useRouter();

  useEffect(() => {
    setCurrentRole(getCookie(role));
    setCurrentActive(getCookie(curActive));
  }, []);

  //console.log('Role: ' + curRole + ' Current Active: ' + currentActive);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavContext.Provider value={{ currentActive, setCurrentActive }}>
        {(curRole === stsManager && getCookie(stsId) === "") || (curRole === landfillManager && getCookie(landfillId) === "") ? (
          <>
            <div className="w-screen h-screen flex flex-col justify-center items-center text gap-4">
              <div className="h-24 w-24 only:md:h-32 md:w-32 mb-4">
                <AppLogo />
              </div>
              <h1 className="text-xl sm:text-xl lg:text-3xl font-semibold">
                Welcome {getCookie(username)}
              </h1>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold">
                You are not assigned to any {curRole === stsManager ? "STS" : "Landfill"}
              </h1>
              <h1 className="text-md sm:text-lg lg:text-2xl">
                Contact admin for being assigned to a {curRole === stsManager ? "STS" : "Landfill"}
              </h1> 
              <button
                onClick={() => router.push("/auth/login")}
                className={`bg-[${darkestColor}] text-white font-semibold px-4 py-2 rounded-md`}
              >
                Logout
              </button>                                
            </div>
          </>
        ) : (
          <>
            <Sidebar role={curRole} />
            <MainSection role={curRole} />
          </>
        )}
        
      </NavContext.Provider>
    </div>
  );
}
