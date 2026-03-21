import { useState, useEffect } from "react";
import Button from "@/shared/components/UI/Button/Button";
import AddUserModal from "@/features/dashboard/Sub Features/RegisterUser/components/AddUserModal";
import UsersTable from "@/features/dashboard/Sub Features/RegisterUser/components/UsersTable";
import { useRegisterUser } from "@/features/dashboard/Sub Features/RegisterUser/hooks/useRegisterUser";
import { fetchUsers } from "@/features/dashboard/Sub Features/RegisterUser/usersThunks";
import { showToast } from "@/shared/components/Toast/api/toastSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";

// import { getUserService } from "@/features/dashboard/Sub Features/RegisterUser/services/registerUser.service";

const RegisterUser = () => {

  const { users, loading } = useAppSelector((state: any) => state.users);


  const dispatch = useAppDispatch();


  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);


  const { registerUser } = useRegisterUser();


  const handleSubmit = async (data: any) => {

    let result;

    if (editingUser) {
      //  CALL UPDATE API (you will create this)
      result = await registerUser({ ...data, id: editingUser.Id });
    } else {
      result = await registerUser(data);
    }

    if (result.success) {
      dispatch(showToast({
        message: editingUser
          ? "User updated successfully"
          : "User created successfully",
        type: "success"
      }));

      setModalOpen(false);
      setEditingUser(null);
      dispatch(fetchUsers());

    } else {
      dispatch(showToast({
        message: result.message || "Operation failed",
        type: "error"
      }));
    }
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setModalOpen(true);
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

      <UsersTable users={users} loading={loading} onEdit={handleEdit} />

      <AddUserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />


      <AddUserModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleSubmit}
        defaultValues={editingUser}
      />
    </div>
  );
};

export default RegisterUser;