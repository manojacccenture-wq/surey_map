import { useState, useEffect } from "react";

import Button from "@/shared/components/UI/Button/Button";

import AddUserModal from "@/features/dashboard/Sub Features/RegisterUser/components/AddUserModal";
import UsersTable from "@/features/dashboard/Sub Features/RegisterUser/components/UsersTable";

import { useRegisterUser } from "@/features/dashboard/Sub Features/RegisterUser/hooks/useRegisterUser";

import { getUserService } from "@/features/dashboard/Sub Features/RegisterUser/services/registerUser.service";

const RegisterUser = () => {



  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const { registerUser } = useRegisterUser();

  const handleSubmit = async (data: any) => {

    const result = await registerUser(data);

    if (result.success) {

      setModalOpen(false);

    }

  };

  useEffect(() => {

    const fetchUsers = async () => {
      const result = await getUserService();

      if (result.success) {
        setUsers(result.data);
      }
    };

    fetchUsers();

  }, []);

  return (
    <div className="flex flex-col gap-6">

      <div className="flex justify-between">

        <h1 className="text-xl font-semibold">

        </h1>

        <Button onClick={() => setModalOpen(true)}>
          Add New User
        </Button>

      </div>

      <UsersTable users={users} />

      <AddUserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

    </div>
  );
};

export default RegisterUser;