import { ArrowRight, TicketPercent } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotificationBar = () => {
  return (
    <div className="w-screen flex justify-center items-center h-8 bg-black z-30 gap-3">
      <TicketPercent className="w-5 h-5" />
      <p className="text-xs text-white font-semibold">
        30% off storewide — Limited time!
      </p>
      <Link
        href="/shop"
        className="flex gap-2 text-xs items-center text-primary underline"
      >
        Shop Now
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
};

export default NotificationBar;
