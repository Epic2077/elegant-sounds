import React from "react";

interface StatusCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, icon }) => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="tracking-tight text-sm font-medium">{title}</div>
        <div className="text-sm">{icon}</div>
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default StatusCard;
