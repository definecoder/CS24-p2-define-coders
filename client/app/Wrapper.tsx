"use client";
import { AuthContext } from "@/hooks/contexts/useAuthCtx";
import { ReactNode, useState } from "react";

export default function Wrapper ({children}: {children: ReactNode}){
  const [jwtToken, setJWTToken] = useState("");
  const [role, setRole] = useState("");

  return (    
      <AuthContext.Provider value={{ jwtToken, setJWTToken, role, setRole }}>
        <>{children}</>
      </AuthContext.Provider>    
  );
}
