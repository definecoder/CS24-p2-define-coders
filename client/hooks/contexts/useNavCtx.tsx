import { createContext, useState } from "react";

export const NavContext = createContext<{
  currentActive: string;
  setCurrentActive: (value: string) => void;  
}
>({currentActive: "unassigned-dashboard", setCurrentActive(x:string) {} });