import { useState, useEffect } from "react";
import Button from "@/shared/components/UI/Button/Button";
import AddUserModal from "@/features/dashboard/Sub Features/RegisterUser/components/AddUserModal";
import UsersTable from "@/features/dashboard/Sub Features/RegisterUser/components/UsersTable";
import { useRegisterUser } from "@/features/dashboard/Sub Features/RegisterUser/hooks/useRegisterUser";
import { fetchUsers } from "@/features/dashboard/Sub Features/RegisterUser/usersThunks";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";

// import { getUserService } from "@/features/dashboard/Sub Features/RegisterUser/services/registerUser.service";

const RegisterUser = () => {

  const { users, loading } = useAppSelector((state: any) => state.users);


  const dispatch = useAppDispatch();


  const [modalOpen, setModalOpen] = useState(false);


  const { registerUser } = useRegisterUser();

  const handleSubmit = async (data: any) => {

    const result = await registerUser(data);

    if (result.success) {

      setModalOpen(false);
      dispatch(fetchUsers());

    }

  };
  useEffect(() => {

    dispatch(fetchUsers());

  }, [dispatch]);


  return (
    <div className="flex flex-col gap-6">

      <div className="flex justify-between">

        <h1 className="text-xl font-semibold">

        </h1>

        <Button onClick={() => setModalOpen(true)}>
          Add New User
        </Button>

      </div>

      <UsersTable users={users} loading={loading} />

      <AddUserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

    </div>
  );
};

export default RegisterUser;