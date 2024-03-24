"use client"
import React, { useState } from "react";
import BarChart from "./BarChart";

import { UserData } from "./Data";

interface ChartDataItem {
  id: number;
  year: number;
  userGain: number;
  userLost: number;
}

const CircularBarGraph = () => {
  const [userData, setUserData] = useState<ChartDataItem[]>(UserData);


  return (
    <div className="flex">
      <div className="w-[700px]">
        <BarChart chartData={userData} />
      </div>
    </div>
  );
};

export default CircularBarGraph;
