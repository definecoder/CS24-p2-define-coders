"use client";

import { useContext, useEffect } from "react";
import { NavContext } from "@/hooks/contexts/useNavCtx";
import { Button } from "@/components/ui/button";
import MainSectionHeader from "./mainSectionHeader";

function MainSection({role = "unassigned"}: {role: string}) {

  const activeValue = useContext(NavContext)?.currentActive;  

  return (
    <div className="flex flex-col">
        
        <MainSectionHeader role={role} subsection={activeValue}/>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">{activeValue}</h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
          </div>
        </main>
      </div>
  )
}
export default MainSection