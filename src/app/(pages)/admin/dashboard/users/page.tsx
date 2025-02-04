import { TableContainer } from "@/components/dashboard/tables/TableContainer";
import { UsersTable } from "./user-table";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { getAllUsers } from "@/app/api/dashboard/server-api/users";

export default async function UsersPage({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const users = getAllUsers(params);
  return (
    <TableContainer title="Users" createLink="/admin/dashboard/users/create">
      <UsersTable users={users} />
    </TableContainer>
  );
}
