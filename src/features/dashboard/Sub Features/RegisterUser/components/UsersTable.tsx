import React from "react";
import Table, { type Column } from "@/shared/components/UI/Table/Table";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Props {
  users: User[];
}

const UsersTable: React.FC<Props> = ({ users }) => {

  const columns: Column<User>[] = [
    {
      key: "id",
      label: "Sl.no"
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "phone",
      label: "Phone"
    }
  ];

  return (
    <Table<User>
      columns={columns}
      data={users}
    />
  );
};

export default UsersTable;