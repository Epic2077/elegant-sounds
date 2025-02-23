"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/utils/userContext"; // Assuming this provides address data
import { MapPin } from "lucide-react";
import React from "react";

const ShippingAddressDetail = () => {
  const { profile } = useUserInfo();

  // Check if shipping address exists
  const shippingAddress =
    profile?.addressList && profile?.addressList?.length > 0
      ? profile.addressList[0]
      : null;

  return (
    <Card className="w-full min-w-[450px] max-w-md bg-card rounded-xl shadow-lg p-4">
      <CardHeader className="flex justify-between items-center border-b pb-4">
        <h3 className="text-xl font-semibold text-foreground">
          Shipping Address
        </h3>
      </CardHeader>
      <CardContent className="mt-6">
        {shippingAddress ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted mt-1" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {shippingAddress.address}
                </p>
                {shippingAddress.city && (
                  <p className="text-sm text-gray-600">
                    {shippingAddress.city}, {shippingAddress.state}{" "}
                    {shippingAddress.postalCode}
                  </p>
                )}
                {shippingAddress.country && (
                  <p className="text-sm text-gray-600">
                    {shippingAddress.country}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <MapPin className="w-8 h-8 mb-2" />
            <p className="text-sm">
              No shipping address available. Add one to get started!
            </p>
            <Button variant="outline" className="mt-4">
              Add Address
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingAddressDetail;
