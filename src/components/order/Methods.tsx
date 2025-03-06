"use client";

import { useAppSelector } from "@/redux/hooks";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useUserInfo } from "@/utils/userContext";
import SubmitButton from "../seller/SubmitButton";
import { useActionState } from "react";
import { createOrderAction } from "@/app/api/order/actions/order";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removePaymentMethod } from "@/redux/features/paymentMethodsSlice";
import { Trash } from "lucide-react";

export default function SelectMethods() {
  const cart = useAppSelector((state) => state.cart);
  const paymentMethod = useAppSelector((state) => state.paymentMethods);
  const [selectedMethod, setSelectedMethod] = useState("");
  const { profile } = useUserInfo();
  const [selectAddress, setSelectAddress] = useState("");
  const router = useRouter();

  const OrderItems = cart.items.map((item) => ({
    productSeller: item.sellerId,
    quantity: item.quantity,
  }));

  const selectedAddress = profile?.addressList.find(
    (address) => address.city === selectAddress
  );
  const ShippingAddress = selectedAddress
    ? {
        street: selectedAddress.street,
        city: selectedAddress.city,
        postalCode: selectedAddress.postalCode,
        location: selectedAddress.location,
      }
    : null;

  const [state, formAction] = useActionState(createOrderAction, {
    message: "",
    success: false,
    errors: {} as Partial<Record<string, string[]>>,
  });

  useEffect(() => {
    if (state.success) {
      router.push("/orders");
    }
  }, [state.success, router]);

  const dispatch = useDispatch();
  function handleRemoveCard(type: string): void {
    const method = paymentMethod.methods.find((method) => method.type === type);
    if (method) {
      dispatch(removePaymentMethod(method.last4));
    }
  }

  return (
    <div>
      <Card>
        <CardContent className="mx-auto my-10 mt-5 flex flex-col gap-6">
          <h2 className="text-2xl text-primary mb-6">Select Payment Method</h2>
          <RadioGroup
            name="paymentMethod"
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            className="grid gap-4"
          >
            {paymentMethod.methods.map((option) => (
              <div key={option.type} className="flex items-center space-x-4">
                <RadioGroupItem value={option.type} id={option.type} />
                <Label
                  htmlFor={option.type}
                  className="flex flex-1 items-center justify-between rounded-lg border p-4 hover:bg-accent cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {option.cardHolder}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {option.last4.slice(0, 4)} **** ****{" "}
                        {option.last4.slice(-4)}
                      </p>
                    </div>
                  </div>
                </Label>
                <button
                  type="button"
                  onClick={() => handleRemoveCard(option.type)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <form action={formAction} className="flex flex-col gap-6">
        <Card>
          <CardContent className="mx-auto my-10 mt-5 flex flex-col gap-6">
            <h2 className="text-2xl text-primary mb-6">Select Address</h2>
            <RadioGroup
              name="addressCity"
              value={selectAddress}
              onValueChange={setSelectAddress}
              className="grid gap-4"
            >
              {profile?.addressList.map((address) => (
                <div key={address.city} className="flex items-center space-x-4">
                  <RadioGroupItem value={address.city} id={address.city} />
                  <Label
                    htmlFor={address.city}
                    className="flex flex-1 items-center justify-between rounded-lg border p-4 hover:bg-accent cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {address.city}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.street}
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {selectAddress && (
          <input
            type="hidden"
            name="shippingAddress"
            value={JSON.stringify(ShippingAddress)}
          />
        )}
        <input
          type="hidden"
          name="deliveryDate"
          value={new Date().toISOString()}
        />
        <input
          type="hidden"
          name="orderItems"
          value={JSON.stringify(OrderItems)}
        />

        <SubmitButton disabled={!selectAddress}>Finish Purchase</SubmitButton>

        {state.errors && Object.keys(state.errors).length > 0 && (
          <div className="text-red-500 text-center">
            {Object.entries(state.errors).map(([field, errors]) => (
              <div key={field}>
                <strong>{field}:</strong> {errors.join(", ")}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
