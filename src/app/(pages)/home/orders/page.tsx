"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { IOrder, IOrderItem } from "@/app/api/dashboard/server-api/types";
import { fetchOrdersAction } from "@/app/api/order/actions/order";
import Image from "next/image";

export default function OrderList() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrdersAction();
        console.log("Orders data:", data);
        console.log("First order items:", data[0]?.orderItems);
        setOrders(data);
      } catch (err) {
        console.error("Error loading orders:", err);
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 min-h-screen mt-24">
      <h1 className="text-3xl font-bold">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No orders found</div>
      ) : (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      )}
    </div>
  );
}

function OrderCard({ order }: { order: IOrder }) {
  const totalAmount = order.orderItems.reduce((acc, item) => {
    const price = item.productSeller.price - item.productSeller.discount;
    return acc + price * item.quantity;
  }, 0);

  return (
    <Card className="hover:shadow-lg transition-shadow min-h-screen mt-24">
      <CardHeader className="border-b p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg">
              Order #{order._id.slice(-6).toUpperCase()}
            </CardTitle>
            <div className="text-sm text-gray-500">
              Ordered: {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="space-y-2">
            <Badge variant={getStatusVariant(order.orderStatus)}>
              {order.orderStatus}
            </Badge>
            <div className="text-sm">
              Delivery by: {new Date(order.deliveryDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">Shipping Address</h3>
            <p className="text-sm">
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}
              <br />
              {order.shippingAddress.postalCode}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Order Summary</h3>
            <div className="flex justify-between">
              <span>Items ({order.orderItems.length})</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Order Items</h3>
          <div className="space-y-4">
            {order.orderItems.length > 0 ? (
              order.orderItems.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))
            ) : (
              <div className="p-4 text-gray-500 text-center">
                No items in this order
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderItem({ item }: { item: IOrderItem }) {
  const { productSeller, quantity } = item;
  const price = productSeller.price - productSeller.discount;

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <Image
        src={productSeller.product.images.main || "/placeholder-image.jpg"}
        alt={productSeller.product.titleEn}
        width={80}
        height={80}
        className="object-cover rounded-md"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
        }}
      />

      <div className="flex-1">
        <h4 className="font-medium">{productSeller.product.titleEn}</h4>
        <p className="text-sm text-gray-500">Seller: {item.seller.name}</p>

        <div className="flex items-center justify-between mt-2">
          <div className="space-y-1">
            <div className="text-sm">
              {productSeller.discount > 0 && (
                <span className="line-through text-gray-400 mr-2">
                  ${productSeller.price.toFixed(2)}
                </span>
              )}
              <span className="text-primary">
                ${price.toFixed(2)} x {quantity}
              </span>
            </div>
          </div>

          <div className="font-medium">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "secondary";
    case "shipped":
      return "info";
    case "delivered":
      return "success";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
}
