import { createContext, useState } from "react";

export const AuthContext = createContext<{
  jwtToken: string;
  setJWTToken: (value: string) => void; 
  role: string;
  setRole: (value: string) => void; 
}
>({jwtToken: "", setJWTToken(x:string) {}, role: "", setRole(x:string) {}});