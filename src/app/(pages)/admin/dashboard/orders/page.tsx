import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { TableContainer } from "@/components/dashboard/tables/TableContainer";
import { OrdersTable } from "./order-table";
import { getOrders } from "@/app/api/dashboard/server-api/orders";

export default async function UsersPage({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const orders = getOrders(params);
  return (
    <TableContainer title="Orders">
      <OrdersTable orders={orders} />
    </TableContainer>
  );
}
