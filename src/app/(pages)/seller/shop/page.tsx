import { OverviewStat } from "@/components/seller/charts/OverviewStat";
import { PieChartStat } from "@/components/seller/charts/PieChart";
import OverviewHeader from "@/components/seller/header/OverviewHeader";
import Status from "@/components/seller/overview/Status";

import React from "react";

const Shop = () => {
  return (
    <div className=" py-1">
      <OverviewHeader />
      <div className="space-y-2">
        <Status />
      </div>
      <div className="flex mt-6 gap-6">
        <div className="mx-auto">
          <OverviewStat />
        </div>
        <div>
          <PieChartStat />
        </div>
      </div>
    </div>
  );
};

export default Shop;
