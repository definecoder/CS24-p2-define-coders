import { createContext, useState } from "react";

export const NavContext = createContext<{
  currentActive: number;
  setCurrentActive: (value: number) => void;  
}
>({currentActive: 0, setCurrentActive(x:number) {} });