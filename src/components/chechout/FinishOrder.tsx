"use client";

import { useAppSelector } from "@/redux/hooks";
import { useUserInfo } from "@/utils/userContext";
import React, { useState, useEffect } from "react";
import SubmitButton from "../seller/SubmitButton";
import { useRouter } from "next/navigation";

const FinishOrder = () => {
  const { profile } = useUserInfo();
  const paymentMethod = useAppSelector((state) => state.paymentMethods);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!profile?.addressList || profile?.addressList?.length === 0) {
      setError("Please add an address to continue");
    } else if (paymentMethod.methods.length === 0) {
      setError("Please add a payment method to continue");
    } else {
      setError("");
    }
  }, [profile?.addressList, paymentMethod.methods]);

  function onsubmit() {
    router.push("/order");
  }

  return (
    <div className="mx-auto my-10 mt-5 flex flex-col gap-6">
      {error && <p className="text-destructive">{error}</p>}
      {!!profile?.addressList &&
      profile?.addressList?.length > 0 &&
      paymentMethod.methods.length > 0 ? (
        <SubmitButton onClick={onsubmit} className="w-96">
          Finish Checkout
        </SubmitButton>
      ) : null}
    </div>
  );
};

export default FinishOrder;
