import React, { useEffect } from "react";
import Modal from "@/shared/components/Modal/Modal";
import Input from "@/shared/components/UI/Input/Input";
import Button from "@/shared/components/UI/Button/Button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerUserSchema,
  type RegisterUserForm
} from "@/features/dashboard/Sub Features/RegisterUser/validation/registerUser.schema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RegisterUserForm) => void;
}

const AddUserModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit
}) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserSchema)
  });

  useEffect(() => {
  if (!isOpen) {
    reset();
  }
}, [isOpen, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={<h2 className="text-xl font-semibold">Register User</h2>}
    >

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >

        <Input
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <Input
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <Input
          label="Phone"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        <Input
          label="Username"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <Input
          label="User Code"
          {...register("usercode")}
          error={!!errors.usercode}
          helperText={errors.usercode?.message}
        />

        <Input
          type="password"
          label="Password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Input
          type="password"
          label="Confirm Password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        <div className="flex justify-end gap-3 mt-4">

          <Button type="button" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit">
            Submit
          </Button>

        </div>

      </form>

    </Modal>
  );
};

export default AddUserModal;