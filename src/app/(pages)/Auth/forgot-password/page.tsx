import ForgotPassword from "@/components/auth-components/forgot-form";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

const page = () => {
  return (
    <div className="relative">
      <div className="relative z-10">
        <ForgotPassword />
      </div>
      <div className="absolute inset-0 z-0">
        <BackgroundBeams />
      </div>
    </div>
  );
};

export default page;
