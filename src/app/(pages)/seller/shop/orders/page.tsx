import { getOrders } from "@/app/api/dashboard/server-api/orders";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { STableContainer } from "@/components/seller/tables/STable-container";
import { SOrderTable } from "./order-table";

export default async function SOrderPage({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const orders = getOrders(params);
  return (
    <STableContainer title="Orders">
      <SOrderTable orders={orders} />
    </STableContainer>
  );
}
