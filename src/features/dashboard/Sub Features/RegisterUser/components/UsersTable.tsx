import React from "react";
import Table, { type Column } from "@/shared/components/UI/Table/Table";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

interface Props {
  users: any[];
  loading: boolean;
  onEdit: (user: any) => void;
  

}

const UsersTable: React.FC<Props> = ({ users,onEdit }) => {

  const tableData: User[] = users.map((u) => ({
    id: u.Id,
    name: u.Name,
    email: u.Email,
    phone: u.PhoneNumber
  }));

  const columns: Column<User>[] = [
    {
      key: "id",
      label: "Sl.no",
      render: (_value, _row, index) => index + 1
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
      label: "Phone",
      render: (value) => value ?? "-"
    }

  ];

  return (
    <Table<User>
      columns={columns}
      data={tableData}
      actions={(row, index) => { 
        return <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(users[index as number]);
          }}
        >
          ✏️
        </button>
      }}
    />
  );
};

export default UsersTable;